"use client";

import Home from "@/components/Home";
import { NextUIProvider } from "@nextui-org/react";

export default function App() {
	return (
		<NextUIProvider>
			<Home />
		</NextUIProvider>
	);
}
