import { Show, createContext } from "solid-js";

import TrackProgressBar from "./TrackProgressBar/TrackProgressBar";
import PastTracks from "./PastTracks/PastTracks";

import { Icon } from "@iconify-icon/solid";

import disc from "./disc.svg";
import { lfmvHook, useLastfmViewer } from "./useLastfmViewer";
import ErrorView from "./ErrorView/ErrorView";
import LoadingSkeleton from "./LoadingSkeleton/LoadingSkeleton";

import styles from "@lastfm-viewer/ui/LastFMViewer.module.css";
import "@lastfm-viewer/ui";
import CardFooter from "./CardFooter/CardFooter";

export interface Props {
	api_key: string;
	user: string;
	updateInterval?: number;
	mode?: "dev" | "prod";
}

export const lfmContext = createContext<lfmvHook>({
	track: {
		trackName: "",
		artistName: "",
		albumTitle: "",
		nowplaying: false,
		imageUrl: "",
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
	message: ""
});

const SolidLastFMViewer = ({
	api_key,
	user,
	updateInterval,
	mode = "dev"
}: Props) => {
	const state: lfmvHook = useLastfmViewer({
		api_key,
		user,
		updateInterval
	});
	return (
		<>
			{/* preconnects */}
			<link href="https://lastfm.freetls.fastly.net" rel="preconnect" />
			<link href="https://archive.org" rel="preconnect" />
			<link href="https://coverartarchive.org" rel="preconnect" />
			<link href="https://musicbrainz.org" rel="preconnect" />
			<link href="https://ws.audioscrobbler.com" rel="preconnect" />
			{/* preconnects */}
			<lfmContext.Provider value={state}>
				<div
					class={styles.lfmvCard}
					style={{ background: state.colors?.primary }}
					data-lfmv="dark"
				>
					{state.track instanceof Error ? (
						<Show when={state.message}>
							{
								<ErrorView
									mode={mode}
									message={state.message as string}
								/>
							}
						</Show>
					) : (
						<>
							<div>
								<figure
									style={{
										"box-shadow": `0 0 20px ${state.colors?.coverShadowColor}`
									}}
								>
									<Show
										when={state.track?.imageUrl}
										fallback={
											<LoadingSkeleton
												class="mx-auto h-[300px] w-[300px]"
												fallback={
													// <img
													// 	src={disc}
													// 	class=""
													// 	alt="Default album cover thumbnail"
													// />
													<div
														classList={{
															"!animate-spin-slow":
																state.track
																	?.nowplaying
														}}
														class="h-max"
													>
														<Icon
															icon="bi:disc-fill"
															class="m-auto text-[clamp(10rem,_10vw,_20rem)] *:h-full *:w-full"
														/>
													</div>
												}
											>
												{null}
											</LoadingSkeleton>
										}
									>
										<img
											src={state.track?.imageUrl}
											alt="Default album cover thumbnail"
										/>
									</Show>
								</figure>
								<LoadingSkeleton
									class="mx-auto h-[40px] w-[90%]"
									fallback={null}
								>
									{state.track?.nowplaying && (
										<TrackProgressBar />
									)}
								</LoadingSkeleton>
								<h1
									class={styles.trackTitle}
									style={{ color: state.colors?.secondary }}
								>
									<LoadingSkeleton
										class={styles.titleSkeleton}
										fallback="Track title not available"
									>
										{state.track?.trackName}
									</LoadingSkeleton>
								</h1>
								<div
									style={{ color: state.colors?.secondary }}
									class="flex flex-col gap-2"
								>
									<LoadingSkeleton
										class={styles.titleSkeleton}
										fallback="Artist name not available"
									>
										{
											<span class={styles.infoSpan}>
												<Icon icon="fa6-regular:user" />
												{state.track?.artistName}
											</span>
										}
									</LoadingSkeleton>
									<LoadingSkeleton
										class={styles.titleSkeleton}
										fallback="Album name not available"
									>
										{state.track?.albumTitle ? (
											<span class={styles.infoSpan}>
												<Icon icon="fa6-solid:compact-disc" />
												{state.track?.albumTitle}
											</span>
										) : null}
									</LoadingSkeleton>
								</div>
							</div>

							<div class={styles.cardBody}>
								<PastTracks />
								<CardFooter user={user} />
							</div>
						</>
					)}
				</div>
			</lfmContext.Provider>
		</>
	);
};

export default SolidLastFMViewer;
