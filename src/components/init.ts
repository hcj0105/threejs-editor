import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { MeshTypes } from "../store";

import type { ThreeStoreStateData } from "../store";

export function init(dom: HTMLElement, data: ThreeStoreStateData) {
	const scene = new THREE.Scene();

	const axesHelper = new THREE.AxesHelper(500);
	scene.add(axesHelper);

	const directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(500, 400, 300);
	scene.add(directionalLight);

	const ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(ambientLight);

	// 创建网格格子，大小为 1000
	const gridHelper = new THREE.GridHelper(1000);
	scene.add(gridHelper);

	// 创建几何体并添加到场景中
	data.meshArr.forEach((item) => {
		if (item.type === MeshTypes.Box) {
			const {
				material: { color },
				width,
				height,
				depth
			} = item.props;

			const geometry = new THREE.BoxGeometry(width, height, depth);
			const material = new THREE.MeshBasicMaterial({
				color
			});
			const mesh = new THREE.Mesh(geometry, material);
			scene.add(mesh);
		}
	});

	// 主要内容宽度
	const width = 1000;
	// 减去菜单高度
	const height = window.innerHeight - 60;

	const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
	camera.position.set(500, 500, 500);
	camera.lookAt(0, 0, 0);

	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(width, height);

	function render() {
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	render();

	dom.append(renderer.domElement);

	window.onresize = function () {
		const width = 1000;
		const height = window.innerHeight - 60;

		renderer.setSize(width, height);

		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	};

	const controls = new OrbitControls(camera, renderer.domElement);

	return {
		scene
	};
}
