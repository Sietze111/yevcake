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
			<h2 className="font-mono text-4xl sm:text-5xl font-bold text-nb-black uppercase">
				{title}
			</h2>
		</Reveal>
	);
};
