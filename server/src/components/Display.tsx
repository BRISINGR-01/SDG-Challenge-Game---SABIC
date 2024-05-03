import type { Tables } from "../utils/supabase/types";
import Container from "./Container";

export default function Display(props: { user: Tables<"user">; goBack: () => void }) {
	return (
		<Container goBack={props.goBack}>
			<span style={{ fontSize: "2em" }}>Hi, {props.user.name}</span>
			<br />
			<span style={{ fontSize: "1.5em" }}>Your card is {props.user.card}</span>
		</Container>
	);
}
