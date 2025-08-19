import { useThreeStore } from "../store";

type Props = {};

const Properties = (props: Props) => {
	const { data } = useThreeStore();

	return (
		<div className='flex-1'>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};

export default Properties;
