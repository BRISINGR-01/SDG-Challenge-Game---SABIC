"use client";

import SignUp from "@/src/components/SignUp";
import { useRouter } from "next/router";

export default function Page() {
	const router = useRouter();

	let cardId = router.query.card;

	if (Array.isArray(cardId)) cardId = cardId[0];

	return <SignUp cardID={cardId!} />;
}
