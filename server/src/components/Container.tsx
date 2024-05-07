import { Button, Image } from "@nextui-org/react";
import React from "react";

export default function Container(props: {
	children?: React.JSX.Element | React.JSX.Element[];
	style?: React.CSSProperties;
	className?: string;
	goBack: null | (() => void);
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
			{props.goBack && (
				<div style={{ position: "absolute", top: 0, right: 0, transform: "translate(-100%, 2em)", zIndex: 100 }}>
					<Button size="lg" variant="faded" isIconOnly onClick={props.goBack}>
						<img style={{ padding: "8px" }} src="/back.svg"></img>
					</Button>
				</div>
			)}
			<div style={{ position: "absolute", bottom: 0, right: 0, transform: "translate(-100%, -100%)", zIndex: 100 }}>
				<Image src="/sabic.png"></Image>
			</div>
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
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
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
