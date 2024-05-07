import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Container from "./Container";

export default function GreetingPage() {
	const [displayData, setDisplayData] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			setDisplayData("");
		}, 10_000);

		return () => clearInterval(interval);
	});

	return (
		<Container goBack={null} style={{ width: 1500 }}>
			<span style={{ fontSize: 40, color: "#939598" }}>Sustainability & Innovation</span>
			<br />
			<span style={{ fontSize: 60, fontWeight: "bold", textTransform: "uppercase", width: "90vw" }}>
				Scan badge to connect
			</span>
			<Image src="/display.pdf"></Image>
		</Container>
	);
}
