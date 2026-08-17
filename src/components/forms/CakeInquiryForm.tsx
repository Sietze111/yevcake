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
    <div className="w-full max-w-3xl mx-auto border-3 border-nb-black shadow-[8px_8px_0px_0px_#0D0D0D] bg-nb-white p-8 sm:p-10">
      {/* Step Progress */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b-3 border-nb-black">
        <div className="flex items-center gap-3">
          <span className={`w-9 h-9 border-2 border-nb-black flex items-center justify-center font-mono font-bold text-sm transition-all ${step >= 1 ? "bg-nb-yellow text-nb-black shadow-[2px_2px_0px_0px_#0D0D0D]" : "bg-nb-white text-nb-black/40"}`}>
            1
          </span>
          <span className="font-mono font-bold text-xs tracking-wider uppercase text-nb-black hidden sm:inline">
            {t("order.step1")}
          </span>
        </div>
        <div className={`flex-grow h-1 mx-4 transition-colors ${step >= 2 ? "bg-nb-black" : "bg-nb-black/15"}`} />
        <div className="flex items-center gap-3">
          <span className={`w-9 h-9 border-2 border-nb-black flex items-center justify-center font-mono font-bold text-sm transition-all ${step >= 2 ? "bg-nb-yellow text-nb-black shadow-[2px_2px_0px_0px_#0D0D0D]" : "bg-nb-white text-nb-black/40"}`}>
            2
          </span>
          <span className="font-mono font-bold text-xs tracking-wider uppercase text-nb-black hidden sm:inline">
            {t("order.step2")}
          </span>
        </div>
        <div className={`flex-grow h-1 mx-4 transition-colors ${step >= 3 ? "bg-nb-black" : "bg-nb-black/15"}`} />
        <div className="flex items-center gap-3">
          <span className={`w-9 h-9 border-2 border-nb-black flex items-center justify-center font-mono font-bold text-sm transition-all ${step >= 3 ? "bg-nb-yellow text-nb-black shadow-[2px_2px_0px_0px_#0D0D0D]" : "bg-nb-white text-nb-black/40"}`}>
            3
          </span>
          <span className="font-mono font-bold text-xs tracking-wider uppercase text-nb-black hidden sm:inline">
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
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-nb-black mb-2">
                  {t("order.occasion")} *
                </label>
                <select {...register("occasion")} className="nb-input">
                  <option disabled value="">{t("order.occasionPlaceholder")}</option>
                  <option value="wedding">{t("order.occasionWedding")}</option>
                  <option value="birthday">{t("order.occasionBirthday")}</option>
                  <option value="bento">{t("order.occasionBento")}</option>
                  <option value="other">{t("order.occasionOther")}</option>
                </select>
                {errors.occasion && <p className="text-red-600 text-xs mt-1 font-mono font-bold">{errors.occasion.message}</p>}
              </div>

              <div>
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-nb-black mb-2">
                  {t("order.servings")} *
                </label>
                <input
                  min="5"
                  type="number"
                  {...register("servings", { valueAsNumber: true })}
                  className="nb-input"
                />
                {errors.servings && <p className="text-red-600 text-xs mt-1 font-mono font-bold">{errors.servings.message}</p>}
              </div>
            </div>

            {selectedOccasion === "other" && (
              <div className="animate-fade-in">
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-nb-black mb-2">
                  Describe the Occasion *
                </label>
                <input
                  placeholder="e.g. Baby Shower, Bridal Shower, Anniversary..."
                  type="text"
                  {...register("customOccasion")}
                  className="nb-input"
                />
                {errors.customOccasion && <p className="text-red-600 text-xs mt-1 font-mono font-bold">{errors.customOccasion.message}</p>}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-nb-black mb-2">
                  {t("order.flavor")} *
                </label>
                <select {...register("flavor")} className="nb-input">
                  <option disabled value="">{t("order.flavorPlaceholder")}</option>
                  <option value="medovyk">{t("flavors.medovyk.name")}</option>
                  <option value="pistachio">{t("flavors.pistachio.name")}</option>
                  <option value="caramel">{t("flavors.caramel.name")}</option>
                  <option value="mango">{t("flavors.mango.name")}</option>
                </select>
                {errors.flavor && <p className="text-red-600 text-xs mt-1 font-mono font-bold">{errors.flavor.message}</p>}
              </div>

              <div>
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-nb-black mb-2">
                  {t("order.inscription")}
                </label>
                <input
                  placeholder={t("order.inscriptionPlaceholder") || ""}
                  type="text"
                  {...register("inscription")}
                  className="nb-input"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-nb-black mb-2">
                {t("order.dietary")}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 border-2 border-nb-black bg-nb-cream">
                {[
                  { value: "glutenFree", label: t("order.dietaryGlutenFree") },
                  { value: "lactoseFree", label: t("order.dietaryLactoseFree") },
                  { value: "vegan", label: t("order.dietaryVegan") },
                  { value: "nutFree", label: t("order.dietaryNutFree") },
                ].map((item) => (
                  <label key={item.value} className="flex items-center gap-2 font-mono text-xs font-bold text-nb-black cursor-pointer">
                    <input
                      type="checkbox"
                      value={item.value}
                      {...register("dietary")}
                      className="h-4 w-4 border-2 border-nb-black accent-nb-black"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-nb-black mb-2">
                {t("order.designTheme")} *
              </label>
              <textarea
                placeholder={t("order.designThemePlaceholder") || ""}
                rows={3}
                {...register("designTheme")}
                className="nb-input resize-none"
              />
              {errors.designTheme && <p className="text-red-600 text-xs mt-1 font-mono font-bold">{errors.designTheme.message}</p>}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                className="nb-btn bg-nb-yellow text-nb-black text-xs flex items-center gap-2"
                type="button"
                onClick={nextStep}
              >
                Continue
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Logistics */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-nb-black mb-2">
                  {t("order.date")} *
                </label>
                <input
                  type="date"
                  {...register("date")}
                  className="nb-input"
                />
                {errors.date && <p className="text-red-600 text-xs mt-1 font-mono font-bold">{errors.date.message}</p>}
              </div>

              <div>
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-nb-black mb-2">
                  {t("order.deliveryType")} *
                </label>
                <div className="grid grid-cols-2 gap-3 h-12">
                  <label className={`flex items-center justify-center border-2 border-nb-black font-mono text-xs font-bold cursor-pointer transition-colors ${selectedDelivery === "pickup" ? "bg-nb-yellow text-nb-black shadow-[2px_2px_0px_0px_#0D0D0D]" : "bg-nb-white text-nb-black/60 hover:bg-nb-yellow/40"}`}>
                    <input type="radio" value="pickup" {...register("deliveryType")} className="sr-only" />
                    {t("order.pickup")}
                  </label>
                  <label className={`flex items-center justify-center border-2 border-nb-black font-mono text-xs font-bold cursor-pointer transition-colors ${selectedDelivery === "delivery" ? "bg-nb-yellow text-nb-black shadow-[2px_2px_0px_0px_#0D0D0D]" : "bg-nb-white text-nb-black/60 hover:bg-nb-yellow/40"}`}>
                    <input type="radio" value="delivery" {...register("deliveryType")} className="sr-only" />
                    {t("order.delivery")}
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-nb-black mb-2">
                {t("order.timeSlot")} *
              </label>
              <select {...register("timeSlot")} className="nb-input">
                <option disabled value="">{t("order.timeSlotPlaceholder")}</option>
                <option value="morning_09_11">09:00 - 11:00 (Morning)</option>
                <option value="noon_11_13">11:00 - 13:00 (Lunch)</option>
                <option value="afternoon_13_15">13:00 - 15:00 (Early Afternoon)</option>
                <option value="evening_15_18">15:00 - 18:00 (Late Afternoon)</option>
              </select>
              {errors.timeSlot && <p className="text-red-600 text-xs mt-1 font-mono font-bold">{errors.timeSlot.message}</p>}
            </div>

            {/* File Upload */}
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-nb-black mb-2">
                {t("order.referenceImages")}
              </label>
              <div className="border-3 border-dashed border-nb-black p-6 bg-nb-cream flex flex-col items-center justify-center text-center cursor-pointer relative group hover:bg-nb-yellow/20 transition-colors">
                <input
                  multiple
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  type="file"
                  onChange={handleFileUpload}
                />
                <CloudArrowUpIcon className="h-10 w-10 text-nb-black/40 group-hover:text-nb-black transition-colors mb-2" />
                <span className="font-mono text-xs font-bold text-nb-black uppercase">
                  {t("order.referenceImagesDesc")}
                </span>
                <span className="font-mono text-[10px] text-nb-black/50 mt-1">
                  Supports JPG, PNG, up to 10MB per image
                </span>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border-2 border-nb-black bg-nb-mint text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <DocumentIcon className="h-4 w-4 text-nb-black" />
                        <span className="font-bold text-nb-black truncate max-w-xs">{file.name}</span>
                        <span className="text-nb-black/60">({file.size})</span>
                      </div>
                      <button
                        className="text-nb-black/60 hover:text-red-600 transition-colors p-1"
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
                className="nb-btn bg-nb-white text-nb-black text-xs flex items-center gap-2"
                type="button"
                onClick={previousStep}
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Back
              </button>
              <button
                className="nb-btn bg-nb-yellow text-nb-black text-xs flex items-center gap-2"
                type="button"
                onClick={nextStep}
              >
                Continue
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in text-left">
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-nb-black mb-2">
                {t("order.name")} *
              </label>
              <input
                placeholder="Sophie Müller"
                type="text"
                {...register("name")}
                className="nb-input"
              />
              {errors.name && <p className="text-red-600 text-xs mt-1 font-mono font-bold">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-nb-black mb-2">
                  {t("order.email")} *
                </label>
                <input
                  placeholder="sophie@example.ch"
                  type="email"
                  {...register("email")}
                  className="nb-input"
                />
                {errors.email && <p className="text-red-600 text-xs mt-1 font-mono font-bold">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-nb-black mb-2">
                  {t("order.phone")} *
                </label>
                <input
                  placeholder="+41 79 123 45 67"
                  type="tel"
                  {...register("phone")}
                  className="nb-input"
                />
                {errors.phone && <p className="text-red-600 text-xs mt-1 font-mono font-bold">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-nb-black mb-2">
                {t("order.additionalNotes")}
              </label>
              <textarea
                placeholder={t("order.additionalNotesPlaceholder") || ""}
                rows={4}
                {...register("additionalNotes")}
                className="nb-input resize-none"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                className="nb-btn bg-nb-white text-nb-black text-xs flex items-center gap-2"
                type="button"
                onClick={previousStep}
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Back
              </button>
              <button
                className="nb-btn bg-nb-black text-nb-yellow text-xs"
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
