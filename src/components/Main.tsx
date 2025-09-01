import { useEffect, useRef } from "react";
import * as THREE from "three";
import { init } from "./init";
import { useThreeStore, MeshTypes } from "../store/index";

const Main = () => {
	const editRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<THREE.Scene>(null);

	const { data, setSelectedObj, selectedObj, removeMesh, updateMeshPostion } =
		useThreeStore();

	function onSelected(obj: THREE.Object3D | null) {
		setSelectedObj(obj);
	}

	useEffect(() => {
		if (editRef.current) {
			const { scene } = init(editRef.current, {
				onSelected,
				updateMeshPostion
			});
			sceneRef.current = scene;
		}

		return () => {
			if (editRef.current) {
				editRef.current.innerHTML = "";
			}
		};
	}, []);

	useEffect(() => {
		const scene = sceneRef.current!;

		// 创建几何体并添加到场景中
		data.meshArr.forEach((item) => {
			const { position } = item.props;

			if (item.type === MeshTypes.Box) {
				const { width, height, depth } = item.props;
				let mesh = scene.getObjectByName(item.name);
				if (!mesh) {
					const material = new THREE.MeshPhongMaterial({
						...item.props.material
					});
					const geometry = new THREE.BoxGeometry(width, height, depth);
					mesh = new THREE.Mesh(geometry, material);
				}
				mesh.name = item.name;
				mesh.position.copy(position);
				scene.add(mesh);
			} else if (item.type === MeshTypes.Cylinder) {
				const { radiusBottom, radiusTop, height } = item.props;
				let mesh = scene.getObjectByName(item.name);
				// 圆柱体，顶部半径、底部半径、高
				if (!mesh) {
					const material = new THREE.MeshPhongMaterial({
						...item.props.material
					});
					const geometry = new THREE.CylinderGeometry(
						radiusTop,
						radiusBottom,
						height
					);
					mesh = new THREE.Mesh(geometry, material);
				}
				mesh.name = item.name;
				mesh.position.copy(position);
				scene.add(mesh);
			}
		});
	}, [data]);

	useEffect(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === "Backspace") {
				sceneRef.current?.remove(selectedObj!);
				removeMesh(selectedObj!);
			}
		}

		window.addEventListener("keydown", handleKeydown);

		return () => {
			window.removeEventListener("keydown", handleKeydown);
		};
	}, [selectedObj]);

	return <div ref={editRef} className='w-[85vw] border-r border-[#000]'></div>;
};

export default Main;
