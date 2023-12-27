import { prominent } from "color.js";
import { TrackInfo, getLatestTrack } from "./lastfm";
import { Colors } from "./SolidLastFMViewer";
import { Props } from "./SolidLastFMViewer";
import { createEffect, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";

export type lfmvHook = {
	track: TrackInfo | Error | undefined;
	colors: Colors | undefined;
	loading: boolean;
	message: string | undefined;
};

export const useLastfmViewer: ({}: Props) => lfmvHook = ({
	user,
	api_key,
	updateInterval
}: Props) => {
	const [lfmState, setLfmState] = createStore<{
		track: TrackInfo | Error;
		colors: Colors | undefined;
		loading: boolean;
		message: string | undefined;
	}>({
		track: {
			trackName: "",
			artistName: "",
			albumTitle: "",
			MBImages: undefined,
			lastfmImages: undefined,
			nowplaying: false,
			pastTracks: [],
			duration: 0
		},
		colors: undefined,
		loading: true,
		message: undefined
	});
	createEffect(() => {
		const get = async () => {
			const data: TrackInfo | Error = await getLatestTrack(user, api_key);
			if (data instanceof Error) {
				setLfmState((state) => ({
					...state,
					message: data.message,
					loading: false,
					track: data
				}));
			} else {
				setLfmState((state) => ({
					...state,
					track: data,
					loading: false
				}));
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
		const track_ = lfmState.track;
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
				sample: 10
			})
				.then((color) => {
					const color1: string = color[0] as string;
					const color2: string = color[98] as string;
					const color3: string = color[51] as string;

					setLfmState((state) => ({
						...state,
						colors: {
							primary: color1,
							secondary: color2,
							accent: color3
						}
					}));
				})
				.catch(() =>
					setLfmState((state) => ({
						...state,
						colors: undefined
					}))
				);
		}
	});

	return lfmState;
};
