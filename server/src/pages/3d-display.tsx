"use client";
import "../app/globals.css";

import { createRef } from "react";
import { Color, Scene } from "three";
import Scene3D from "../components/3d/Scene3D";

export default function Home() {
	const containerRef = createRef<HTMLDivElement>();
	const scene = new Scene();
	scene.background = new Color("lightblue");

	return (
		<div
			ref={containerRef}
			onClick={(e) => {
				if (containerRef.current) {
					containerRef.current.requestFullscreen();
				}
			}}
		>
			<Scene3D hidden={false} />
		</div>
	);
}
