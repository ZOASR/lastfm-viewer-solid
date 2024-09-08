import { lfmContext } from "../SolidLastFMViewer";
import { Icon } from "@iconify-icon/solid";
import { useContext } from "solid-js";

import styles from "@lastfm-viewer/ui/CardFooter.module.css";

const CardFooter = ({ user }: { user: string }) => {
	const context = useContext(lfmContext);
	return (
		<div
			style={{ color: context.colors?.secondary }}
			class={styles.cardFooter}
		>
			<span class="flex items-center gap-2">
				<a
					href="https://www.last.fm/"
					target="_blank"
					class="h-min self-center"
				>
					<Icon icon="fa6-brands:square-lastfm" />
				</a>
				<a href="https://musicbrainz.org/" target="_blank">
					<Icon icon="simple-icons:musicbrainz" />
				</a>
			</span>
			<a
				class={styles.profile}
				href={`https://www.last.fm/user/${user}`}
				style={{
					background: context.colors?.secondary,
					color: context.colors?.primary
				}}
			>
				<Icon icon="fa6-regular:user" />
				{user}
			</a>
		</div>
	);
};

export default CardFooter;
