import { useSocket, type User } from "@/utils";
import { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";

export default function Home() {
	const [data, setData] = useState<User[]>([]);
	const s = useSocket(console.log);
	useEffect(() => {
		fetch("/data.json")
			.then((res) => res.json())
			.then(setData);
	}, []);

	// useSocket(console.log);

	return <Leaderboard data={data} />;
}
