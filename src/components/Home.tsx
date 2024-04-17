import type { User } from "@/utils";
import { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";

export default function Home() {
	const [data, setData] = useState<User[]>([]);

	useEffect(() => {
		fetch("/data.json")
			.then((res) => res.json())
			.then(setData);
	}, []);

	return <Leaderboard data={data} />;
}
