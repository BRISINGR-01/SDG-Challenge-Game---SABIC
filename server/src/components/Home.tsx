import type { User } from "@/src/utils/client";
import { createClient } from "@/src/utils/supabase/client";
import { useEffect, useState } from "react";
import { CARD_READER_CHANNEL } from "../utils/utils";
import Leaderboard from "./Leaderboard";

export default function Home() {
	const [data, setData] = useState<User[]>([]);
	useEffect(() => {
		const supabase = createClient();
		supabase.from("card_read").select().then(console.log);

		const channel = supabase.channel(CARD_READER_CHANNEL);

		channel
			.on("broadcast", { event: CARD_READER_CHANNEL }, (event) => {
				console.log(event.payload.cardId);
			})
			.subscribe();

		fetch("/data.json")
			.then((res) => res.json())
			.then(setData);
	}, []);

	return <Leaderboard data={data} />;
}
