import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import {
	CheckCircleIcon,
	ArrowRightIcon,
	ArrowLeftIcon,
	CloudArrowUpIcon,
	DocumentIcon,
	XMarkIcon,
	ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import type { FunctionComponent } from "../../common/types";
import { SERVINGS_MAX, SERVINGS_MIN } from "../../common/pricing";
import { INQUIRY_ENDPOINT, WEB3FORMS_ACCESS_KEY } from "../../common/constants";
import { useInquiryStore } from "../../store/inquiryStore";
import { CAKE_FLAVORS, TOPPER_OPTIONS } from "../ui/cakeConfiguratorData";
import { AvailabilityCalendar } from "./AvailabilityCalendar";

const MIN_LEAD_DAYS = 7;
const MAX_LEAD_MONTHS = 12;
const MAX_FILE_SIZE_MB = 10;
const MAX_FILES = 5;
const ACCEPTED_IMAGE_TYPES: Array<string> = [
	"image/jpeg",
	"image/png",
	"image/webp",
];

const MIN_DATE_ISO: string = dayjs()
	.add(MIN_LEAD_DAYS, "day")
	.format("YYYY-MM-DD");

const MAX_DATE_ISO: string = dayjs()
	.add(MAX_LEAD_MONTHS, "month")
	.format("YYYY-MM-DD");

interface UploadedFileInfo {
	file: File;
	sizeLabel: string;
}

const toUploadedFileInfo = (file: File): UploadedFileInfo => ({
	file,
	sizeLabel: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- inference needed for exact zod object type (resolver typing)
const createSchema = (t: TFunction) =>
	z.object({
		occasion: z
			.string()
			.min(1, { message: t("order.errors.occasionRequired") }),
		customOccasion: z.string().optional(),
		servings: z
			.number({ message: t("order.errors.servingsInvalid") })
			.min(SERVINGS_MIN, { message: t("order.errors.servingsMin") })
			.max(SERVINGS_MAX, { message: t("order.errors.servingsMax") }),
		date: z
			.string()
			.min(1, { message: t("order.errors.dateRequired") })
			.refine(
				(value) =>
					!dayjs(value).isBefore(
						dayjs().add(MIN_LEAD_DAYS, "day").startOf("day")
					),
				{ message: t("order.errors.dateTooSoon") }
			)
			.refine(
				(value) =>
					!dayjs(value).isAfter(
						dayjs().add(MAX_LEAD_MONTHS, "month").endOf("day")
					),
				{ message: t("order.errors.dateTooLate") }
			),
		timeSlot: z
			.string()
			.min(1, { message: t("order.errors.timeSlotRequired") }),
		flavor: z.string().min(1, { message: t("order.errors.flavorRequired") }),
		topper: z.string().optional(),
		designTheme: z
			.string()
			.min(5, { message: t("order.errors.designThemeMin") }),
		name: z.string().min(2, { message: t("order.errors.nameMin") }),
		email: z.string().email({ message: t("order.errors.emailInvalid") }),
		phone: z.string().min(5, { message: t("order.errors.phoneMin") }),
		additionalNotes: z.string().optional(),
	});

type FormValues = z.infer<ReturnType<typeof createSchema>>;

interface FieldErrorProps {
	id: string;
	message?: string;
}

const FieldError = ({ id, message }: FieldErrorProps): FunctionComponent => {
	if (!message) return null;
	return (
		<p
			className="text-red-600 text-xs mt-1 font-mono font-bold"
			id={id}
			role="alert"
		>
			{message}
		</p>
	);
};

interface InquiryPayload {
	[key: string]: string | undefined;
}

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const buildInquiryPayload = (
	data: FormValues,
	files: Array<UploadedFileInfo>
): InquiryPayload => {
	const occasionLabel =
		data.occasion === "other" && data.customOccasion
			? data.customOccasion
			: data.occasion;

	const referenceImages = files.map((entry) => entry.file.name).join(", ");

	/* eslint-disable camelcase -- snake_case keys required by the Web3Forms API */
	return {
		access_key: WEB3FORMS_ACCESS_KEY,
		subject: `New Cake Inquiry – ${occasionLabel} (${data.servings} servings)`,
		from_name: "Yevcake Website",
		name: data.name,
		email: data.email,
		replyto: data.email,
		phone: data.phone,
		occasion: occasionLabel,
		servings: String(data.servings),
		desired_date: data.date,
		time_slot: data.timeSlot,
		flavor: data.flavor,
		finishing_touch: data.topper || undefined,
		design_theme: data.designTheme,
		reference_images: referenceImages || undefined,
		additional_notes: data.additionalNotes,
		message:
			`New cake inquiry from ${data.name} for ${data.date}.` +
			(files.length > 0
				? ` Reference images (sent by email on request): ${referenceImages}`
				: ""),
	};
	/* eslint-enable camelcase */
};

const submitToWeb3Forms = async (
	data: FormValues,
	files: Array<UploadedFileInfo>
): Promise<void> => {
	const response = await fetch(WEB3FORMS_ENDPOINT, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(buildInquiryPayload(data, files)),
	});

	const result = (await response.json().catch(() => null)) as {
		success?: boolean;
		message?: string;
	} | null;

	if (!response.ok || !result?.success) {
		throw new Error(
			result?.message ?? `Submission failed with status ${response.status}`
		);
	}
};

const submitToCustomEndpoint = async (
	data: FormValues,
	files: Array<File>,
	endpoint: string
): Promise<void> => {
	const formData = new FormData();
	formData.append("occasion", data.occasion);
	if (data.customOccasion)
		formData.append("customOccasion", data.customOccasion);
	formData.append("servings", String(data.servings));
	formData.append("date", data.date);
	formData.append("timeSlot", data.timeSlot);
	formData.append("flavor", data.flavor);
	if (data.topper) formData.append("topper", data.topper);
	formData.append("designTheme", data.designTheme);
	formData.append("name", data.name);
	formData.append("email", data.email);
	formData.append("phone", data.phone);
	if (data.additionalNotes)
		formData.append("additionalNotes", data.additionalNotes);

	for (const file of files) {
		formData.append("images", file, file.name);
	}

	const response = await fetch(endpoint, {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error(`Submission failed with status ${response.status}`);
	}
};

const submitInquiry = async (
	data: FormValues,
	files: Array<UploadedFileInfo>
): Promise<void> => {
	if (WEB3FORMS_ACCESS_KEY) {
		await submitToWeb3Forms(data, files);
		return;
	}

	if (!INQUIRY_ENDPOINT) {
		await new Promise<void>((resolve) => {
			setTimeout(resolve, 800);
		});
		console.info("[inquiry] no submission backend configured – simulated:", {
			...data,
			imageNames: files.map((entry) => entry.file.name),
		});
		return;
	}

	await submitToCustomEndpoint(
		data,
		files.map((entry) => entry.file),
		INQUIRY_ENDPOINT
	);
};

export const CakeInquiryForm = (): FunctionComponent => {
	const { t } = useTranslation();
	const [step, setStep] = useState(1);
	const [isSuccess, setIsSuccess] = useState(false);
	const [uploadedFiles, setUploadedFiles] = useState<Array<UploadedFileInfo>>(
		[]
	);
	const [fileWarning, setFileWarning] = useState<string | null>(null);

	const schema = useMemo(() => createSchema(t), [t]);

	const defaultValues = useMemo<FormValues>(
		() => ({
			occasion: "",
			customOccasion: "",
			servings: 15,
			date: "",
			timeSlot: "",
			flavor: "",
			topper: "",
			designTheme: "",
			name: "",
			email: "",
			phone: "",
			additionalNotes: "",
		}),
		[]
	);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
		trigger,
		setValue,
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	// eslint-disable-next-line react-hooks/incompatible-library
	const selectedOccasion = watch("occasion");

	const watchedDate = watch("date");

	const preselectedOccasion = useInquiryStore((state) => state.occasion);
	const preselectedServings = useInquiryStore((state) => state.servings);
	const preselectedDesign = useInquiryStore((state) => state.design);
	const preselectedFlavor = useInquiryStore((state) => state.flavor);
	const preselectedTopper = useInquiryStore((state) => state.topper);
	const preselectionVersion = useInquiryStore((state) => state.version);

	useEffect(() => {
		if (preselectedOccasion === null) return;
		setValue("occasion", preselectedOccasion);
		if (preselectedServings !== null) {
			setValue("servings", preselectedServings);
		}
		if (preselectedDesign !== null) {
			setValue("designTheme", preselectedDesign);
		}
		if (preselectedFlavor !== null) {
			setValue("flavor", preselectedFlavor);
		}
		if (preselectedTopper !== null) {
			setValue("topper", preselectedTopper);
		}
	}, [
		preselectedOccasion,
		preselectedServings,
		preselectedDesign,
		preselectedFlavor,
		preselectedTopper,
		preselectionVersion,
		setValue,
	]);

	const mutation = useMutation({
		mutationFn: async (values: FormValues): Promise<void> =>
			submitInquiry(values, uploadedFiles),
		onSuccess: () => {
			setIsSuccess(true);
			setUploadedFiles([]);
			setFileWarning(null);
			reset(defaultValues);
			setStep(1);
		},
	});

	const handleFileUpload = (
		event_: React.ChangeEvent<HTMLInputElement>
	): void => {
		const selected = Array.from(event_.target.files ?? []);
		event_.target.value = "";

		if (selected.length === 0) return;

		const maxSizeBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
		const accepted = selected.filter(
			(file) =>
				ACCEPTED_IMAGE_TYPES.includes(file.type) && file.size <= maxSizeBytes
		);

		if (accepted.length < selected.length) {
			setFileWarning(t("order.filesRejected"));
		} else {
			setFileWarning(null);
		}

		setUploadedFiles((previous) => {
			const combined = [...previous, ...accepted.map(toUploadedFileInfo)];
			return combined.slice(0, MAX_FILES);
		});
	};

	const removeFile = (indexToRemove: number): void => {
		setUploadedFiles((previous) =>
			previous.filter((_, index) => index !== indexToRemove)
		);
	};

	// type="number" allows scientific notation ("1e5"), so block those keys
	const handleServingsKeyDown = (
		event_: React.KeyboardEvent<HTMLInputElement>
	): void => {
		if (["e", "E", "+", "-", "."].includes(event_.key)) {
			event_.preventDefault();
		}
	};

	const onSubmit = (data: FormValues): void => {
		mutation.mutate(data);
	};

	const nextStep = async (): Promise<void> => {
		let fieldsToValidate: Array<keyof FormValues> = [];
		if (step === 1) {
			fieldsToValidate = [
				"occasion",
				"customOccasion",
				"servings",
				"flavor",
				"designTheme",
			];
		} else if (step === 2) {
			fieldsToValidate = ["date", "timeSlot"];
		}
		const isValid = await trigger(fieldsToValidate);
		if (isValid) {
			setStep(step + 1);
		}
	};

	const previousStep = (): void => {
		setStep(step - 1);
	};

	if (isSuccess) {
		return (
			<div className="flex flex-col items-center justify-center p-10 text-center rounded-3xl border border-nb-line shadow-[0_18px_36px_rgba(61,43,31,0.18)] bg-nb-mint max-w-xl mx-auto animate-fade-in-up">
				<CheckCircleIcon className="h-16 w-16 text-nb-pink mb-4 animate-bounce" />
				<h3 className="font-mono text-3xl text-nb-black font-semibold mb-3">
					{t("order.success")}
				</h3>
				<p className="font-sans font-light text-sm text-nb-black/75 mb-8 max-w-sm leading-relaxed">
					{t("order.successDesc")}
				</p>
				<button
					className="nb-btn bg-nb-pink text-nb-cream text-xs"
					onClick={() => {
						setIsSuccess(false);
					}}
				>
					{t("common.sendAnotherRequest")}
				</button>
			</div>
		);
	}

	const inputClass = (hasError: boolean): string =>
		hasError ? "nb-input border-red-600" : "nb-input";

	const labelClass =
		"block font-sans text-[11px] font-medium uppercase tracking-wider text-nb-black mb-2";

	return (
		<div className="w-full max-w-3xl mx-auto rounded-3xl border border-nb-line shadow-[0_18px_36px_rgba(61,43,31,0.18)] bg-nb-white p-8 sm:p-10">
			{/* Step Progress */}
			<div className="flex items-center justify-between mb-10 pb-6 border-b border-nb-line">
				<div className="flex items-center gap-3">
					<span
						className={`w-9 h-9 border border-nb-line flex items-center justify-center font-mono font-bold text-sm transition-all ${step >= 1 ? "bg-nb-yellow text-nb-black shadow-[0_4px_12px_rgba(61,43,31,0.12)]" : "bg-nb-white text-nb-black/40"}`}
					>
						1
					</span>
					<span className="font-mono font-bold text-xs tracking-wider uppercase text-nb-black hidden sm:inline">
						{t("order.step1")}
					</span>
				</div>
				<div
					className={`flex-grow h-1 mx-4 transition-colors ${step >= 2 ? "bg-nb-black" : "bg-nb-black/15"}`}
				/>
				<div className="flex items-center gap-3">
					<span
						className={`w-9 h-9 border border-nb-line flex items-center justify-center font-mono font-bold text-sm transition-all ${step >= 2 ? "bg-nb-yellow text-nb-black shadow-[0_4px_12px_rgba(61,43,31,0.12)]" : "bg-nb-white text-nb-black/40"}`}
					>
						2
					</span>
					<span className="font-mono font-bold text-xs tracking-wider uppercase text-nb-black hidden sm:inline">
						{t("order.step2")}
					</span>
				</div>
				<div
					className={`flex-grow h-1 mx-4 transition-colors ${step >= 3 ? "bg-nb-black" : "bg-nb-black/15"}`}
				/>
				<div className="flex items-center gap-3">
					<span
						className={`w-9 h-9 border border-nb-line flex items-center justify-center font-mono font-bold text-sm transition-all ${step >= 3 ? "bg-nb-yellow text-nb-black shadow-[0_4px_12px_rgba(61,43,31,0.12)]" : "bg-nb-white text-nb-black/40"}`}
					>
						3
					</span>
					<span className="font-mono font-bold text-xs tracking-wider uppercase text-nb-black hidden sm:inline">
						{t("order.step3")}
					</span>
				</div>
			</div>

			<form noValidate className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
				{/* Step 1: Occasion & Design */}
				{step === 1 && (
					<div className="space-y-6 animate-fade-in text-left">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div>
								<label className={labelClass} htmlFor="inquiry-occasion">
									{t("order.occasion")} *
								</label>
								<select
									id="inquiry-occasion"
									{...register("occasion")}
									aria-invalid={Boolean(errors.occasion)}
									className={inputClass(Boolean(errors.occasion))}
									aria-describedby={
										errors.occasion ? "inquiry-occasion-error" : undefined
									}
								>
									<option disabled value="">
										{t("order.occasionPlaceholder")}
									</option>
									<option value="wedding">{t("order.occasionWedding")}</option>
									<option value="birthday">
										{t("order.occasionBirthday")}
									</option>
									<option value="bento">{t("order.occasionBento")}</option>
									<option value="other">{t("order.occasionOther")}</option>
								</select>
								<FieldError
									id="inquiry-occasion-error"
									message={errors.occasion?.message}
								/>
							</div>

							<div>
								<label className={labelClass} htmlFor="inquiry-servings">
									{t("order.servings")} *
								</label>
								<input
									id="inquiry-servings"
									max={SERVINGS_MAX}
									min={SERVINGS_MIN}
									step="1"
									type="number"
									{...register("servings", { valueAsNumber: true })}
									aria-invalid={Boolean(errors.servings)}
									className={inputClass(Boolean(errors.servings))}
									aria-describedby={
										errors.servings ? "inquiry-servings-error" : undefined
									}
									onKeyDown={handleServingsKeyDown}
								/>
								<FieldError
									id="inquiry-servings-error"
									message={errors.servings?.message}
								/>
							</div>
						</div>

						{selectedOccasion === "other" && (
							<div className="animate-fade-in">
								<label className={labelClass} htmlFor="inquiry-custom-occasion">
									Describe the Occasion *
								</label>
								<input
									id="inquiry-custom-occasion"
									placeholder={t("order.customOccasionPlaceholder")}
									type="text"
									{...register("customOccasion")}
									className={inputClass(Boolean(errors.customOccasion))}
								/>
							</div>
						)}

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div>
								<label className={labelClass} htmlFor="inquiry-flavor">
									{t("order.flavor")} *
								</label>
								<select
									id="inquiry-flavor"
									{...register("flavor")}
									aria-invalid={Boolean(errors.flavor)}
									className={inputClass(Boolean(errors.flavor))}
									aria-describedby={
										errors.flavor ? "inquiry-flavor-error" : undefined
									}
								>
									<option disabled value="">
										{t("order.flavorPlaceholder")}
									</option>
									{CAKE_FLAVORS.map((id) => (
										<option key={id} value={id}>
											{t(`flavors.${id}.name`)}
										</option>
									))}
								</select>
								<FieldError
									id="inquiry-flavor-error"
									message={errors.flavor?.message}
								/>
							</div>

							<div>
								<label className={labelClass} htmlFor="inquiry-topper">
									{t("order.finishingTouch")}
								</label>
								<select
									id="inquiry-topper"
									{...register("topper")}
									className={inputClass(false)}
								>
									<option value="">{t("order.noPreference")}</option>
									{TOPPER_OPTIONS.map((id) => (
										<option key={id} value={id}>
											{t(`configurator.toppers.${id}`)}
										</option>
									))}
								</select>
							</div>
						</div>

						<div>
							<label className={labelClass} htmlFor="inquiry-design-theme">
								{t("order.designTheme")} *
							</label>
							<textarea
								id="inquiry-design-theme"
								placeholder={t("order.designThemePlaceholder") || ""}
								rows={3}
								{...register("designTheme")}
								aria-invalid={Boolean(errors.designTheme)}
								className={`${inputClass(Boolean(errors.designTheme))} resize-none`}
								aria-describedby={
									errors.designTheme ? "inquiry-design-theme-error" : undefined
								}
							/>
							<FieldError
								id="inquiry-design-theme-error"
								message={errors.designTheme?.message}
							/>
						</div>

						<div className="pt-4 flex justify-end">
							<button
								className="nb-btn bg-nb-yellow text-nb-black text-xs flex items-center gap-2"
								type="button"
								onClick={() => {
									void nextStep();
								}}
							>
								{t("common.continue")}
								<ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
							</button>
						</div>
					</div>
				)}

				{/* Step 2: Date & Logistics */}
				{step === 2 && (
					<div className="space-y-6 animate-fade-in text-left">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div>
								<span className={labelClass} id="inquiry-date-label">
									{`${t("order.date")} *`}
								</span>
								<input
									aria-hidden="true"
									id="inquiry-date"
									tabIndex={-1}
									type="hidden"
									{...register("date")}
								/>
								<div className="mt-2">
									<AvailabilityCalendar
										maxISO={MAX_DATE_ISO}
										minISO={MIN_DATE_ISO}
										value={watchedDate ?? ""}
										onChange={(iso: string) => {
											setValue("date", iso, { shouldValidate: true });
										}}
									/>
								</div>
								<FieldError
									id="inquiry-date-error"
									message={errors.date?.message}
								/>
							</div>

							<div>
								<label className={labelClass} htmlFor="inquiry-timeslot">
									{t("order.timeSlot")} *
								</label>
								<select
									id="inquiry-timeslot"
									{...register("timeSlot")}
									aria-invalid={Boolean(errors.timeSlot)}
									className={inputClass(Boolean(errors.timeSlot))}
									aria-describedby={
										errors.timeSlot ? "inquiry-timeslot-error" : undefined
									}
								>
									<option disabled value="">
										{t("order.timeSlotPlaceholder")}
									</option>
									<option value="morning_09_11">09:00 - 11:00</option>
									<option value="noon_11_13">11:00 - 13:00</option>
									<option value="afternoon_13_15">13:00 - 15:00</option>
									<option value="evening_15_18">15:00 - 18:00</option>
								</select>
								<FieldError
									id="inquiry-timeslot-error"
									message={errors.timeSlot?.message}
								/>
							</div>
						</div>

						{/* File Upload */}
						<div>
							<label className={labelClass} htmlFor="inquiry-files">
								{t("order.referenceImages")}
							</label>
							<div className="rounded-2xl border-2 border-dashed border-nb-line p-6 bg-nb-cream flex flex-col items-center justify-center text-center cursor-pointer relative group hover:bg-nb-yellow/20 transition-colors">
								<input
									multiple
									accept="image/jpeg,image/png,image/webp"
									aria-label={t("order.referenceImages")}
									className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
									type="file"
									onChange={handleFileUpload}
								/>
								<CloudArrowUpIcon
									aria-hidden="true"
									className="h-10 w-10 text-nb-black/40 group-hover:text-nb-black transition-colors mb-2"
								/>
								<span className="font-mono text-xs font-bold text-nb-black uppercase">
									{t("order.referenceImagesDesc")}
								</span>
								<span className="font-mono text-[10px] text-nb-black/50 mt-1">
									{t("order.uploadFormats")}
								</span>
							</div>

							{fileWarning && (
								<p
									className="text-red-600 text-xs mt-2 font-mono font-bold"
									role="alert"
								>
									{fileWarning}
								</p>
							)}

							{uploadedFiles.length > 0 && (
								<ul className="mt-4 space-y-2">
									{uploadedFiles.map((entry, index) => (
										<li
											key={entry.file.name + index}
											className="flex items-center justify-between p-3 border border-nb-line bg-nb-mint text-xs font-mono"
										>
											<div className="flex items-center gap-2">
												<DocumentIcon
													aria-hidden="true"
													className="h-4 w-4 text-nb-black"
												/>
												<span className="font-bold text-nb-black truncate max-w-xs">
													{entry.file.name}
												</span>
												<span className="text-nb-black/60">
													({entry.sizeLabel})
												</span>
											</div>
											<button
												aria-label={`${t("lightbox.close")}: ${entry.file.name}`}
												className="text-nb-black/60 hover:text-red-600 transition-colors p-1"
												type="button"
												onClick={() => {
													removeFile(index);
												}}
											>
												<XMarkIcon aria-hidden="true" className="h-4 w-4" />
											</button>
										</li>
									))}
								</ul>
							)}
						</div>

						<div className="pt-4 flex justify-between">
							<button
								className="nb-btn bg-nb-white text-nb-black text-xs flex items-center gap-2"
								type="button"
								onClick={previousStep}
							>
								<ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
								{t("common.back")}
							</button>
							<button
								className="nb-btn bg-nb-yellow text-nb-black text-xs flex items-center gap-2"
								type="button"
								onClick={() => {
									void nextStep();
								}}
							>
								{t("common.continue")}
								<ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
							</button>
						</div>
					</div>
				)}

				{/* Step 3: Contact */}
				{step === 3 && (
					<div className="space-y-6 animate-fade-in text-left">
						<div>
							<label className={labelClass} htmlFor="inquiry-name">
								{t("order.name")} *
							</label>
							<input
								id="inquiry-name"
								placeholder="Sophie Müller"
								type="text"
								{...register("name")}
								aria-invalid={Boolean(errors.name)}
								className={inputClass(Boolean(errors.name))}
								aria-describedby={
									errors.name ? "inquiry-name-error" : undefined
								}
							/>
							<FieldError
								id="inquiry-name-error"
								message={errors.name?.message}
							/>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div>
								<label className={labelClass} htmlFor="inquiry-email">
									{t("order.email")} *
								</label>
								<input
									id="inquiry-email"
									placeholder="sophie@example.ch"
									type="email"
									{...register("email")}
									aria-invalid={Boolean(errors.email)}
									className={inputClass(Boolean(errors.email))}
									aria-describedby={
										errors.email ? "inquiry-email-error" : undefined
									}
								/>
								<FieldError
									id="inquiry-email-error"
									message={errors.email?.message}
								/>
							</div>

							<div>
								<label className={labelClass} htmlFor="inquiry-phone">
									{t("order.phone")} *
								</label>
								<input
									id="inquiry-phone"
									placeholder="+41 79 123 45 67"
									type="tel"
									{...register("phone")}
									aria-invalid={Boolean(errors.phone)}
									className={inputClass(Boolean(errors.phone))}
									aria-describedby={
										errors.phone ? "inquiry-phone-error" : undefined
									}
								/>
								<FieldError
									id="inquiry-phone-error"
									message={errors.phone?.message}
								/>
							</div>
						</div>

						<div>
							<label className={labelClass} htmlFor="inquiry-notes">
								{t("order.additionalNotes")}
							</label>
							<textarea
								id="inquiry-notes"
								placeholder={t("order.additionalNotesPlaceholder") || ""}
								rows={4}
								{...register("additionalNotes")}
								className={inputClass(false)}
							/>
						</div>

						{mutation.isError && (
							<div
								className="rounded-xl border border-nb-line bg-nb-pink/10 p-4 flex items-start gap-3"
								role="alert"
							>
								<ExclamationTriangleIcon
									aria-hidden="true"
									className="h-5 w-5 text-nb-black shrink-0 mt-0.5"
								/>
								<p className="font-mono text-xs font-bold text-nb-black leading-relaxed">
									{t("order.submitError")}
								</p>
							</div>
						)}

						<div className="pt-4 flex justify-between">
							<button
								className="nb-btn bg-nb-white text-nb-black text-xs flex items-center gap-2"
								disabled={mutation.isPending}
								type="button"
								onClick={previousStep}
							>
								<ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
								{t("common.back")}
							</button>
							<button
								className="nb-btn bg-nb-black text-nb-yellow text-xs"
								disabled={mutation.isPending}
								type="submit"
							>
								{mutation.isPending ? t("order.submitting") : t("order.submit")}
							</button>
						</div>
					</div>
				)}
			</form>
		</div>
	);
};
