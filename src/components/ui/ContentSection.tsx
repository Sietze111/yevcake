import type { ReactNode } from "react";
import type { FunctionComponent } from "../../common/types";

interface ContentSectionProps {
	background?: string;
	children: ReactNode;
	id: string;
}

export const ContentSection = ({
	background,
	children,
	id,
}: ContentSectionProps): FunctionComponent => {
	return (
		<section
			className={`py-20 md:py-28 ${background ?? ""} border-b-4 border-nb-black`}
			id={id}
		>
			<div className="max-w-7xl mx-auto px-6 lg:px-12">{children}</div>
		</section>
	);
};
