import { JSX } from "solid-js/jsx-runtime";
import { Show, useContext } from "solid-js";
import { lfmContext } from "../SolidLastFMViewer";

interface Props {
	children: JSX.Element | "";
	fallbackMsg: string;
}

const LoadingSkeleton = (props: Props) => {
	const context = useContext(lfmContext);
	return (
		<>
			<Show
				when={context.loading}
				fallback={
					<Show when={props.children} fallback={props.fallbackMsg}>
						{props.children}
					</Show>
				}
			>
				<div class="flex justify-center">
					<div class="skeleton mr-2 h-4 w-4 rounded-full"></div>
					<div class="skeleton h-4 w-1/2"></div>
				</div>
			</Show>
		</>
	);
};

export default LoadingSkeleton;
