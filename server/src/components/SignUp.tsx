import { Button, Input } from "@nextui-org/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { createClient } from "../utils/supabase/client";

export default function SignUp(props: { cardID?: string }) {
	const [input, setInput] = useState("");
	const onSubmit = useRef((e: FormEvent<HTMLFormElement>, name: string) => e.preventDefault());

	useEffect(() => {
		const supabase = createClient();

		onSubmit.current = async (e, name) => {
			e.preventDefault();

			await supabase.from("user").insert({ card: props.cardID || window.location.href.split("/").at(-1) || "", name });
			setInput("");
		};
	}, []);

	return (
		<form
			className="flex flex-col justify-center items-center"
			style={{ height: "100%" }}
			onSubmit={(e) => onSubmit.current(e, input)}
		>
			<div className="flex gap-2 flex-col items-center">
				<Input
					variant="bordered"
					size="sm"
					color="primary"
					style={{ width: "max-content" }}
					placeholder="Enter Name"
					label="name"
					onValueChange={setInput}
					value={input}
				/>
				<Button
					type="submit"
					color="primary"
					style={{ width: "min-content" }}
					isDisabled={input.length === 0}
					size="sm"
				>
					Create account
				</Button>
			</div>
		</form>
	);
}
