import { useTranslation } from "react-i18next";
import { CONTACT } from "../common/constants";
import type { FunctionComponent } from "../common/types";
import {
	InfoRow,
	LegalPageShell,
	LegalSectionHeading,
} from "../components/layout/LegalPageShell";

export const PrivacyPage = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<LegalPageShell title={t("privacy.title")}>
			<p>{t("privacy.intro")}</p>

			<InfoRow label={t("privacy.controllerLabel")}>
				{CONTACT.businessName}
				<br />
				{CONTACT.address}
			</InfoRow>

			<LegalSectionHeading title={t("privacy.collectedTitle")} />
			<p>{t("privacy.collectedText")}</p>

			<LegalSectionHeading title={t("privacy.purposeTitle")} />
			<p>{t("privacy.purposeText")}</p>

			<LegalSectionHeading title={t("privacy.processorsTitle")} />
			<p>{t("privacy.processorsText")}</p>

			<LegalSectionHeading title={t("privacy.rightsTitle")} />
			<p>{t("privacy.rightsText")}</p>

			<LegalSectionHeading title={t("privacy.contactTitle")} />
			<p>
				{t("privacy.contactText")}{" "}
				<a className="font-bold underline" href={`mailto:${CONTACT.email}`}>
					{CONTACT.email}
				</a>
			</p>

			<LegalSectionHeading title={t("privacy.changesTitle")} />
			<p>{t("privacy.changesText")}</p>
		</LegalPageShell>
	);
};
