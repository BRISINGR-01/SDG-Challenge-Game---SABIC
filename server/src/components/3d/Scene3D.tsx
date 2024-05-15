"use client";
import "../../app/globals.css";

import { Button } from "@nextui-org/react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Color, Scene, TextureLoader, Vector3, type Mesh } from "three";
import Tip from "./Tip";

function Image() {
	const mesh = useRef<Mesh>(null!);
	const texture = useLoader(TextureLoader, `${window.location.origin}/display.png`);

	useEffect(() => {
		mesh.current.lookAt(new Vector3(0, 0, 0));
	}, []);

	return (
		<mesh position={new Vector3(0, 3, -2)} ref={mesh}>
			<boxGeometry args={[4, 2.5, 0.1]} />
			<meshBasicMaterial attach="material" map={texture} />
		</mesh>
	);
}

export default function Scene3D(props: { hidden: boolean; hide?: () => void }) {
	const [state, setState] = useState<"pre-render" | "show" | "hide">("pre-render");
	const scene = new Scene();
	scene.background = new Color("lightblue");

	useEffect(() => {
		if (!props.hidden) {
			setState("show");
		} else {
			setTimeout(() => {
				setState("hide");
			}, 100);
		}
	}, []);

	useEffect(() => {
		if (state !== "pre-render") setState(props.hidden ? "hide" : "show");
	}, [props.hidden]);

	return (
		<div
			className="flex justify-center items-center h-screen m-0"
			style={{
				position: "absolute",
				top: 0,
				zIndex: 10,
				width: state === "hide" ? 0 : state == "pre-render" ? 1 : "100vw",
				height: state === "pre-render" ? 1 : "100vh",
			}}
		>
			<div style={{ position: "absolute", top: 0, right: 0, transform: "translate(-30%, 30%)", zIndex: 110 }}>
				<Button size="md" variant="faded" isIconOnly onClick={props.hide ?? (() => (window.location.pathname = ""))}>
					<img style={{ padding: "8px" }} src="/icons/back.svg"></img>
				</Button>
			</div>
			<Canvas className="h-2xl w-2xl" scene={scene}>
				<OrbitControls />
				<ambientLight />
				<directionalLight />
				<Suspense>
					<Image />
				</Suspense>
				<Tip
					path="solar"
					position={new Vector3(-6, 1, 6)}
					depth={60}
					title="Go solar"
					text="Powering your home with solar panels can reduce your electric bills, shrink your carbon footprint and increase your home's value"
					textY={1.5}
				/>
				<Tip
					path="recycle"
					position={new Vector3(-4, 3, -3)}
					depth={80}
					title="Recycle"
					text="You can recycle plastic bottles, paper, electronics and batteries, among other items. Learn how to properly dispose of or recycle these products and reduce consumer waste"
					textY={1.5}
				/>
				<Tip
					path="food"
					position={new Vector3(4, -2, 7)}
					depth={15}
					title="Buy local"
					text="In North America, fruits and vegetables travel an average of 1,500 miles before reaching your plate. Buy fresh, local food to eliminate the long distances traveled and preserve nutrients and flavor"
					textY={1.5}
				/>
				<Tip
					path="paper"
					position={new Vector3(6, 2, 3)}
					depth={7}
					title="Switch to e-billing"
					text="In the United States, paper products make up the largest percentage of municipal solid waste, and hard copy bills alone generate almost 2 million tons of CO2. Save paper by signing up for e-billing"
					textY={1.5}
				/>
				<Tip
					path="water"
					position={new Vector3(-5, -1, 1)}
					depth={200}
					title="Use cold water"
					text="Using cold water can save up to 80 percent of the energy required to wash clothes. Choosing a low setting on the washing machine will also help save water"
					textY={1.5}
				/>
				<Tip
					path="light-bulb"
					position={new Vector3(4, 1, -4)}
					depth={4}
					title="Turn it off"
					text="Artificial lighting accounts for 44 percent of electricity use in office buildings. Make it a habit to turn off the lights when you're leaving any room for 15 minutes or more. Same goes for electronics - unplug electrical devices when you're not using them"
					textY={2.5}
				/>
				<Tip
					path="thermometer"
					position={new Vector3(0, 6, 4)}
					depth={40}
					title="Dial it down"
					text="Moving your thermostat down just two degrees in winter and up two degrees in summer could save about 2,000 pounds of carbon dioxide per year"
					textY={3.5}
				/>
			</Canvas>
		</div>
	);
}
