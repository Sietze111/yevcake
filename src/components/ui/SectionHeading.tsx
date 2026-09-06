import type { FunctionComponent } from "../../common/types";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
	tag: string;
	title: string;
	tagClassName?: string;
}

export const SectionHeading = ({
	tag,
	title,
	tagClassName = "bg-nb-yellow",
}: SectionHeadingProps): FunctionComponent => {
	return (
		<Reveal className="mb-12">
			<div className={`nb-tag w-fit mb-4 ${tagClassName}`}>{tag}</div>
			<h2 className="font-mono text-4xl sm:text-5xl font-semibold leading-[1.15] text-nb-black [text-wrap:balance]">
				{title}
			</h2>
			<span aria-hidden="true" className="nb-divider mt-5" />
		</Reveal>
	);
};
