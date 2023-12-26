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
	})
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
		<lfmContext.Provider value={{ colors: colors, track: track }}>
			<div
				class="glass  relative mx-auto flex h-full w-full flex-col rounded-lg p-4 shadow-xl ring-2 ring-slate-950/5"
				style={{ background: colors()?.primary }}
			>
				{track() instanceof Error ? (
					<div>
						{unexpectedErrors.includes(message()) ? (
							""
						) : (
							<h1>
								Hello developer👋, please consider handling the
								following error before deployment:
							</h1>
						)}

						<div class="mx-auto my-4 w-11/12 rounded-lg bg-red-900 p-5 text-xl text-red-200 shadow-inner">
							<span class="mr-2 rounded-lg bg-black/10 p-2 text-white">
								Error
							</span>
							{message()}
						</div>
					</div>
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
								{loading() ? (
									<div class="flex justify-center">
										<div class="skeleton mr-2 h-4 w-4 rounded-full"></div>
										<div class="skeleton h-4 w-1/2"></div>
									</div>
								) : (track() as TrackInfo)?.artistName ? (
									<span class="flex items-center justify-center gap-1">
										<FaRegularUser />
										{(track() as TrackInfo)?.artistName}
									</span>
								) : (
									"Artist name not available"
								)}
								{loading() ? (
									<div class="flex justify-center">
										<div class="skeleton mr-2 h-4 w-4 rounded-full"></div>
										<div class="skeleton h-4 w-1/2"></div>
									</div>
								) : (track() as TrackInfo)?.albumTitle ? (
									<span class="flex items-center justify-center gap-1">
										<FaSolidCompactDisc />
										{(track() as TrackInfo)?.albumTitle}
									</span>
								) : (
									"Album name is not Available"
								)}
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
