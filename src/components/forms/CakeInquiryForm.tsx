import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { CheckCircleIcon, ArrowRightIcon, ArrowLeftIcon, CloudArrowUpIcon, DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { FunctionComponent } from "../../common/types";

const schema = z.object({
  occasion: z.string().min(1, { message: "Please select an occasion" }),
  customOccasion: z.string().optional(),
  servings: z.number().min(5, { message: "Minimum servings is 5" }).max(200, { message: "For events larger than 200 eaters, please email us directly!" }),
  date: z.string().min(1, { message: "Please select a date" }),
  deliveryType: z.enum(["pickup", "delivery"]),
  timeSlot: z.string().min(1, { message: "Please select a time slot" }),
  flavor: z.string().min(1, { message: "Please select a flavor" }),
  dietary: z.array(z.string()),
  inscription: z.string().optional(),
  designTheme: z.string().min(5, { message: "Please describe your vision in at least 5 characters" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const CakeInquiryForm = (): FunctionComponent => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string }>>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      servings: 15,
      deliveryType: "pickup",
      timeSlot: "",
      flavor: "",
      dietary: [],
      occasion: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedOccasion = watch("occasion");
  const selectedDelivery = watch("deliveryType");

  const handleFileUpload = (event_: React.ChangeEvent<HTMLInputElement>): void => {
    if (event_.target.files) {
      const filesArray = Array.from(event_.target.files).map((file) => ({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      }));
      setUploadedFiles((previous) => [...previous, ...filesArray]);
    }
  };

  const removeFile = (indexToRemove: number): void => {
    setUploadedFiles((previous) => previous.filter((_, index) => index !== indexToRemove));
  };

  const onSubmit = (data: FormData): void => {
    console.log("Cake Inquiry Submitted:", { ...data, images: uploadedFiles });
    setIsSuccess(true);
  };

  const nextStep = async (): Promise<void> => {
    let fieldsToValidate: Array<keyof FormData> = [];
    if (step === 1) {
      fieldsToValidate = ["occasion", "customOccasion", "servings", "flavor", "dietary", "inscription", "designTheme"];
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
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center boutique-card rounded-[2rem] border border-brand-gold/30 shadow-xl max-w-xl mx-auto animate-fade-in-up">
        <CheckCircleIcon className="h-16 w-16 text-brand-terracotta mb-4 animate-bounce" />
        <h3 className="font-serif text-3xl text-brand-dark font-bold mb-3">
          {t("order.success")}
        </h3>
        <p className="font-sans text-sm text-brand-dark/75 mb-8 max-w-sm leading-relaxed">
          {t("order.successDesc")}
        </p>
        <button
          className="px-8 py-3.5 rounded-full bg-brand-terracotta text-white hover:bg-brand-dark transition-colors duration-300 font-sans text-xs font-bold tracking-widest uppercase cursor-pointer"
          onClick={() => {
            setIsSuccess(false);
            setUploadedFiles([]);
            setStep(1);
          }}
        >
          Send Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto boutique-card rounded-[2rem] border border-brand-gold/20 shadow-xl p-6 sm:p-10 transition-all duration-300 bg-white/80 backdrop-blur-md">
      {/* Wizard Progress Steps */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-brand-gold/10">
        <div className="flex items-center">
          <span
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
              step >= 1 ? "bg-brand-terracotta text-white" : "bg-brand-apricot text-brand-terracotta/40"
            }`}
          >
            1
          </span>
          <span className="ml-3 font-sans font-semibold text-xs tracking-wider uppercase text-brand-dark/80 hidden sm:inline">
            {t("order.step1")}
          </span>
        </div>
        <div className={`w-8 sm:w-16 h-px flex-grow mx-4 transition-colors duration-300 ${step >= 2 ? "bg-brand-terracotta" : "bg-brand-gold/20"}`}></div>
        <div className="flex items-center">
          <span
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
              step >= 2 ? "bg-brand-terracotta text-white" : "bg-brand-apricot text-brand-terracotta/40"
            }`}
          >
            2
          </span>
          <span className="ml-3 font-sans font-semibold text-xs tracking-wider uppercase text-brand-dark/80 hidden sm:inline">
            {t("order.step2")}
          </span>
        </div>
        <div className={`w-8 sm:w-16 h-px flex-grow mx-4 transition-colors duration-300 ${step >= 3 ? "bg-brand-terracotta" : "bg-brand-gold/20"}`}></div>
        <div className="flex items-center">
          <span
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
              step >= 3 ? "bg-brand-terracotta text-white" : "bg-brand-apricot text-brand-terracotta/40"
            }`}
          >
            3
          </span>
          <span className="ml-3 font-sans font-semibold text-xs tracking-wider uppercase text-brand-dark/80 hidden sm:inline">
            {t("order.step3")}
          </span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Occasion & Design */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark/85 mb-2">
                  {t("order.occasion")} *
                </label>
                <select
                  {...register("occasion")}
                  className="w-full input-boutique focus:outline-none"
                >
                  <option disabled value="">{t("order.occasionPlaceholder")}</option>
                  <option value="wedding">{t("order.occasionWedding")}</option>
                  <option value="birthday">{t("order.occasionBirthday")}</option>
                  <option value="bento">{t("order.occasionBento")}</option>
                  <option value="other">{t("order.occasionOther")}</option>
                </select>
                {errors.occasion && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.occasion.message}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark/85 mb-2">
                  {t("order.servings")} *
                </label>
                <input
                  type="number"
                  {...register("servings", { valueAsNumber: true })}
                  className="w-full input-boutique focus:outline-none"
                  min="5"
                />
                {errors.servings && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.servings.message}</p>}
              </div>
            </div>

            {selectedOccasion === "other" && (
              <div className="animate-fade-in">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark/85 mb-2">
                  Describe the Occasion *
                </label>
                <input
                  type="text"
                  {...register("customOccasion")}
                  className="w-full input-boutique focus:outline-none"
                  placeholder="e.g. Baby Shower, Bridal Shower, Anniversary..."
                />
                {errors.customOccasion && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.customOccasion.message}</p>}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark/85 mb-2">
                  {t("order.flavor")} *
                </label>
                <select
                  {...register("flavor")}
                  className="w-full input-boutique focus:outline-none text-brand-dark"
                >
                  <option disabled value="">{t("order.flavorPlaceholder")}</option>
                  <option value="medovyk">{t("flavors.medovyk.name")}</option>
                  <option value="pistachio">{t("flavors.pistachio.name")}</option>
                  <option value="caramel">{t("flavors.caramel.name")}</option>
                  <option value="mango">{t("flavors.mango.name")}</option>
                </select>
                {errors.flavor && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.flavor.message}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark/85 mb-2">
                  {t("order.inscription")}
                </label>
                <input
                  type="text"
                  {...register("inscription")}
                  className="w-full input-boutique focus:outline-none"
                  placeholder={t("order.inscriptionPlaceholder") || ""}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark/85 mb-2">
                {t("order.dietary")}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-brand-apricot/30 p-4 rounded-xl border border-brand-gold/10">
                {[
                  { value: "glutenFree", label: t("order.dietaryGlutenFree") },
                  { value: "lactoseFree", label: t("order.dietaryLactoseFree") },
                  { value: "vegan", label: t("order.dietaryVegan") },
                  { value: "nutFree", label: t("order.dietaryNutFree") },
                ].map((item) => (
                  <label key={item.value} className="flex items-center gap-2 font-sans text-xs font-semibold text-brand-dark hover:cursor-pointer">
                    <input
                      type="checkbox"
                      value={item.value}
                      {...register("dietary")}
                      className="rounded text-brand-terracotta focus:ring-brand-terracotta h-4 w-4"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark/85 mb-2">
                {t("order.designTheme")} *
              </label>
              <textarea
                rows={3}
                {...register("designTheme")}
                className="w-full input-boutique focus:outline-none resize-none"
                placeholder={t("order.designThemePlaceholder") || ""}
              />
              {errors.designTheme && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.designTheme.message}</p>}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                className="px-8 py-3.5 rounded-full bg-brand-terracotta text-white hover:bg-brand-dark transition-colors duration-300 font-sans text-xs font-bold tracking-widest uppercase flex items-center gap-2 cursor-pointer shadow-sm"
                type="button"
                onClick={nextStep}
              >
                Continue
                <ArrowRightIcon className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Logistics */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark/85 mb-2">
                  {t("order.date")} *
                </label>
                <input
                  type="date"
                  {...register("date")}
                  className="w-full input-boutique focus:outline-none"
                />
                {errors.date && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.date.message}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark/85 mb-2">
                  {t("order.deliveryType")} *
                </label>
                <div className="grid grid-cols-2 gap-4 h-11">
                  <label className={`flex items-center justify-center border rounded-xl font-sans text-xs font-semibold cursor-pointer transition-all ${
                    selectedDelivery === "pickup"
                      ? "border-brand-terracotta bg-brand-blush/25 text-brand-terracotta font-bold"
                      : "border-brand-gold/20 text-brand-dark/70 hover:bg-brand-apricot/20"
                  }`}>
                    <input
                      type="radio"
                      value="pickup"
                      {...register("deliveryType")}
                      className="sr-only"
                    />
                    {t("order.pickup")}
                  </label>
                  <label className={`flex items-center justify-center border rounded-xl font-sans text-xs font-semibold cursor-pointer transition-all ${
                    selectedDelivery === "delivery"
                      ? "border-brand-terracotta bg-brand-blush/25 text-brand-terracotta font-bold"
                      : "border-brand-gold/20 text-brand-dark/70 hover:bg-brand-apricot/20"
                  }`}>
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
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark/85 mb-2">
                {t("order.timeSlot")} *
              </label>
              <select
                {...register("timeSlot")}
                className="w-full input-boutique focus:outline-none"
              >
                <option disabled value="">{t("order.timeSlotPlaceholder")}</option>
                <option value="morning_09_11">09:00 - 11:00 (Morning)</option>
                <option value="noon_11_13">11:00 - 13:00 (Lunch)</option>
                <option value="afternoon_13_15">13:00 - 15:00 (Early Afternoon)</option>
                <option value="evening_15_18">15:00 - 18:00 (Late Afternoon)</option>
              </select>
              {errors.timeSlot && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.timeSlot.message}</p>}
            </div>

            {/* Design Inspiration Images Upload block */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark/85 mb-2">
                {t("order.referenceImages")}
              </label>
              <div className="border-2 border-dashed border-brand-gold/30 hover:border-brand-terracotta/40 rounded-2xl p-6 bg-brand-apricot/10 transition-colors flex flex-col items-center justify-center text-center cursor-pointer relative group">
                <input
                  multiple
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  type="file"
                  onChange={handleFileUpload}
                />
                <CloudArrowUpIcon className="h-10 w-10 text-brand-gold/60 group-hover:text-brand-terracotta transition-colors mb-2" />
                <span className="font-sans text-xs font-semibold text-brand-dark/85">
                  {t("order.referenceImagesDesc")}
                </span>
                <span className="font-sans text-[10px] text-brand-dark/50 mt-1">
                  Supports JPG, PNG, up to 10MB per image
                </span>
              </div>

              {/* Uploaded File List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white border border-brand-gold/15 rounded-xl text-xs font-sans">
                      <div className="flex items-center gap-2">
                        <DocumentIcon className="h-4.5 w-4.5 text-brand-gold" />
                        <span className="font-semibold text-brand-dark truncate max-w-xs">{file.name}</span>
                        <span className="text-brand-dark/50">({file.size})</span>
                      </div>
                      <button
                        className="text-brand-dark/50 hover:text-red-600 transition-colors p-1"
                        type="button"
                        onClick={() => { removeFile(index); }}
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                className="px-6 py-3.5 rounded-full border border-brand-gold/30 text-brand-terracotta hover:bg-brand-apricot/30 transition-colors duration-300 font-sans text-xs font-bold tracking-widest uppercase flex items-center gap-2 cursor-pointer"
                type="button"
                onClick={previousStep}
              >
                <ArrowLeftIcon className="h-4.5 w-4.5" />
                Back
              </button>
              <button
                className="px-8 py-3.5 rounded-full bg-brand-terracotta text-white hover:bg-brand-dark transition-colors duration-300 font-sans text-xs font-bold tracking-widest uppercase flex items-center gap-2 cursor-pointer shadow-sm"
                type="button"
                onClick={nextStep}
              >
                Continue
                <ArrowRightIcon className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact & Comments */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark/85 mb-2">
                {t("order.name")} *
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full input-boutique focus:outline-none"
                placeholder="Sophie Müller"
              />
              {errors.name && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark/85 mb-2">
                  {t("order.email")} *
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full input-boutique focus:outline-none"
                  placeholder="sophie@example.ch"
                />
                {errors.email && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark/85 mb-2">
                  {t("order.phone")} *
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full input-boutique focus:outline-none"
                  placeholder="+41 79 123 45 67"
                />
                {errors.phone && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark/85 mb-2">
                {t("order.additionalNotes")}
              </label>
              <textarea
                rows={4}
                {...register("additionalNotes")}
                className="w-full input-boutique focus:outline-none resize-none"
                placeholder={t("order.additionalNotesPlaceholder") || ""}
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                className="px-6 py-3.5 rounded-full border border-brand-gold/30 text-brand-terracotta hover:bg-brand-apricot/30 transition-colors duration-300 font-sans text-xs font-bold tracking-widest uppercase flex items-center gap-2 cursor-pointer"
                type="button"
                onClick={previousStep}
              >
                <ArrowLeftIcon className="h-4.5 w-4.5" />
                Back
              </button>
              <button
                className="px-8 py-3.5 rounded-full bg-brand-terracotta text-white hover:bg-brand-dark transition-colors duration-300 font-sans text-xs font-bold tracking-widest uppercase cursor-pointer shadow-md"
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
