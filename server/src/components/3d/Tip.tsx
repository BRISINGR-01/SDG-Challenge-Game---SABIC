"use client";

import { useEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
import SVGEntity from "./SVGEntity";
import Text from "./Text";

function Tip(props: { path: string; position: Vector3; depth: number; title: string; text: string; textY?: number }) {
	const mesh = useRef<Mesh>(null!);
	const [description, setDescription] = useState<string[]>([]);
	useEffect(() => {
		mesh.current.position.copy(props.position);

		const descriptionContent: string[] = [""];
		const text = props.text.split(/\s/);
		for (let wordI = 0, rowI = 0; wordI < text.length; wordI++) {
			if (descriptionContent[rowI].length + text[wordI].length <= 40) {
				descriptionContent[rowI] += text[wordI] + " ";
			} else if (wordI !== text.length) {
				rowI++;
				descriptionContent.push(text[wordI] + " ");
			}
		}

		setDescription(descriptionContent);
		mesh.current.lookAt(new Vector3(0, 0, 0));
	}, []);

	return (
		<mesh ref={mesh}>
			<SVGEntity path={props.path} depth={props.depth} />
			<Text text={props.title} size={0.8} y={props.textY ?? 0}></Text>
			{description.map((text, i) => (
				<Text key={i} text={text} size={0.5} y={(props.textY ?? 0) + i * 0.4 + 0.5}></Text>
			))}
		</mesh>
	);
}

export default Tip;
