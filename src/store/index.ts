import * as THREE from "three";
import { create } from "zustand";
import type { BaseMesh } from "./types";
import { createBox, createCylinder } from "./create";

const MeshTypes = {
	Box: "Box",
	Cylinder: "Cylinder"
} as const;

export type ThreeStoreStateData = {
	meshArr: BaseMesh[];
};

type ThreeStoreState = {
	data: ThreeStoreStateData;
	selectedObj: THREE.Object3D | null;
	setSelectedObj: (obj: THREE.Object3D | null) => void;
	addMesh: (type: keyof typeof MeshTypes) => void;
};

const useThreeStore = create<ThreeStoreState>((set) => {
	return {
		data: {
			meshArr: [createBox()]
		},
		selectedObj: null,
		setSelectedObj(obj: THREE.Object3D | null) {
			set({ selectedObj: obj });
		},
		/**
		 * 添加几何体
		 * @param type Mesh 类型
		 */
		addMesh(type: keyof typeof MeshTypes) {
			if (type === MeshTypes.Box) {
				set((state) => {
					return {
						data: {
							...state.data,
							meshArr: [...state.data.meshArr, createBox()]
						}
					};
				});
			} else if (type === MeshTypes.Cylinder) {
				set((state) => {
					return {
						data: {
							...state.data,
							meshArr: [...state.data.meshArr, createCylinder()]
						}
					};
				});
			}
		}
	};
});

export { useThreeStore, MeshTypes };
