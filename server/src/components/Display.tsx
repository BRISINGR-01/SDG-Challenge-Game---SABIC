import type { Tables } from "../utils/supabase/types";
import Container from "./Container";

export default function Display(props: { user: Tables<"user">; clear: () => void }) {
	return (
		<Container>
			<span>{props.user.name}</span>
			<br />
			<span>{props.user.id}</span>
			<br />
			<span>{props.user.card}</span>
		</Container>
	);
}
