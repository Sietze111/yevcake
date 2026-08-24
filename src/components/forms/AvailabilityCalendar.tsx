import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { FunctionComponent } from "../../common/types";

interface AvailabilityCalendarProps {
	maxISO: string;
	minISO: string;
	value: string;
	onChange: (iso: string) => void;
}

const NAV_BUTTON_CLASS =
	"border-2 border-nb-black bg-nb-white p-1.5 cursor-pointer hover:bg-nb-yellow transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-nb-white";

export const AvailabilityCalendar = ({
	maxISO,
	minISO,
	value,
	onChange,
}: AvailabilityCalendarProps): FunctionComponent => {
	const { t, i18n } = useTranslation();
	const [viewMonth, setViewMonth] = useState(() =>
		(value !== "" ? dayjs(value) : dayjs(minISO)).startOf("month")
	);

	const minMonth = useMemo(() => dayjs(minISO).startOf("month"), [minISO]);
	const maxMonth = useMemo(() => dayjs(maxISO).startOf("month"), [maxISO]);

	const monthLabel = useMemo(
		() =>
			new Intl.DateTimeFormat(i18n.language, {
				month: "long",
				year: "numeric",
			}).format(viewMonth.toDate()),
		[i18n.language, viewMonth]
	);

	const weekdayLabels = useMemo(() => {
		const formatter = new Intl.DateTimeFormat(i18n.language, {
			weekday: "short",
		});
		return Array.from({ length: 7 }, (_, index) =>
			formatter.format(new Date(2024, 0, index + 1))
		);
	}, [i18n.language]);

	const leadingBlanks = (viewMonth.day() + 6) % 7;
	const daysInMonth = viewMonth.daysInMonth();

	return (
		<div
			aria-label={t("order.date")}
			className="border-3 border-nb-black bg-nb-white shadow-[4px_4px_0px_0px_#0D0D0D] p-4 w-full max-w-md"
			id="inquiry-date-calendar"
			role="group"
		>
			<div className="flex items-center justify-between mb-3">
				<button
					aria-label={t("calendar.prevMonth")}
					className={NAV_BUTTON_CLASS}
					data-testid="calendar-prev"
					disabled={!viewMonth.isAfter(minMonth)}
					type="button"
					onClick={() => {
						setViewMonth(viewMonth.subtract(1, "month"));
					}}
				>
					<ChevronLeftIcon aria-hidden="true" className="h-4 w-4" />
				</button>
				<span
					aria-live="polite"
					className="font-mono text-xs font-bold uppercase tracking-wider"
				>
					{monthLabel}
				</span>
				<button
					aria-label={t("calendar.nextMonth")}
					className={NAV_BUTTON_CLASS}
					data-testid="calendar-next"
					disabled={!viewMonth.isBefore(maxMonth)}
					type="button"
					onClick={() => {
						setViewMonth(viewMonth.add(1, "month"));
					}}
				>
					<ChevronRightIcon aria-hidden="true" className="h-4 w-4" />
				</button>
			</div>

			<div className="grid grid-cols-7 gap-1">
				{weekdayLabels.map((label, index) => (
					<span
						key={`${label}-${String(index)}`}
						aria-hidden="true"
						className="font-mono text-[9px] font-bold uppercase text-center py-1"
					>
						{label}
					</span>
				))}

				{Array.from({ length: leadingBlanks }, (_, index) => (
					<span key={`blank-${String(index)}`} />
				))}

				{Array.from({ length: daysInMonth }, (_, index) => {
					const dayNumber = index + 1;
					const date = viewMonth.date(dayNumber);
					const iso = date.format("YYYY-MM-DD");
					const isDisabled = iso < minISO || iso > maxISO || date.day() === 0;
					const isSelected = value === iso;

					return (
						<button
							key={iso}
							aria-disabled={isDisabled}
							aria-pressed={isSelected}
							data-testid={`day-${iso}`}
							disabled={isDisabled}
							type="button"
							aria-label={
								isDisabled
									? `${new Intl.DateTimeFormat(i18n.language, {
											day: "numeric",
											month: "long",
											year: "numeric",
										}).format(date.toDate())} – ${t("calendar.disabledDay")}`
									: new Intl.DateTimeFormat(i18n.language, {
											day: "numeric",
											month: "long",
											year: "numeric",
											weekday: "long",
										}).format(date.toDate())
							}
							className={`font-mono text-xs font-bold h-9 border-2 border-nb-black transition-colors ${
								isSelected
									? "bg-nb-black text-nb-yellow"
									: isDisabled
										? "line-through opacity-40 bg-nb-cream cursor-not-allowed"
										: "bg-nb-white hover:bg-nb-yellow cursor-pointer"
							}`}
							onClick={() => {
								onChange(iso);
							}}
						>
							{dayNumber}
						</button>
					);
				})}
			</div>

			<p className="font-mono text-[10px] text-nb-black/60 mt-3 leading-relaxed">
				{t("calendar.legend")}
			</p>
		</div>
	);
};
