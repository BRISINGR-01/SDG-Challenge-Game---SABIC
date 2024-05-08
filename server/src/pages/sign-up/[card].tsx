"use client";

import Container from "@/src/components/Container";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Page() {
	const [cardId, setCardId] = useState("");
	useEffect(() => {
		setCardId(window.location.href.split("/").at(-1)!);
	});

	return (
		<NextUIProvider>
			<Container goBack={null}></Container>
		</NextUIProvider>
	);
}
