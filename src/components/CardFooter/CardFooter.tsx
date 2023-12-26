import { Colors } from "../SolidLastFMViewer";
import { FaBrandsLastfm, FaRegularUser } from "solid-icons/fa";
import { SiMusicbrainz } from "solid-icons/si";

const CardFooter = ({
	colors,
	user
}: {
	colors: Colors | undefined;
	user: string;
}) => {
	return (
		<div
			style={{ color: colors?.secondary }}
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
				<a href="https://musicbrainz.org/" target="_blank">
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
	);
};

export default CardFooter;
