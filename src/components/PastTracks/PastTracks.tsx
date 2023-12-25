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
				class="mb-4 rounded-lg sm:p-4 p-0.5"
				style={{
					color: context.colors()?.secondary,
					background: context.colors()?.accent + "22",
				}}
			>
				<div
					class="divider w-1/2 sm:text-sm text-xs mx-auto mb-0 mt-0.5 rounded-lg p-4"
					style={{
						color: context.colors()?.secondary,
						background: context.colors()?.accent + "22",
					}}
				>
					Past tracks
				</div>
				<For
					each={
						context.track() instanceof Error
							? []
							: (context.track() as TrackInfo)?.pastTracks
							? cloneArray(
									(context.track() as TrackInfo)
										?.pastTracks as any[]
							  ).splice(
									1,
									(
										(context.track() as TrackInfo)
											?.pastTracks as Track[]
									).length
							  )
							: []
					}
					fallback={<div>Loading...</div>}
				>
					{(track_) => {
						return (
							<div class="sm:text-[75%]  text-[50%]">
								<div class="divider m-0.5 h-min"></div>
								<div
									class={
										"flex justify-between items-center gap-4 overflow-x-scroll whitespace-nowrap width-full " +
										styles.scrollable
									}
								>
									<a
										href={track_.url}
										target="_blank"
										class="hover:underline text-start transition-all duration-150 flex-1 font-black text-ellipsis"
										style={{
											color: context.colors()?.secondary,
										}}
									>
										{track_.name}
									</a>
									<span
										class="flex items-center sm:flex-row flex-col flex-1 "
										style={{
											color: context.colors()?.secondary,
										}}
									>
										<FaRegularUser />
										{track_.artist["#text"]}
									</span>
									<span
										class="flex sm:flex-row flex-col items-center "
										style={{
											color: context.colors()?.secondary,
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
