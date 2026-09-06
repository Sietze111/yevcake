import type { FunctionComponent } from "../../common/types";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
	tag: string;
	title: string;
	tagClassName?: string;
	onDark?: boolean;
}

export const SectionHeading = ({
	tag,
	title,
	tagClassName = "bg-nb-yellow",
	onDark = false,
}: SectionHeadingProps): FunctionComponent => {
	const dividerColor = onDark ? "bg-raspberry-300/60" : "bg-raspberry-800/50";
	const heartColor = onDark ? "text-raspberry-300" : "text-raspberry-800";
	const tagBorder = onDark
		? "border-raspberry-300/40 text-raspberry-300"
		: "border-raspberry-800/30 text-raspberry-800";

	return (
		<Reveal className="mb-12">
			<div className={`nb-tag w-fit mb-6 ${tagBorder} ${tagClassName}`}>
				{tag}
			</div>
			<div aria-hidden="true" className="flex items-center gap-4 mb-6">
				<span className={`h-px w-10 ${dividerColor}`} />
				<span className={`font-mono text-xl leading-none ${heartColor}`}>
					{"\u2661"}
				</span>
				<span className={`h-px w-10 ${dividerColor}`} />
			</div>
			<h2
				className={`font-mono text-4xl sm:text-5xl lg:text-6xl font-medium leading-[0.95] tracking-[-0.03em] [text-wrap:balance] ${
					onDark ? "text-cream-50" : "text-chocolate-900"
				}`}
			>
				{title}
			</h2>
		</Reveal>
	);
};
