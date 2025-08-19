import { Menu as AntDMenu } from "antd";
import { useThreeStore } from "../store";

const items = [
	{
		label: "Add",
		key: "add",
		children: [
			{
				type: "group",
				label: "Mesh",
				children: [
					{ label: "立方体", key: "Box" },
					{ label: "圆柱", key: "Cylinder" }
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
