import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const schema = z.object({
	name: z.string().min(2, { message: "Name must be at least 2 characters" }),
	email: z.string().email({ message: "Invalid email address" }),
	phone: z.string().min(5, { message: "Phone number is too short" }),
	date: z.string().min(1, { message: "Please select a date" }),
	servings: z
		.number()
		.min(5, { message: "Minimum servings is 5" })
		.max(200, { message: "For over 200 servings, contact us directly" }),
	flavor: z.string().min(1, { message: "Please select a flavor" }),
	details: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

import type { FunctionComponent } from "../../common/types";

export const CakeInquiryForm = (): FunctionComponent => {
	const { t } = useTranslation();
	const [isSuccess, setIsSuccess] = useState(false);
	const [step, setStep] = useState(1);

	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			servings: 15,
			flavor: "",
		},
	});

	const onSubmit = (data: FormData): void => {
		console.log("Cake Inquiry Submitted:", data);
		setIsSuccess(true);
	};

	const nextStep = async (): Promise<void> => {
		const fieldsToValidate: Array<keyof FormData> =
			step === 1 ? ["name", "email", "phone"] : ["date", "servings", "flavor"];
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
			<div className="flex flex-col items-center justify-center p-8 text-center glass-panel rounded-2xl border border-brand-gold/30 shadow-xl max-w-xl mx-auto animate-fade-in-up">
				<CheckCircleIcon className="h-16 w-16 text-brand-gold mb-4 animate-bounce" />
				<h3 className="font-serif text-2xl text-brand-dark font-semibold mb-2">
					{t("order.success")}
				</h3>
				<p className="font-sans text-sm text-brand-dark/70 mb-6">
					We will get back to you with custom sketches and a quote for your
					dream cake.
				</p>
				<button
					className="px-6 py-2.5 rounded-full bg-brand-dark text-brand-cream hover:bg-brand-gold transition-colors duration-300 font-sans text-sm font-semibold tracking-wider uppercase"
					onClick={() => {
						setIsSuccess(false);
						setStep(1);
					}}
				>
					Send Another Request
				</button>
			</div>
		);
	}

	return (
		<div className="w-full max-w-2xl mx-auto glass-panel rounded-3xl border border-brand-gold/20 shadow-2xl p-6 sm:p-10 transition-all duration-300">
			{/* Step Indicators */}
			<div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-gold/10">
				<div className="flex items-center">
					<span
						className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
							step === 1
								? "bg-brand-gold text-brand-dark"
								: "bg-brand-cream text-brand-accent ring-1 ring-brand-gold/25"
						}`}
					>
						1
					</span>
					<span className="ml-2.5 font-sans font-semibold text-xs tracking-wider uppercase text-brand-dark/80">
						{t("order.step1")}
					</span>
				</div>
				<div className="w-12 h-px bg-brand-gold/20 flex-grow mx-4"></div>
				<div className="flex items-center">
					<span
						className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
							step === 2
								? "bg-brand-gold text-brand-dark"
								: "bg-brand-cream text-brand-accent/50 ring-1 ring-brand-gold/10"
						}`}
					>
						2
					</span>
					<span className="ml-2.5 font-sans font-semibold text-xs tracking-wider uppercase text-brand-dark/80">
						{t("order.step2")}
					</span>
				</div>
			</div>

			<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
				{step === 1 && (
					<div className="space-y-5 animate-fade-in">
						<div>
							<label className="block text-xs font-semibold uppercase tracking-wider text-brand-dark/80 mb-2">
								{t("order.name")} *
							</label>
							<input
								type="text"
								{...register("name")}
								className="w-full px-4 py-3 rounded-xl bg-white/70 border border-brand-gold/20 focus:ring-1 focus:ring-brand-gold focus:border-brand-gold focus:outline-none font-sans text-sm"
							/>
							{errors.name && (
								<p className="text-red-500 text-xs mt-1 font-semibold">
									{errors.name.message}
								</p>
							)}
						</div>

						<div>
							<label className="block text-xs font-semibold uppercase tracking-wider text-brand-dark/80 mb-2">
								{t("order.email")} *
							</label>
							<input
								type="email"
								{...register("email")}
								className="w-full px-4 py-3 rounded-xl bg-white/70 border border-brand-gold/20 focus:ring-1 focus:ring-brand-gold focus:border-brand-gold focus:outline-none font-sans text-sm"
							/>
							{errors.email && (
								<p className="text-red-500 text-xs mt-1 font-semibold">
									{errors.email.message}
								</p>
							)}
						</div>

						<div>
							<label className="block text-xs font-semibold uppercase tracking-wider text-brand-dark/80 mb-2">
								{t("order.phone")} *
							</label>
							<input
								type="tel"
								{...register("phone")}
								className="w-full px-4 py-3 rounded-xl bg-white/70 border border-brand-gold/20 focus:ring-1 focus:ring-brand-gold focus:border-brand-gold focus:outline-none font-sans text-sm"
							/>
							{errors.phone && (
								<p className="text-red-500 text-xs mt-1 font-semibold">
									{errors.phone.message}
								</p>
							)}
						</div>

						<div className="pt-4 flex justify-end">
							<button
								className="px-8 py-3 rounded-full bg-brand-gold text-brand-dark hover:bg-brand-bronze hover:text-white transition-colors duration-300 font-sans text-xs font-bold tracking-widest uppercase cursor-pointer"
								type="button"
								onClick={nextStep}
							>
								Continue
							</button>
						</div>
					</div>
				)}

				{step === 2 && (
					<div className="space-y-5 animate-fade-in">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<label className="block text-xs font-semibold uppercase tracking-wider text-brand-dark/80 mb-2">
									{t("order.date")} *
								</label>
								<input
									type="date"
									{...register("date")}
									className="w-full px-4 py-3 rounded-xl bg-white/70 border border-brand-gold/20 focus:ring-1 focus:ring-brand-gold focus:border-brand-gold focus:outline-none font-sans text-sm"
								/>
								{errors.date && (
									<p className="text-red-500 text-xs mt-1 font-semibold">
										{errors.date.message}
									</p>
								)}
							</div>

							<div>
								<label className="block text-xs font-semibold uppercase tracking-wider text-brand-dark/80 mb-2">
									{t("order.servings")} *
								</label>
								<input
									type="number"
									{...register("servings", { valueAsNumber: true })}
									className="w-full px-4 py-3 rounded-xl bg-white/70 border border-brand-gold/20 focus:ring-1 focus:ring-brand-gold focus:border-brand-gold focus:outline-none font-sans text-sm"
								/>
								{errors.servings && (
									<p className="text-red-500 text-xs mt-1 font-semibold">
										{errors.servings.message}
									</p>
								)}
							</div>
						</div>

						<div>
							<label className="block text-xs font-semibold uppercase tracking-wider text-brand-dark/80 mb-2">
								{t("order.flavor")} *
							</label>
							<select
								{...register("flavor")}
								className="w-full px-4 py-3 rounded-xl bg-white/70 border border-brand-gold/20 focus:ring-1 focus:ring-brand-gold focus:border-brand-gold focus:outline-none font-sans text-sm text-brand-dark"
							>
								<option disabled value="">
									{t("order.flavorPlaceholder")}
								</option>
								<option value="medovyk">{t("flavors.medovyk.name")}</option>
								<option value="pistachio">{t("flavors.pistachio.name")}</option>
								<option value="caramel">{t("flavors.caramel.name")}</option>
								<option value="mango">{t("flavors.mango.name")}</option>
							</select>
							{errors.flavor && (
								<p className="text-red-500 text-xs mt-1 font-semibold">
									{errors.flavor.message}
								</p>
							)}
						</div>

						<div>
							<label className="block text-xs font-semibold uppercase tracking-wider text-brand-dark/80 mb-2">
								{t("order.details")}
							</label>
							<textarea
								rows={4}
								{...register("details")}
								className="w-full px-4 py-3 rounded-xl bg-white/70 border border-brand-gold/20 focus:ring-1 focus:ring-brand-gold focus:border-brand-gold focus:outline-none font-sans text-sm resize-none"
								placeholder={t("order.detailsPlaceholder") || ""}
							/>
						</div>

						<div className="pt-4 flex justify-between">
							<button
								className="px-6 py-3 rounded-full border border-brand-gold/30 text-brand-accent hover:bg-brand-champagne/30 transition-colors duration-300 font-sans text-xs font-bold tracking-widest uppercase cursor-pointer"
								type="button"
								onClick={previousStep}
							>
								Back
							</button>
							<button
								className="px-8 py-3 rounded-full bg-brand-dark text-brand-cream hover:bg-brand-gold transition-colors duration-300 font-sans text-xs font-bold tracking-widest uppercase cursor-pointer"
								type="submit"
							>
								{t("order.submit")}
							</button>
						</div>
					</div>
				)}
			</form>
		</div>
	);
};
