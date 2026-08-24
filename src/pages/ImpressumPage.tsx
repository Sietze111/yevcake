import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { CONTACT } from "../common/constants";
import type { FunctionComponent } from "../common/types";
import {
	InfoRow,
	LegalPageShell,
	LegalSectionHeading,
} from "../components/layout/LegalPageShell";

export const ImpressumPage = (): FunctionComponent => {
	const { t } = useTranslation();

	return (
		<LegalPageShell title={t("impressum.title")}>
			<p>{t("impressum.intro")}</p>

			<InfoRow label={t("impressum.ownerLabel")}>
				{CONTACT.businessName} – {CONTACT.owner}
			</InfoRow>
			<InfoRow label={t("impressum.addressLabel")}>{CONTACT.address}</InfoRow>
			<InfoRow label={t("impressum.contactLabel")}>
				<a
					className="underline hover:text-nb-black"
					href={`mailto:${CONTACT.email}`}
				>
					{CONTACT.email}
				</a>{" "}
				·{" "}
				<a className="underline hover:text-nb-black" href={CONTACT.phoneHref}>
					{CONTACT.phoneDisplay}
				</a>
			</InfoRow>
			<InfoRow label={t("impressum.uidLabel")}>{CONTACT.uid}</InfoRow>

			<LegalSectionHeading title={t("impressum.liabilityTitle")} />
			<p>{t("impressum.liabilityText")}</p>

			<LegalSectionHeading title={t("impressum.copyrightTitle")} />
			<p>{t("impressum.copyrightText")}</p>

			<p>
				{t("impressum.privacyLinkText")}{" "}
				<Link className="font-bold underline" to="/privacy">
					{t("nav.privacy")}
				</Link>
			</p>
		</LegalPageShell>
	);
};
