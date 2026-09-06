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
			className={`py-24 lg:py-40 ${background ?? ""} border-b border-nb-line`}
			id={id}
		>
			<div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
				{children}
			</div>
		</section>
	);
};
