import { For, useContext } from "solid-js";

import { FaRegularUser } from "solid-icons/fa";
import { IoCalendarClearOutline } from "solid-icons/io";

import { Track } from "@lastfm-viewer/utils/LFMtypes";
import { TrackInfo } from "@lastfm-viewer/utils/types";

import { lfmContext } from "../SolidLastFMViewer";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

import styles from "@lastfm-viewer/ui/PastTracks.module.css";

const PastTracks = () => {
	const context = useContext(lfmContext);

	return (
		<>
			<div
				class={styles.pastTracks}
				style={{
					color: context.colors?.secondary,
					background: context.colors?.accent
				}}
			>
				<LoadingSkeleton class="h-[200px]" fallback={<div></div>}>
					<div
						class={styles.pastTracks__title}
						style={{
							color: context.colors?.secondary,
							background: context.colors?.primary
						}}
					>
						Past tracks
					</div>
					<For
						each={
							(context.track as TrackInfo)?.pastTracks?.filter(
								(_, index) => index !== 0
							) as Track[]
						}
						fallback={<div>Loading...</div>}
					>
						{(track_) => {
							return (
								<div class={styles.pastTracks__track}>
									<div class="divider m-0.5 h-min"></div>
									<div class={styles.scrollable}>
										<a
											href={track_.url}
											target="_blank"
											class={
												styles.pastTracks__trackTitle
											}
											style={{
												color: context.colors?.secondary
											}}
										>
											{track_.name}
										</a>
										<span
											class={styles.scrollable__artist}
											style={{
												color: context.colors?.secondary
											}}
										>
											<FaRegularUser />
											{track_.artist["#text"]}
										</span>
										<span
											class={styles.scrollable__date}
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
				</LoadingSkeleton>
			</div>
		</>
	);
};

export default PastTracks;
