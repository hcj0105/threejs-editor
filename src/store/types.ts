import { MeshTypes } from ".";

export interface BaseMesh {
	id: string;
	type: keyof typeof MeshTypes;
	name: string;
	props: {
		width?: number;
		height?: number;
		depth?: number;
		radiusTop?: number;
		radiusBottom?: number;
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
}
