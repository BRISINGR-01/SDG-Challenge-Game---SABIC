import { createClient } from "@/src/utils/supabase/client";
import { createRef, useEffect, useState } from "react";
import type { Tables } from "../utils/supabase/types";
import { CHANNEL } from "../utils/utils";
import Scene3D from "./3d/Scene3D";
import Container from "./Container";
import Display from "./Display";
import GreetingPage from "./GreetingPage";
import SignUp from "./SignUp";
import SignUpDisplay from "./SignUpDisplay";

export default function Home(props: { showSignUp: boolean }) {
	const containerRef = createRef<HTMLDivElement>();
	const [cardToSignUp, setCardToSignUp] = useState<string | null>(null);
	const [userData, setUserData] = useState<Tables<"user"> | null>(null);
	const [show3D, setShow3D] = useState(false);
	const goBack = () => {
		setUserData(null);
		setCardToSignUp(null);
	};
	const [cardId, setCardId] = useState("");

	useEffect(() => {
		setCardId(window.location.href.split("/").at(-1) || "");
	});

	useEffect(() => {
		const supabase = createClient();

		supabase
			.channel(CHANNEL)
			.on("postgres_changes", { event: "INSERT", schema: "public", table: "card_read" }, async (event) => {
				const audio = new Audio("/bell.wav");
				audio.play();
				const card = event.new as Tables<"card_read">;

				const { data: users } = await supabase.from("user").select().eq("card", card.card_id);

				if (!users || users?.length === 0) {
					setCardToSignUp(card.card_id);
					setUserData(null);
				} else {
					setCardToSignUp(null);
					setUserData(users[0]);
				}
			})
			.on("postgres_changes", { event: "INSERT", schema: "public", table: "user" }, async (event) => {
				const user = event.new as Tables<"user">;

				setUserData(user);
				setCardToSignUp(null);
			})
			.subscribe();
	}, []);

	return (
		<div
			ref={containerRef}
			onClick={() => {
				if (containerRef.current) {
					containerRef.current.requestFullscreen();
				}
			}}
		>
			<Scene3D hidden={!show3D} hide={() => setShow3D(false)} />
			<Container goBack={cardToSignUp || userData ? goBack : null} show3D={show3D ? null : () => setShow3D(true)}>
				{show3D ? (
					<></>
				) : props.showSignUp ? (
					<div style={{ padding: "4em" }}>
						<SignUp cardID={cardId} />
					</div>
				) : cardToSignUp ? (
					<SignUpDisplay cardID={cardToSignUp} />
				) : userData ? (
					<Display user={userData} />
				) : (
					<GreetingPage />
				)}
			</Container>
		</div>
	);
}
