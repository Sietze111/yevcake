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
				tagClassName="bg-chocolate-950"
				tagTextClassName="text-cream-50"
				title={t("order.subtitle")}
			/>
			<CakeInquiryForm />
		</ContentSection>
	);
};
