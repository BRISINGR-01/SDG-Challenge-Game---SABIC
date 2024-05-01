import React from "react";

export default function Container(props: {
	children?: React.JSX.Element | React.JSX.Element[];
	style?: React.CSSProperties;
	className?: string;
}) {
	return (
		<div
			className=""
			style={{
				width: "100vw",
				height: "100vh",
				backgroundColor: "white",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "absolute",
					background: "linear-gradient(to left, #FCD202, #FF9700 50%	)",
					width: "90vw",
					height: "90vw",
					borderRadius: "100%",
					transform: "translate(-35%, 20%)",
				}}
			>
				<div
					style={{
						background: "white",
						width: "50%",
						height: "50%",
						borderRadius: "100%",
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}
				></div>
			</div>
			<div
				style={{
					position: "absolute",
					background: "linear-gradient(to right, #009FE3, #0047AF 50%)",
					width: "75vw",
					height: "75vw",
					borderRadius: "100%",
					transform: "translate(50vw, -50vw)",
				}}
			>
				<div
					style={{
						background: "white",
						width: "50%",
						height: "50%",
						borderRadius: "100%",
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}
				></div>
			</div>
			<div
				style={{
					position: "absolute",
					backgroundColor: "rgba(255,255,255,0.6)",
					...props.style,
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					padding: "5em",
					color: "black",
					textAlign: "center",
				}}
				className={props.className}
			>
				{props.children}
			</div>
		</div>
	);
}
