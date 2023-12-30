import { createEffect, createResource, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { prominent } from "color.js";
import { TrackInfo, getLatestTrack } from "@repo/utils/lastftm";
import { Colors, Props } from "./SolidLastFMViewer";

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
	const [track, { refetch }] = createResource(get);
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

	async function get(
		source: boolean,
		{ value }: { value: TrackInfo | Error | undefined }
	) {
		const data: TrackInfo | Error = await getLatestTrack(user, api_key);
		const dataTrack: string | undefined = !(data instanceof Error)
			? data.trackName
			: "";
		const valueTrack: string | undefined =
			value && !(value instanceof Error) ? value.trackName : "";
		let areSame: boolean;
		areSame = source && dataTrack == valueTrack;
		if (!(data instanceof Error)) {
			if (!areSame) {
				setLfmState((state) => ({
					...state,
					track: data,
					loading: false
				}));
			}
		} else {
			setLfmState((state) => ({
				...state,
				message: data.message,
				loading: track.loading,
				track: data
			}));
		}

		return data;
	}

	createEffect(() => {
		let intervalRef: number;
		if (updateInterval) {
			intervalRef = setInterval(() => {
				refetch();
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
