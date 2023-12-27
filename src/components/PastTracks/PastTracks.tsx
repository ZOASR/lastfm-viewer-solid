import { For, useContext } from "solid-js";
import { lfmContext } from "../SolidLastFMViewer";
import styles from "./PastTracks.module.css";
import { FaRegularUser } from "solid-icons/fa";
import { IoCalendarClearOutline } from "solid-icons/io";
import { Track } from "../MBtypes";
import { TrackInfo } from "../lastfm";

const identity: (x: any) => any = (x: any) => x;
function cloneArray(arr: any[]) {
	return arr.map(identity);
}

const PastTracks = () => {
	const context = useContext(lfmContext);

	return (
		<>
			<div
				class="mb-4 rounded-lg p-0.5 sm:p-4"
				style={{
					color: context.colors?.secondary,
					background: context.colors?.accent + "22"
				}}
			>
				<div
					class="divider mx-auto mb-0 mt-0.5 w-1/2 rounded-lg p-2 text-xs sm:text-sm"
					style={{
						color: context.colors?.secondary,
						background: context.colors?.accent + "22"
					}}
				>
					Past tracks
				</div>
				<For
					each={
						context.track instanceof Error
							? []
							: (context.track as TrackInfo)?.pastTracks
								? cloneArray(
										context.track?.pastTracks as any[]
									).splice(
										1,
										(context.track?.pastTracks as Track[])
											.length
									)
								: []
					}
					fallback={<div>Loading...</div>}
				>
					{(track_) => {
						return (
							<div class="text-[50%]  sm:text-[75%]">
								<div class="divider m-0.5 h-min"></div>
								<div
									class={
										"width-full flex items-center justify-between gap-4 overflow-x-scroll whitespace-nowrap " +
										styles.scrollable
									}
								>
									<a
										href={track_.url}
										target="_blank"
										class="flex-1 text-ellipsis text-start font-black transition-all duration-150 hover:underline"
										style={{
											color: context.colors?.secondary
										}}
									>
										{track_.name}
									</a>
									<span
										class="flex flex-1 flex-col items-center sm:flex-row "
										style={{
											color: context.colors?.secondary
										}}
									>
										<FaRegularUser />
										{track_.artist["#text"]}
									</span>
									<span
										class="flex flex-col items-center sm:flex-row "
										style={{
											color: context.colors?.secondary
										}}
									>
										<IoCalendarClearOutline />
										{track_.date["#text"]}
									</span>
								</div>
							</div>
						);
					}}
				</For>
			</div>
		</>
	);
};

export default PastTracks;
