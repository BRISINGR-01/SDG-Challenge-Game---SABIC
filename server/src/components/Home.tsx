import { createClient } from "@/src/utils/supabase/client";
import { useEffect, useState } from "react";
import type { Tables } from "../utils/supabase/types";
import { CHANNEL } from "../utils/utils";
import Container from "./Container";
import Display from "./Display";
import SignUpDisplay from "./SignUpDisplay";

export default function Home() {
	const [cardToSignUp, setCardToSignUp] = useState<string | null>(null);
	const [userData, setUserData] = useState<Tables<"user"> | null>(null);

	useEffect(() => {
		const supabase = createClient();

		supabase
			.channel(CHANNEL)
			.on("postgres_changes", { event: "INSERT", schema: "public", table: "card_read" }, async (event) => {
				const card = event.new as Tables<"card_read">;

				const { data: users } = await supabase.from("user").select().eq("card", card.card_id);

				if (!users || users?.length === 0) {
					setCardToSignUp(card.card_id);
				} else {
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

	if (cardToSignUp) return <SignUpDisplay cardID={cardToSignUp} />;

	if (userData) return <Display clear={() => setUserData(null)} user={userData} />;

	return (
		<Container style={{ width: 1500 }}>
			<span style={{ fontSize: 40, color: "#939598" }}>Sustainability & Innovation</span>
			<br />
			<span style={{ fontSize: 60, fontWeight: "bold", textTransform: "uppercase", width: "90vw" }}>
				Scan badge to connect
			</span>
		</Container>
	);
}
