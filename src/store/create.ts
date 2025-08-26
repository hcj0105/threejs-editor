import type { BaseMesh } from "./types";

// 创建 Box 几何体
export function createBox(): BaseMesh {
	// 随机6位数id
	const newId = Math.random().toString().slice(2, 8);

	return {
		id: newId,
		type: "Box",
		name: "Box" + newId,
		props: {
			// Box的属性宽、高、深
			width: 200,
			height: 200,
			depth: 200,
			material: {
				// 材质
				color: "orange" // 颜色
			},
			// Box 初始位置
			position: {
				x: 0,
				y: 0,
				z: 0
			}
		}
	};
}

export function createCylinder(): BaseMesh {
	const newId = Math.random().toString().slice(2, 8);
	return {
		id: newId,
		type: "Cylinder",
		name: "Cylinder" + newId,
		props: {
			radiusTop: 200,
			radiusBottom: 200,
			height: 300,
			material: {
				color: "orange"
			},
			position: {
				x: 0,
				y: 0,
				z: 0
			}
		}
	};
}
