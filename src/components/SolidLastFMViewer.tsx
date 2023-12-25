import { Accessor, createContext } from "solid-js";
import { TrackInfo } from "./lastfm";

import TrackProgressBar from "./TrackProgressBar/TrackProgressBar";
import PastTracks from "./PastTracks/PastTracks";

import {
	FaBrandsLastfm,
	FaRegularUser,
	FaSolidCompactDisc,
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
		error: undefined,
	}),
});

const unexpectedErrors = [
	"NetworkError when attempting to fetch resource.",
	"Login: User required to be logged in",
	"Failed to fetch",
];

const SolidLastFMViewer = ({ api_key, user, updateInterval }: Props) => {
	const { track, colors, loading, message }: lfmvHook = useLastfmViewer({
		api_key,
		user,
		updateInterval,
	});
	return (
		<lfmContext.Provider value={{ colors: colors, track: track }}>
			<div
				class="flex  flex-col w-full h-full glass mx-auto shadow-xl relative ring-2 rounded-lg ring-slate-950/5 p-4"
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

						<div class="text-red-200 text-xl p-5 bg-red-900 rounded-lg w-11/12 mx-auto my-4 shadow-inner">
							<span class="p-2 text-white mr-2 bg-black/10 rounded-lg">
								Error
							</span>
							{message()}
						</div>
					</div>
				) : (
					<>
						<figure
							class="h-auto mx-auto overflow-hidden border-inherit mb-2 rounded-lg"
							style={{
								"box-shadow": `0 0 20px ${
									colors()?.secondary
								}99`,
							}}
						>
							{(track() as TrackInfo)?.lastfmImages &&
							(
								(track() as TrackInfo)
									?.lastfmImages as LastFmImage[]
							)[3]["#text"] ? (
								<img
									class="object-cover w-min overflow-hidden"
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
									class="object-cover w-min overflow-hidden"
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

						<div class="flex flex-col gap-1 filter drop-shadow-lg h-min">
							{(track() as TrackInfo)?.nowplaying ? (
								<TrackProgressBar />
							) : (
								""
							)}
							<h1
								class="sm:text-base text-xs shadow:lg text-center mx-auto mt-1 font-bold"
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
								class="text-xs flex flex-col gap-2"
							>
								{loading() ? (
									<div class="flex justify-center">
										<div class="skeleton mr-2 h-4 w-4 rounded-full"></div>
										<div class="skeleton h-4 w-1/2"></div>
									</div>
								) : (track() as TrackInfo)?.artistName ? (
									<span class="flex justify-center items-center gap-1">
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
									<span class="flex justify-center items-center gap-1">
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
								class="flex w-full  mt-2 filter drop-shadow-lg justify-between"
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
									class=" text-xs flex gap-2 items-center"
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
