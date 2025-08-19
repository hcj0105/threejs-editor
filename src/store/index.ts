import { create } from "zustand";

const MeshTypes = {
	Box: "Box",
	Cylinder: "Cylinder"
} as const;

// 创建 Box 几何体
function createBox(): any {
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

type BaseMeshType = {
	id: number;
	type: keyof typeof MeshTypes;
	name: string;
	props: {
		width: number;
		height: number;
		depth: number;
		material: {
			color: string; // 颜色
		};
		// Box 初始位置
		position: {
			x: number;
			y: number;
			z: number;
		};
	};
};

export type ThreeStoreStateData = {
	meshArr: BaseMeshType[];
};

type ThreeStoreState = {
	data: ThreeStoreStateData;
	addMesh: (type: keyof typeof MeshTypes) => void;
};

const useThreeStore = create<ThreeStoreState>((set) => {
	return {
		data: {
			meshArr: [
				{
					id: 1,
					type: "Box",
					name: "Box" + 1,
					props: {
						// Box的属性宽、高、深
						width: 500,
						height: 200,
						depth: 200,
						material: {
							// 材质
							color: "orange" // 颜色
						},
						// Box 初始位置
						position: {
							x: 500,
							y: 100,
							z: 0
						}
					}
				},
				createBox()
			]
		},
		/**
		 * 添加几何体
		 * @param type Mesh 类型
		 */
		addMesh(type: keyof typeof MeshTypes) {
			if (type === "Box") {
				set((state) => {
					return {
						data: {
							...state.data,
							meshArr: [...state.data.meshArr, createBox()]
						}
					};
				});
			} else if (type === "Cylinder") {
			}
		}
	};
});

export { useThreeStore, MeshTypes };
