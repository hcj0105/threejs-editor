import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
	EffectComposer,
	GammaCorrectionShader,
	OutlinePass,
	RenderPass,
	ShaderPass,
	TransformControls
} from "three/examples/jsm/Addons.js";

function getWindowSize() {
	// 主要内容宽度
	const width = window.innerWidth - window.innerWidth * 0.15;
	// 减去菜单高度
	const height = window.innerHeight - 60;

	return { height, width };
}

type InitActions = {
	onSelected: (obj: THREE.Object3D | null) => void;
	updateMeshPostion: (name: string, obj: THREE.Object3D) => void;
};

export function init(dom: HTMLElement, actions: InitActions) {
	const { onSelected, updateMeshPostion } = actions;

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

	/**
	 * TODO: 需要查看逻辑（后期通道相关的知识）
	 * @description EffectComposer 需要了解
	 * @description RenderPass 需要了解
	 * @description OutlinePass 需要了解
	 */
	const composer = new EffectComposer(renderer);
	const renderPass = new RenderPass(scene, camera);
	composer.addPass(renderPass);

	const v = new THREE.Vector2(window.innerWidth, window.innerWidth);
	const outlinePass = new OutlinePass(v, scene, camera);
	outlinePass.pulsePeriod = 1;
	composer.addPass(outlinePass);

	// 问题？: 场景颜色变暗的问题，是后期通道常见的问题，
	// 解决: 通过伽马通道矫正一下就好
	const gammaPass = new ShaderPass(GammaCorrectionShader);
	composer.addPass(gammaPass);
	// end

	// 相机控制器
	const orbitControls = new OrbitControls(camera, renderer.domElement);

	// 几何体控制
	const transformControls = new TransformControls(camera, renderer.domElement);
	// 添加操作指示器
	const transformHelper = transformControls.getHelper();
	scene.add(transformHelper);

	transformControls.addEventListener("dragging-changed", (e) => {
		// 在操作几何体的时候，禁用相机控制
		orbitControls.enabled = !e.value;
	});

	transformControls.addEventListener("change", () => {
		// 获取操作的对象
		const obj = transformControls.object;
		if (obj) {
			updateMeshPostion(obj.name, obj);
		}
	});

	function render(time: number = 1000) {
		// renderer.render(scene, camera);
		// 渲染后期通道
		composer.render();

		transformControls.update(time);

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

	/**
	 * 点击元素选中
	 * TODO: 需要查看逻辑思路（选中3D物体的实现思路）
	 * @link https://juejin.cn/book/7481132169944498226/section/7482770261973221386
	 */
	renderer.domElement.addEventListener("click", (e) => {
		const y = -((e.offsetY / height) * 2 - 1);
		const x = (e.offsetX / width) * 2 - 1;

		const rayCaster = new THREE.Raycaster();
		rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

		// 只处理 Box 和 Cylinder
		const objs = scene.children.filter((item) => {
			return item.name.startsWith("Box") || item.name.startsWith("Cylinder");
		});

		const intersections = rayCaster.intersectObjects(objs);

		if (intersections.length) {
			const obj = intersections[0].object;
			// 给选中的3D对象添加外边框效果
			outlinePass.selectedObjects = [obj];
			// 更新选中的对象到 store 当中
			onSelected(obj);
			// 给选中的对象添加操作控制器
			transformControls.attach(obj);
		} else {
			// 取消选中对象上的外边框
			outlinePass.selectedObjects = [];
			// 删除store中保存的选中对象
			onSelected(null);
			// 删除选中对象的操作控制器
			transformControls.detach();
		}
	});
	// end

	return {
		scene
	};
}
