import { Accessor, useContext } from "solid-js";
import { Colors, lfmContext } from "../SolidLastFMViewer";
import styles from "./TrackProgressBar.module.css";
import { TrackInfo } from "../lastfm";

const msToMins = (ms: number) =>
	Math.floor(ms / 1000 / 60).toLocaleString(undefined, {
		maximumSignificantDigits: 2,
	});
const msToSecs = (ms: number) =>
	Math.floor((ms / 1000) % 60).toLocaleString(undefined, {
		maximumSignificantDigits: 2,
	});

const TrackProgressBar = () => {
	const context = useContext<{
		colors: Accessor<Colors | undefined>;
		track: Accessor<TrackInfo | Error | undefined>;
	}>(lfmContext);
	return (
		<>
			<div class="w-full flex justify-center items-center my-0.5">
				<span class={styles.nowplaying}> Now Playing</span>
				<div class={styles.icon}>
					<span
						class={styles.musicbar}
						style={{
							background: context?.colors()?.secondary,
						}}
					/>
					<span
						class={styles.musicbar}
						style={{
							background: context?.colors()?.secondary,
						}}
					/>
					<span
						class={styles.musicbar}
						style={{
							background: context?.colors()?.secondary,
						}}
					/>
				</div>
			</div>
			<div
				class="flex items-center gap-1 whitespace-nowrap"
				style={{ color: context?.colors()?.secondary }}
			>
				<span class="text-xs">00:00</span>
				<progress
					class="progress mx-auto w-10/12"
					max={
						context.track() instanceof Error
							? 0
							: (context.track() as TrackInfo)
							? ((context.track() as TrackInfo)
									?.duration as number) / 1000
							: 0
					}
				></progress>
				<span class="text-xs">
					{context.track() instanceof Error
						? " "
						: (context.track() as TrackInfo)
						? ((context.track() as TrackInfo)?.duration as number) >
						  0
							? `${msToMins(
									(context.track() as TrackInfo)
										?.duration as number
							  )}:${msToSecs(
									(context.track() as TrackInfo)
										?.duration as number
							  )}`
							: "--:--"
						: "--:--"}
				</span>
			</div>
		</>
	);
};

export default TrackProgressBar;
