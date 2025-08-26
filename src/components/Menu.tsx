import { Menu as AntDMenu } from "antd";
import { MeshTypes, useThreeStore } from "../store";

const items = [
	{
		label: "Add",
		key: "add",
		children: [
			{
				type: "group",
				label: "Mesh",
				children: [
					{ label: "立方体", key: MeshTypes.Box },
					{ label: "圆柱", key: MeshTypes.Cylinder }
				]
			},
			{
				type: "group",
				label: "Light",
				children: [
					{ label: "点光源", key: "PointLight" },
					{ label: "平行光", key: "DirectionalLight" }
				]
			}
		]
	},
	{
		label: "Delete",
		key: "delete",
		children: []
	}
];

const Menu = () => {
	const { addMesh } = useThreeStore();

	function handleClick(menuInfo: any) {
		addMesh(menuInfo.key);
	}

	return (
		<div className='h-[60px] border-b'>
			<AntDMenu mode='horizontal' items={items} onClick={handleClick} />
		</div>
	);
};

export default Menu;
