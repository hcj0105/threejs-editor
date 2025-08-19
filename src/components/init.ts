import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { MeshTypes } from "../store";

import type { ThreeStoreStateData } from "../store";

function getWindowSize() {
	// 主要内容宽度
	const width = window.innerWidth - window.innerWidth * 0.15;
	// 减去菜单高度
	const height = window.innerHeight - 60;

	return { height, width };
}

export function init(dom: HTMLElement, data: ThreeStoreStateData) {
	const scene = new THREE.Scene();

	const { width, height } = getWindowSize();

	const axesHelper = new THREE.AxesHelper(500);
	scene.add(axesHelper);

	const directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(500, 400, 300);
	scene.add(directionalLight);

	const ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(ambientLight);

	// 创建网格格子，大小为 1000
	const gridHelper = new THREE.GridHelper(width);
	scene.add(gridHelper);

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
		const { height, width } = getWindowSize();

		renderer.setSize(width, height);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	};

	const controls = new OrbitControls(camera, renderer.domElement);

	return {
		scene
	};
}
