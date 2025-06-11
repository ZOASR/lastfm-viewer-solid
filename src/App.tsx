import { createSignal } from "solid-js";
import "./App.css";
import Test from "./Test";
import SolidLastFMViewer from "./components/SolidLastFMViewer";

SolidLastFMViewer;
function App() {
	const [isTest, setIsTest] = createSignal(false);
	return (
		<>
			<button
				class="rounded-md bg-black p-4 text-white"
				onclick={() => setIsTest(!isTest())}
			>
				View {isTest() ? "Live" : "Test"}
			</button>
			{!isTest() && (
				<SolidLastFMViewer user="ZOASR" updateInterval={10000} />
			)}
			{isTest() && <Test api_key={import.meta.env.VITE_API_KEY} />}
			{/* <Test api_key="very_wrong_api_key" /> */}
		</>
	);
}

export default App;
