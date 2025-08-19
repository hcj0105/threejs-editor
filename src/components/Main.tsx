import { useEffect, useRef } from "react";
import { init } from "./init";
import { useThreeStore, MeshTypes } from "../store/index";

const Main = () => {
	const editRef = useRef<HTMLDivElement>(null);

	const { data } = useThreeStore();

	useEffect(() => {
		if (editRef.current) {
			const { scene } = init(editRef.current, data);
		}

		return () => {
			if (editRef.current) {
				editRef.current.innerHTML = "";
			}
		};
	}, []);

	return (
		<div ref={editRef} className='w-[85vw] border-r border-[#000]'></div>
	);
};

export default Main;
