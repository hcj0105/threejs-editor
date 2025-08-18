

import Menu from "./components/Menu";
import Main from "./components/Main";
import Properties from "./components/Properties";

function App() {
	return (
		<div className='flex flex-col h-screen'>
			<Menu />
			<div className='flex-1 flex flex-row bg-pink-200'>
				<Main />
				<Properties />
			</div>
		</div>
	);
}

export default App;
