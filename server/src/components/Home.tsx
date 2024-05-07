import { createClient } from "@/src/utils/supabase/client";
import { createRef, useEffect, useState } from "react";
import type { Tables } from "../utils/supabase/types";
import { CHANNEL } from "../utils/utils";
import Container from "./Container";
import Display from "./Display";
import GreetingPage from "./GreetingPage";
import SignUpDisplay from "./SignUpDisplay";

export default function Home() {
	const containerRef = createRef<HTMLDivElement>();
	const [cardToSignUp, setCardToSignUp] = useState<string | null>(null);
	const [userData, setUserData] = useState<Tables<"user"> | null>(null);
	const goBack = () => {
		setUserData(null);
		setCardToSignUp(null);
	};

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.requestFullscreen();
		}

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
			<Container goBack={cardToSignUp || userData ? goBack : null}>
				{cardToSignUp ? (
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
