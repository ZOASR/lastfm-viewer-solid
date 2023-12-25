import { prominent } from "color.js";
import { TrackInfo, getLatestTrack } from "./lastfm";
import { Colors } from "./SolidLastFMViewer";
import { Props } from "./SolidLastFMViewer";
import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";

export type lfmvHook = {
	track: Accessor<TrackInfo | Error | undefined>;
	colors: Accessor<Colors | undefined>;
	loading: Accessor<boolean>;
	message: Accessor<string>;
};

export const useLastfmViewer: ({}: Props) => lfmvHook = ({
	user,
	api_key,
	updateInterval,
}: Props) => {
	const [track, setTrack] = createSignal<TrackInfo | Error>();
	const [colors, setColors] = createSignal<Colors | undefined>();
	const [loading, setLoading] = createSignal(true);
	const [message, setMessage] = createSignal("");

	createEffect(() => {
		const get = async () => {
			const data: TrackInfo | Error = await getLatestTrack(user, api_key);
			if (data instanceof Error) {
				setTrack(data);
				setMessage(data.message);
				setLoading(false);
			} else {
				setTrack(data);
				setLoading(false);
			}
		};
		get();
		let intervalRef: number;
		if (updateInterval) {
			intervalRef = setInterval(() => {
				get();
			}, updateInterval);
		}
		onCleanup(() => {
			if (updateInterval) clearInterval(intervalRef);
		});
	});

	createEffect(() => {
		const track_ = track();
		let imageUrl: string = "";
		if (!(track_ instanceof Error)) {
			if (track_ && track_.lastfmImages) {
				imageUrl = track_?.lastfmImages[3]["#text"];
			} else if (track_ && track_.MBImages) {
				imageUrl = track_.MBImages[0].image;
			}
			prominent(imageUrl, {
				amount: 100,
				format: "hex",
				sample: 10,
			})
				.then((color) => {
					const color1: string = color[0] as string;
					const color2: string = color[98] as string;
					const color3: string = color[51] as string;
					setColors({
						primary: color1,
						secondary: color2,
						accent: color3,
					});
				})
				.catch(() => setColors(undefined));
		}
	});

	return {
		track,
		colors,
		loading,
		message,
	};
};
