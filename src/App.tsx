import "./App.css";
import Test from "./Test";
import SolidLastFMViewer from "./components/SolidLastFMViewer";

SolidLastFMViewer;
function App() {
	return (
		<>
			<SolidLastFMViewer
				user="ZOASR"
				api_key={import.meta.env.VITE_API_KEY}
				updateInterval={10000}
			/>
			<Test api_key="very_wrong_api_key" />
		</>
	);
}

export default App;
