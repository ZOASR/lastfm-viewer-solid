import { Show, createContext } from "solid-js";
import { lfmvHook, useLastfmViewer } from "./useLastfmViewer";
import { Icon } from "@iconify-icon/solid";

import TrackProgressBar from "./TrackProgressBar/TrackProgressBar";
import PastTracks from "./PastTracks/PastTracks";
import ErrorView from "./ErrorView/ErrorView";
import LoadingSkeleton from "./LoadingSkeleton/LoadingSkeleton";
import CardFooter from "./CardFooter/CardFooter";

import "@lastfm-viewer/ui/styles/LastFMViewer.css";
import "@lastfm-viewer/ui/styles/ErrorView.css";
import "@lastfm-viewer/ui/styles/PastTracks.css";
import "@lastfm-viewer/ui/styles/TrackProgressBar.css";
import "@lastfm-viewer/ui/styles/CardFooter.css";
import "@lastfm-viewer/ui/styles";

export interface Props {
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

const SolidLastFMViewer = ({ user, updateInterval, mode = "dev" }: Props) => {
	const state: lfmvHook = useLastfmViewer({
		user,
		updateInterval
	});
	return (
		<>
			{/* preconnects */}
			<link href="https://lastfm.freetls.fastly.net" rel="preconnect" />
			<link href="https://coverartarchive.org" rel="preconnect" />
			<link
				href="https://lastfm-viewer-api.cloudflare-untying955.workers.dev"
				rel="preconnect"
			/>
			{/* preconnects */}
			<lfmContext.Provider value={state}>
				<div
					class={`lfmvCard`}
					style={{ background: state.colors?.primary }}
					data-lfmv="dark"
				>
					<div data-lfmv="">
						{state.track instanceof Error ? (
							<Show when={state.message}>
								{
									<ErrorView
										mode={mode}
										error={state.track as Error}
									/>
								}
							</Show>
						) : (
							<>
								<div>
									<figure
										style={{
											filter: `drop-shadow(0 0 20px ${state.colors?.coverShadowColor} )`
										}}
									>
										<Show
											when={state.track?.imageUrl}
											fallback={
												<LoadingSkeleton
													class="mx-auto aspect-square w-full"
													fallback={
														<span class="[color:var(--default-secondary)]">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																aria-hidden="true"
																role="img"
																class="h-full w-full"
																classList={{
																	"!animate-spin-slow":
																		state
																			.track
																			?.nowplaying
																}}
																width="1em"
																height="1em"
																viewBox="0 0 16 16"
															>
																<path
																	fill="currentColor"
																	d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-6 0a2 2 0 1 0-4 0a2 2 0 0 0 4 0M4 8a4 4 0 0 1 4-4a.5.5 0 0 0 0-1a5 5 0 0 0-5 5a.5.5 0 0 0 1 0m9 0a.5.5 0 1 0-1 0a4 4 0 0 1-4 4a.5.5 0 0 0 0 1a5 5 0 0 0 5-5"
																></path>
															</svg>
														</span>
													}
												>
													{null}
												</LoadingSkeleton>
											}
										>
											<img
												src={state.track?.imageUrl}
												alt="Album cover thumbnail"
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
										class={`trackTitle`}
										style={{
											color: state.colors?.secondary
										}}
									>
										<LoadingSkeleton
											class={`titleSkeleton`}
											fallback="Track title not available"
										>
											{state.track?.trackName}
										</LoadingSkeleton>
									</h1>
									<div
										style={{
											color: state.colors?.secondary
										}}
										class="flex flex-col gap-2"
									>
										<LoadingSkeleton
											class={`titleSkeleton`}
											fallback="Artist name not available"
										>
											{
												<span class={`infoSpan`}>
													<Icon icon="fa6-regular:user" />
													{state.track?.artistName}
												</span>
											}
										</LoadingSkeleton>
										<LoadingSkeleton
											class={`titleSkeleton`}
											fallback="Album name not available"
										>
											{state.track?.albumTitle ? (
												<span class={`infoSpan`}>
													<Icon icon="fa6-solid:compact-disc" />
													{state.track?.albumTitle}
												</span>
											) : null}
										</LoadingSkeleton>
									</div>
								</div>
								<div class={`cardBody`}>
									<PastTracks />
									<CardFooter user={user} />
								</div>
							</>
						)}
					</div>
				</div>
			</lfmContext.Provider>
		</>
	);
};

export default SolidLastFMViewer;
