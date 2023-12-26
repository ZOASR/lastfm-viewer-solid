import { Accessor, createContext } from "solid-js";
import { TrackInfo } from "./lastfm";

import TrackProgressBar from "./TrackProgressBar/TrackProgressBar";
import PastTracks from "./PastTracks/PastTracks";

import {
	FaBrandsLastfm,
	FaRegularUser,
	FaSolidCompactDisc
} from "solid-icons/fa";
import { SiMusicbrainz } from "solid-icons/si";

import disc from "./disc.svg";
import "../index.css";
import { lfmvHook, useLastfmViewer } from "./useLastfmViewer";
import { LastFmImage } from "./LFMtypes";
import { Image } from "./MBtypes";
import ErrorView from "./ErrorView/ErrorView";
import LoadingSkeleton from "./LoadingSkeleton/LoadingSkeleton";

export interface Colors {
	primary: string | undefined;
	secondary: string | undefined;
	accent: string | undefined;
}
export interface Props {
	api_key: string;
	user: string;
	updateInterval?: number;
}

export const lfmContext = createContext<{
	colors: Accessor<Colors | undefined>;
	track: Accessor<TrackInfo | Error | undefined>;
	loading: Accessor<boolean | undefined>;
}>({
	colors: () => ({ primary: "white", secondary: "black", accent: "#aaa" }),
	track: () => ({
		trackName: "",
		artistName: "",
		albumTitle: "",
		MBImages: [],
		lastfmImages: [],
		nowplaying: false,
		pastTracks: [],
		duration: 0,
		error: undefined
	}),
	loading: () => true
});

const unexpectedErrors = [
	"NetworkError when attempting to fetch resource.",
	"Login: User required to be logged in",
	"Failed to fetch"
];

const SolidLastFMViewer = ({ api_key, user, updateInterval }: Props) => {
	const { track, colors, loading, message }: lfmvHook = useLastfmViewer({
		api_key,
		user,
		updateInterval
	});
	return (
		<lfmContext.Provider
			value={{ colors: colors, track: track, loading: loading }}
		>
			<div
				class="glass  relative mx-auto flex h-full w-full flex-col rounded-lg p-4 shadow-xl ring-2 ring-slate-950/5"
				style={{ background: colors()?.primary }}
			>
				{track() instanceof Error ? (
					<ErrorView message={message()} />
				) : (
					<>
						<figure
							class="mx-auto mb-2 h-auto overflow-hidden rounded-lg border-inherit"
							style={{
								"box-shadow": `0 0 20px ${colors()
									?.secondary}99`
							}}
						>
							{(track() as TrackInfo)?.lastfmImages &&
							(
								(track() as TrackInfo)
									?.lastfmImages as LastFmImage[]
							)[3]["#text"] ? (
								<img
									class="w-min overflow-hidden object-cover"
									src={
										(
											(track() as TrackInfo)
												?.lastfmImages as LastFmImage[]
										)[3]["#text"]
									}
									alt="Album Cover"
								/>
							) : (track() as TrackInfo)?.MBImages ? (
								<img
									class="w-min overflow-hidden object-cover"
									src={
										(
											(track() as TrackInfo)
												?.MBImages as Image[]
										)[0].image
									}
									alt="Album Cover"
								/>
							) : (
								<img
									src={disc}
									class=""
									alt="Default album cover thumbnail"
								/>
							)}
						</figure>

						<div class="flex h-min flex-col gap-1 drop-shadow-lg filter">
							{(track() as TrackInfo)?.nowplaying ? (
								<TrackProgressBar />
							) : (
								""
							)}
							<h1
								class="shadow:lg mx-auto mt-1 text-center text-xs font-bold sm:text-base"
								style={{ color: colors()?.secondary }}
							>
								{loading() ? (
									<div class="skeleton h-8 w-fit"></div>
								) : (track() as TrackInfo)?.trackName ? (
									(track() as TrackInfo)?.trackName
								) : (
									"Track title not available"
								)}
							</h1>
							<div
								style={{ color: colors()?.secondary }}
								class="flex flex-col gap-2 text-xs"
							>
								<LoadingSkeleton fallbackMsg="Artist name not available">
									{
										<span class="flex items-center justify-center gap-1">
											<FaRegularUser />
											{(track() as TrackInfo)?.artistName}
										</span>
									}
								</LoadingSkeleton>
								<LoadingSkeleton fallbackMsg="Album name not available">
									{
										<span class="flex items-center justify-center gap-1">
											<FaSolidCompactDisc />
											{(track() as TrackInfo)?.albumTitle}
										</span>
									}
								</LoadingSkeleton>
							</div>
							<PastTracks />
							<div
								style={{ color: colors()?.secondary }}
								class="mt-2 flex  w-full justify-between drop-shadow-lg filter"
							>
								<span class="flex gap-2">
									<a
										href="https://www.last.fm/"
										target="_blank"
										class="h-min self-center "
									>
										<FaBrandsLastfm />
									</a>
									<a
										href="https://musicbrainz.org/"
										target="_blank"
									>
										<SiMusicbrainz />
									</a>
								</span>
								<a
									class=" flex items-center gap-2 text-xs"
									href={`https://www.last.fm/user/${user}`}
								>
									<FaRegularUser />
									{user}
								</a>
							</div>
						</div>
					</>
				)}
			</div>
		</lfmContext.Provider>
	);
};

export default SolidLastFMViewer;
