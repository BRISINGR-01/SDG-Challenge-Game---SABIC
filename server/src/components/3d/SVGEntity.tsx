"use client";

import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Box3, Color, DoubleSide, ExtrudeGeometry, Mesh, MeshPhongMaterial, Vector3 } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

function SVGEntity(props: { path: string; depth: number }) {
	const mesh = useRef<Mesh>(null!);
	const svg = useLoader(SVGLoader, `${window.location.origin}/icons/${props.path}.svg`);

	useEffect(() => {
		for (const path of svg.paths) {
			const fillColor = path.userData!.style.fill;

			const material = new MeshPhongMaterial({
				color: new Color().setStyle(fillColor),
				side: DoubleSide,
				depthWrite: true,
			});
			material.polygonOffset = true;
			material.polygonOffsetFactor = -0.1;

			const shapes = SVGLoader.createShapes(path);
			for (const shape of shapes) {
				const meshGeometry = new ExtrudeGeometry(shape, {
					depth: props.depth ?? 4,
					bevelEnabled: true,
				});

				mesh.current.add(new Mesh(meshGeometry, material));
			}

			const strokeColor = path.userData!.style.stroke;
			if (strokeColor && strokeColor !== "none") {
				const material = new MeshPhongMaterial({
					color: new Color().setStyle(strokeColor),
					opacity: path.userData!.style.strokeOpacity,
					transparent: true,
					side: DoubleSide,
					depthWrite: false,
				});
				material.polygonOffset = true;
				material.polygonOffsetFactor = -0.1;

				for (const subPath of path.subPaths) {
					const geometry = SVGLoader.pointsToStroke(subPath.getPoints(), path.userData!.style);
					if (geometry) {
						mesh.current.add(new Mesh(geometry, material));
					}
				}
			}
		}

		var box = new Box3().setFromObject(mesh.current);
		const size = box.getSize(new Vector3());

		mesh.current.scale.setScalar(1 / size.x);
		mesh.current.scale.y *= -1;
		mesh.current.scale.z *= -1;

		for (let i = 0; i < mesh.current.children.length; i++) {
			mesh.current.children[i].position.addScalar((mesh.current.children.length - i) / 10);
		}
	}, []);

	return <mesh ref={mesh}></mesh>;
}

export default SVGEntity;
