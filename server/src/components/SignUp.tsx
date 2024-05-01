import { Button, Input } from "@nextui-org/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { createClient } from "../utils/supabase/client";

export default function SignUp(props: { cardID: string }) {
	const [input, setInput] = useState("");
	const onSubmit = useRef((e: FormEvent<HTMLFormElement>, name: string) => e.preventDefault());

	useEffect(() => {
		const supabase = createClient();

		onSubmit.current = async (e, name) => {
			e.preventDefault();

			await supabase.from("user").insert({ card: props.cardID, name });
			setInput("");
		};
	}, []);

	return (
		<form
			className="flex flex-col justify-between items-center"
			style={{ height: "100%" }}
			onSubmit={(e) => onSubmit.current(e, input)}
		>
			<span style={{ fontSize: "2em" }}>TYPE</span>
			<Input
				variant="bordered"
				size="lg"
				color="primary"
				style={{ width: "max-content" }}
				placeholder="Enter Name"
				label="name"
				onValueChange={setInput}
				value={input}
			/>
			<Button type="submit" color="primary" style={{ width: "min-content" }} isDisabled={input.length === 0} size="sm">
				Create account
			</Button>
		</form>
	);
}
