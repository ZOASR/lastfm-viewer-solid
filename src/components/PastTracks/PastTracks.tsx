import { For, useContext } from "solid-js";

import { Icon } from "@iconify-icon/solid";

import { Track } from "@lastfm-viewer/utils/LFMtypes";
import { TrackInfo } from "@lastfm-viewer/utils/types";

import { lfmContext } from "../SolidLastFMViewer";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const PastTracks = () => {
	const context = useContext(lfmContext);

	return (
		<>
			<div
				class={`pastTracks`}
				style={{
					color: context.colors?.secondary,
					background: context.colors?.accent
				}}
			>
				<LoadingSkeleton class="h-[200px]" fallback={<div></div>}>
					<div
						class={`pastTracks__title`}
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
								<div class={`pastTracks__track`}>
									<div class="divider m-0.5 h-min"></div>
									<div class={`scrollable`}>
										<a
											href={track_.url}
											target="_blank"
											class={`pastTracks__trackTitle`}
											style={{
												color: context.colors?.secondary
											}}
										>
											{track_.name}
										</a>
										<span
											class={`scrollable__artist`}
											style={{
												color: context.colors?.secondary
											}}
										>
											<Icon icon="fa6-regular:user" />
											{track_.artist["#text"]}
										</span>
										<span
											class={`scrollable__date`}
											style={{
												color: context.colors?.secondary
											}}
										>
											<Icon icon="ion:calendar-clear-outline" />
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
