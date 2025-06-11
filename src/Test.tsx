// @ts-expect-error no declaration file for built lib
import SolidLastFMViewer from "../dist/index.es";

function Test() {
	return (
		<>
			<SolidLastFMViewer user="ZOASR" updateInterval={10000} />
		</>
	);
}

export default Test;
