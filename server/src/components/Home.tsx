import { createClient } from "@/src/utils/supabase/client";
import type { User } from "@/src/utils/utils";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CARD_READER_CHANNEL } from "../utils/utils";
import Leaderboard from "./Leaderboard";

let timeout: NodeJS.Timeout | null;

export default function Home() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [data, setData] = useState<User[]>([]);
	const [scanned, setScanned] = useState("");
	useEffect(() => {
		const supabase = createClient();
		supabase.from("card_read").select().then(console.log);

		const channel = supabase.channel(CARD_READER_CHANNEL);

		channel
			.on("broadcast", { event: CARD_READER_CHANNEL }, (event) => {
				if (timeout) {
					onClose();
					clearTimeout(timeout);
					timeout = null;
					setScanned("");
					timeout = null;
					setTimeout(() => {
						setScanned(event.payload.cardId);
					}, 200);
				} else {
					setScanned(event.payload.cardId);
				}
			})
			.subscribe();

		fetch("/data.json")
			.then((res) => res.json())
			.then(setData);
	}, []);

	useEffect(() => {
		if (!scanned) return;
		if (timeout) {
			onClose();
			clearTimeout(timeout);
		}
		onOpen();
		timeout = setTimeout(() => {
			onClose();
			setScanned("");
			timeout = null;
		}, 2000);
	}, [scanned]);

	return (
		<>
			<Modal
				isOpen={isOpen}
				// backdrop="transparent"
				placement="center"
				motionProps={{
					variants: {
						enter: {
							y: 0,
							opacity: 1,
							transition: {
								duration: 0.05,
								ease: "easeOut",
							},
						},
						exit: {
							y: -20,
							opacity: 0,
							transition: {
								duration: 0.05,
								ease: "easeIn",
							},
						},
					},
				}}
			>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1">A card was scanned</ModalHeader>
					<ModalBody>Card ID: {scanned}</ModalBody>
				</ModalContent>
			</Modal>
			<Leaderboard data={data} />
		</>
	);
}
