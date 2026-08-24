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
import { useInquiryStore } from "../../store/inquiryStore";

const MIN_LEAD_DAYS = 7;
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
			.min(5, { message: t("order.errors.servingsMin") })
			.max(200, { message: t("order.errors.servingsMax") }),
		date: z
			.string()
			.min(1, { message: t("order.errors.dateRequired") })
			.refine(
				(value) =>
					!dayjs(value).isBefore(
						dayjs().add(MIN_LEAD_DAYS, "day").startOf("day")
					),
				{ message: t("order.errors.dateTooSoon") }
			),
		deliveryType: z.enum(["pickup", "delivery"]),
		timeSlot: z
			.string()
			.min(1, { message: t("order.errors.timeSlotRequired") }),
		flavor: z.string().min(1, { message: t("order.errors.flavorRequired") }),
		dietary: z.array(z.string()),
		inscription: z.string().optional(),
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

const submitInquiry = async (
	data: FormValues,
	files: Array<File>
): Promise<void> => {
	const endpoint = import.meta.env.VITE_INQUIRY_ENDPOINT;

	if (!endpoint) {
		await new Promise<void>((resolve) => {
			setTimeout(resolve, 800);
		});
		console.info(
			"[inquiry] VITE_INQUIRY_ENDPOINT not set – simulated submission:",
			{ ...data, imageCount: files.length }
		);
		return;
	}

	const formData = new FormData();
	formData.append("occasion", data.occasion);
	if (data.customOccasion)
		formData.append("customOccasion", data.customOccasion);
	formData.append("servings", String(data.servings));
	formData.append("date", data.date);
	formData.append("deliveryType", data.deliveryType);
	formData.append("timeSlot", data.timeSlot);
	formData.append("flavor", data.flavor);
	for (const item of data.dietary) formData.append("dietary", item);
	if (data.inscription) formData.append("inscription", data.inscription);
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
			deliveryType: "pickup",
			timeSlot: "",
			flavor: "",
			dietary: [],
			inscription: "",
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
	const selectedDelivery = watch("deliveryType");

	const preselectedOccasion = useInquiryStore((state) => state.occasion);
	const preselectionVersion = useInquiryStore((state) => state.version);

	useEffect(() => {
		if (preselectedOccasion === null) return;
		setValue("occasion", preselectedOccasion);
	}, [preselectedOccasion, preselectionVersion, setValue]);

	const mutation = useMutation({
		mutationFn: async (values: FormValues): Promise<void> =>
			submitInquiry(
				values,
				uploadedFiles.map((entry) => entry.file)
			),
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
				"inscription",
				"designTheme",
			];
		} else if (step === 2) {
			fieldsToValidate = ["date", "deliveryType", "timeSlot"];
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
			<div className="flex flex-col items-center justify-center p-10 text-center border-3 border-nb-black shadow-[8px_8px_0px_0px_#0D0D0D] bg-nb-mint max-w-xl mx-auto animate-fade-in-up">
				<CheckCircleIcon className="h-16 w-16 text-nb-black mb-4 animate-bounce" />
				<h3 className="font-mono text-3xl text-nb-black font-bold uppercase mb-3">
					{t("order.success")}
				</h3>
				<p className="font-sans text-sm text-nb-black/75 mb-8 max-w-sm leading-relaxed">
					{t("order.successDesc")}
				</p>
				<button
					className="nb-btn bg-nb-black text-nb-yellow text-xs"
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
		"block font-mono text-[11px] font-bold uppercase tracking-wider text-nb-black mb-2";

	return (
		<div className="w-full max-w-3xl mx-auto border-3 border-nb-black shadow-[8px_8px_0px_0px_#0D0D0D] bg-nb-white p-8 sm:p-10">
			{/* Step Progress */}
			<div className="flex items-center justify-between mb-10 pb-6 border-b-3 border-nb-black">
				<div className="flex items-center gap-3">
					<span
						className={`w-9 h-9 border-2 border-nb-black flex items-center justify-center font-mono font-bold text-sm transition-all ${step >= 1 ? "bg-nb-yellow text-nb-black shadow-[2px_2px_0px_0px_#0D0D0D]" : "bg-nb-white text-nb-black/40"}`}
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
						className={`w-9 h-9 border-2 border-nb-black flex items-center justify-center font-mono font-bold text-sm transition-all ${step >= 2 ? "bg-nb-yellow text-nb-black shadow-[2px_2px_0px_0px_#0D0D0D]" : "bg-nb-white text-nb-black/40"}`}
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
						className={`w-9 h-9 border-2 border-nb-black flex items-center justify-center font-mono font-bold text-sm transition-all ${step >= 3 ? "bg-nb-yellow text-nb-black shadow-[2px_2px_0px_0px_#0D0D0D]" : "bg-nb-white text-nb-black/40"}`}
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
									min="5"
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
									<option value="medovyk">{t("flavors.medovyk.name")}</option>
									<option value="pistachio">
										{t("flavors.pistachio.name")}
									</option>
									<option value="caramel">{t("flavors.caramel.name")}</option>
									<option value="mango">{t("flavors.mango.name")}</option>
								</select>
								<FieldError
									id="inquiry-flavor-error"
									message={errors.flavor?.message}
								/>
							</div>

							<div>
								<label className={labelClass} htmlFor="inquiry-inscription">
									{t("order.inscription")}
								</label>
								<input
									id="inquiry-inscription"
									placeholder={t("order.inscriptionPlaceholder") || ""}
									type="text"
									{...register("inscription")}
									className={inputClass(false)}
								/>
							</div>
						</div>

						<fieldset>
							<legend className={`${labelClass} mb-2`}>
								{t("order.dietary")}
							</legend>
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 border-2 border-nb-black bg-nb-cream">
								{[
									{ value: "glutenFree", label: t("order.dietaryGlutenFree") },
									{
										value: "lactoseFree",
										label: t("order.dietaryLactoseFree"),
									},
									{ value: "vegan", label: t("order.dietaryVegan") },
									{ value: "nutFree", label: t("order.dietaryNutFree") },
								].map((item) => (
									<label
										key={item.value}
										className="flex items-center gap-2 font-mono text-xs font-bold text-nb-black cursor-pointer"
										htmlFor={`inquiry-dietary-${item.value}`}
									>
										<input
											id={`inquiry-dietary-${item.value}`}
											type="checkbox"
											value={item.value}
											{...register("dietary")}
											className="h-4 w-4 border-2 border-nb-black accent-nb-black"
										/>
										<span>{item.label}</span>
									</label>
								))}
							</div>
						</fieldset>

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
								<label className={labelClass} htmlFor="inquiry-date">
									{t("order.date")} *
								</label>
								<input
									id="inquiry-date"
									min={MIN_DATE_ISO}
									type="date"
									{...register("date")}
									aria-invalid={Boolean(errors.date)}
									className={inputClass(Boolean(errors.date))}
									aria-describedby={
										errors.date
											? "inquiry-date-error inquiry-date-hint"
											: "inquiry-date-hint"
									}
								/>
								<p
									className="font-mono text-[10px] text-nb-black/50 mt-1"
									id="inquiry-date-hint"
								>
									{t("order.date")} ≥ {MIN_DATE_ISO}
								</p>
								<FieldError
									id="inquiry-date-error"
									message={errors.date?.message}
								/>
							</div>

							<div>
								<label className={labelClass}>
									{t("order.deliveryType")} *
								</label>
								<div className="grid grid-cols-2 gap-3 h-12">
									<label
										className={`flex items-center justify-center border-2 border-nb-black font-mono text-xs font-bold cursor-pointer transition-colors ${selectedDelivery === "pickup" ? "bg-nb-yellow text-nb-black shadow-[2px_2px_0px_0px_#0D0D0D]" : "bg-nb-white text-nb-black/60 hover:bg-nb-yellow/40"}`}
									>
										<input
											type="radio"
											value="pickup"
											{...register("deliveryType")}
											className="sr-only"
										/>
										{t("order.pickup")}
									</label>
									<label
										className={`flex items-center justify-center border-2 border-nb-black font-mono text-xs font-bold cursor-pointer transition-colors ${selectedDelivery === "delivery" ? "bg-nb-yellow text-nb-black shadow-[2px_2px_0px_0px_#0D0D0D]" : "bg-nb-white text-nb-black/60 hover:bg-nb-yellow/40"}`}
									>
										<input
											type="radio"
											value="delivery"
											{...register("deliveryType")}
											className="sr-only"
										/>
										{t("order.delivery")}
									</label>
								</div>
							</div>
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

						{/* File Upload */}
						<div>
							<label className={labelClass} htmlFor="inquiry-files">
								{t("order.referenceImages")}
							</label>
							<div className="border-3 border-dashed border-nb-black p-6 bg-nb-cream flex flex-col items-center justify-center text-center cursor-pointer relative group hover:bg-nb-yellow/20 transition-colors">
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
											className="flex items-center justify-between p-3 border-2 border-nb-black bg-nb-mint text-xs font-mono"
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
								className="border-3 border-nb-black bg-nb-pink p-4 flex items-start gap-3"
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
