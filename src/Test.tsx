// @ts-expect-error no declaration file for built lib
import SolidLastFMViewer from "../dist/index.es";

function Test({ api_key }: { api_key: string }) {
	return (
		<>
			<SolidLastFMViewer
				user="ZOASR"
				api_key={api_key}
				updateInterval={10000}
			/>
		</>
	);
}

export default Test;
