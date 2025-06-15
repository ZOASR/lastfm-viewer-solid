import { createEffect, createResource, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { getLatestTrack } from "@lastfm-viewer/utils/lastfm";
import { Colors, TrackInfo } from "@lastfm-viewer/utils/types";
import { Props } from "./SolidLastFMViewer";

export type lfmvHook = {
	track: TrackInfo | Error | undefined;
	colors: Colors | undefined;
	loading: boolean;
	message: string | undefined;
};

export const useLastfmViewer: (props: Props) => lfmvHook = ({
	user,
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
				accent: "",
				coverShadowColor: ""
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
		const data: TrackInfo | Error = await getLatestTrack(user);
		const dataTrack: string | undefined = !(data instanceof Error)
			? data.trackName
			: "";
		const valueTrack: string | undefined =
			value && !(value instanceof Error) ? value.trackName : "";
		const areSame = source && dataTrack == valueTrack;
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

		// Validate updateInterval to be at least 2 seconds
		const MIN_UPDATE_INTERVAL = 2000; // 2 seconds in milliseconds
		const safeUpdateInterval = updateInterval
			? Math.max(updateInterval, MIN_UPDATE_INTERVAL)
			: undefined;

		if (updateInterval && updateInterval < MIN_UPDATE_INTERVAL) {
			console.warn(
				`updateInterval is too low. Using minimum allowed value of ${MIN_UPDATE_INTERVAL}ms to prevent rate limiting.`
			);
		}

		if (safeUpdateInterval) {
			intervalRef = setInterval(() => {
				refetch();
			}, safeUpdateInterval);
		}

		onCleanup(() => {
			if (intervalRef) clearInterval(intervalRef);
		});
	});
	return lfmState;
};
