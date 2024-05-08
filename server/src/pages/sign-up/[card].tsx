"use client";

import Home from "@/src/components/Home";
import { NextUIProvider } from "@nextui-org/react";
import "../../app/globals.css";

export default function Page() {
	return (
		<NextUIProvider>
			<Home showSignUp={true} />;
		</NextUIProvider>
	);
}
