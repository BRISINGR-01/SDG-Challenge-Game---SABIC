import { Divider } from "@nextui-org/react";
import type { Tables } from "../utils/supabase/types";

export default function Display(props: { user: Tables<"user"> }) {
	return (
		<div
			style={{
				display: "flex",
				backgroundColor: "#EBF8FE",
				justifyContent: "center",
				gap: "15px",
				alignItems: "center",
				width: "90vw",
				height: "80vh",
			}}
		>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<span style={{ fontSize: "1.2em" }}>Hi, {props.user.name}</span>
				{[
					["+1", "Good job! another plastic recycled by you!"],
					["↑7", "places up! Your ranking has advanced!"],
					["Σ13", "pieces of plastic have been recycled so far!"],
					["G390", "CO2 emissions are reduced!"],
					["%12", "of the team's scores has been contributed!"],
				].map(([t1, t2]) => (
					<>
						<div style={{ display: "flex", gap: "7px" }}>
							<span
								style={{
									fontWeight: 1000,
									color: "#009FE3",
									fontSize: "1em",
									width: "3em",
									textAlign: "right",
									verticalAlign: "center",
								}}
							>
								{t1}
							</span>
							<span style={{ fontSize: "0.8em", textAlign: "left", alignContent: "center", width: "11.5em" }}>
								{t2}
							</span>
						</div>
						<Divider />
					</>
				))}
			</div>
			<img src="/Group 32.png" alt="" style={{ height: "15em" }} />
			{/* <div style={{ display: "flex", flexDirection: "column" }}>
				<Chip style={{ backgroundColor: "#009FE3" }}>
					<span style={{ color: "white", fontWeight: 1000, textTransform: "uppercase" }}>Company Progress</span>
				</Chip>
				<div style={{ backgroundColor: "white", borderRadius: "10px" }}>
					{[["GHG emissions", ""]].map(([text, img]) => (
						<div>
							<span>{text}</span>
						</div>
					))}
				</div>
			</div>
			<div style={{ display: "flex" }}>
				<Chip style={{ backgroundColor: "#009FE3" }}>
					<span style={{ color: "white", fontWeight: 1000, textTransform: "uppercase" }}>Team Rank</span>
					<div style={{ backgroundColor: "white", borderRadius: "10px" }}></div>
				</Chip>
			</div> */}
		</div>
	);
}
