import { useEffect, useRef } from "react";
import { Box3, Mesh, MeshPhongMaterial, Vector3 } from "three";
import font from "three/examples/fonts/helvetiker_regular.typeface.json";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

export default function Text(props: { text: string; size: number; y: number }) {
	const mesh = useRef<Mesh>(null!);

	useEffect(() => {
		const loader = new FontLoader();

		const geometry = new TextGeometry(props.text, {
			font: loader.parse(font),
			size: props.size / 2,
			height: 0.02,
			depth: 0.001,
			curveSegments: 5,
			bevelEnabled: true,
			bevelSize: 0.01,
			bevelThickness: 0.025,
			bevelSegments: 5,
		});
		geometry.computeBoundingBox();

		const textMaterial = new MeshPhongMaterial({
			color: "#2cca0f",
			specular: 0x56bf84,
		});
		const textMesh = new Mesh(geometry, textMaterial);
		textMesh.castShadow = true;
		textMesh.receiveShadow = true;

		mesh.current.add(textMesh);
		var box = new Box3().setFromObject(mesh.current);
		const size = box.getSize(new Vector3());
		mesh.current.position.x -= props.text.length / 20;
		mesh.current.position.y -= props.y;
	}, []);

	return <mesh ref={mesh}></mesh>;
}
