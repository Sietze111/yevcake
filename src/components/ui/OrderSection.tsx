import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../../common/types";
import { CakeInquiryForm } from "../forms/CakeInquiryForm";
import { ContentSection } from "./ContentSection";
import { SectionHeading } from "./SectionHeading";

export const OrderSection = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<ContentSection background="bg-nb-lilac" id="inquiry">
			<SectionHeading
				tag={t("order.title")}
				tagClassName="bg-nb-black text-nb-yellow"
				title={t("order.subtitle")}
			/>
			<CakeInquiryForm />
		</ContentSection>
	);
};
