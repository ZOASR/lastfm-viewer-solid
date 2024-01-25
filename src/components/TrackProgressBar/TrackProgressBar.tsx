import { Match, Switch, useContext } from "solid-js";
import { lfmContext } from "../SolidLastFMViewer";
import styles from "@lastfm-viewer/ui/TrackProgressBar.module.css";
import { TrackInfo } from "@lastfm-viewer/utils/types";
import { msToMins, msToSecs } from "@lastfm-viewer/utils/utils";

const TrackProgressBar = () => {
	const context = useContext(lfmContext);
	return (
		<>
			<div class={styles.trackProgress}>
				<span class={styles.nowplaying}> Now Playing</span>
				<div class={styles.icon}>
					<span
						class={styles.musicbar}
						style={{
							background: context?.colors?.secondary
						}}
					/>
					<span
						class={styles.musicbar}
						style={{
							background: context?.colors?.secondary
						}}
					/>
					<span
						class={styles.musicbar}
						style={{
							background: context?.colors?.secondary
						}}
					/>
				</div>
			</div>
			<div
				class={styles.bar}
				style={{ color: context?.colors?.secondary }}
			>
				<span>00:00</span>
				<progress
					class="progress"
					max={
						context.track instanceof Error
							? 0
							: context.track
								? (context.track?.duration as number) / 1000
								: 0
					}
				></progress>
				<span>
					<Switch fallback={"--:--"}>
						<Match when={context.track instanceof Error}>
							{"--:--"}
						</Match>
						<Match
							when={
								!(context.track instanceof Error) &&
								context.track &&
								context.track?.duration > 0
							}
						>
							{msToMins(
								(context.track as TrackInfo)?.duration as number
							)}
							{":"}
							{msToSecs(
								(context.track as TrackInfo)?.duration as number
							)}
						</Match>
					</Switch>
				</span>
			</div>
		</>
	);
};

export default TrackProgressBar;
