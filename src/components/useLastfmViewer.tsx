import { createEffect, createResource, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { Colors, TrackInfo, getLatestTrack } from "@repo/utils/lastftm";
import { Props } from "./SolidLastFMViewer";

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
			imageUrl: undefined,
			nowplaying: false,
			colors: {
				primary: "",
				secondary: "",
				accent: ""
			},
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
					colors: data.colors,
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
	return lfmState;
};
