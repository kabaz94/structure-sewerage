"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { contactFormSchema, ContactFormValues } from "@/lib/validations";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      honeypot: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="bg-surface-container-lowest rounded-xl shadow-2xl p-8 lg:p-12 text-center">
        <div className="w-16 h-16 bg-tertiary-fixed/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-tertiary-fixed-variant" />
        </div>
        <h3 className="text-2xl font-bold font-headline text-primary mb-4">
          Inquiry Submitted Successfully
        </h3>
        <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
          Thank you for contacting us. Our engineering team will review your
          inquiry and respond within 2 business hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-2xl p-8 lg:p-12">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-primary font-headline tracking-tight mb-2">
          Project Inquiry
        </h2>
        <p className="text-on-surface-variant">
          Fill out the form below and an engineering consultant will contact
          you within 2 business hours.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Honeypot - hidden from users */}
        <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
          <input
            {...register("honeypot")}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="text-xs font-bold uppercase tracking-wider text-outline font-label"
            >
              Full Name *
            </label>
            <input
              id="fullName"
              {...register("fullName")}
              className={cn(
                "w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-highest transition-all",
                errors.fullName && "ring-2 ring-error/20 bg-error-container/10"
              )}
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-error text-xs mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="companyName"
              className="text-xs font-bold uppercase tracking-wider text-outline font-label"
            >
              Company Name
            </label>
            <input
              id="companyName"
              {...register("companyName")}
              className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-highest transition-all"
              placeholder="Your Company Sdn Bhd"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-bold uppercase tracking-wider text-outline font-label"
            >
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={cn(
                "w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-highest transition-all",
                errors.email && "ring-2 ring-error/20 bg-error-container/10"
              )}
              placeholder="j.doe@enterprise.com"
            />
            {errors.email && (
              <p className="text-error text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-xs font-bold uppercase tracking-wider text-outline font-label"
            >
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              className={cn(
                "w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-highest transition-all",
                errors.phone && "ring-2 ring-error/20 bg-error-container/10"
              )}
              placeholder="+60 1X-XXX XXXX"
            />
            {errors.phone && (
              <p className="text-error text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="service"
            className="text-xs font-bold uppercase tracking-wider text-outline font-label"
          >
            Service Interested In *
          </label>
          <select
            id="service"
            {...register("service")}
            className={cn(
              "w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-highest transition-all appearance-none",
              errors.service && "ring-2 ring-error/20 bg-error-container/10"
            )}
            defaultValue=""
          >
            <option value="" disabled>
              Select a service
            </option>
            <option>Desludging / Grease Tank</option>
            <option>Sludge Tank Maintenance</option>
            <option>High-Pressure Water Jet Rodding</option>
            <option>Pump Repairs & Panel Box</option>
            <option>Grease Trap Cleaning</option>
            <option>Sewer & Grease Pipe Cleaning</option>
            <option>Wiring & Renovations</option>
            <option>Waterproofing</option>
            <option>Road Works</option>
            <option>Hygiene Services</option>
            <option>Emergency Response</option>
          </select>
          {errors.service && (
            <p className="text-error text-xs mt-1">{errors.service.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-xs font-bold uppercase tracking-wider text-outline font-label"
          >
            Project Brief / Message *
          </label>
          <textarea
            id="message"
            {...register("message")}
            rows={5}
            className={cn(
              "w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-highest transition-all resize-y",
              errors.message && "ring-2 ring-error/20 bg-error-container/10"
            )}
            placeholder="Describe your maintenance or structural requirements..."
          />
          {errors.message && (
            <p className="text-error text-xs mt-1">{errors.message.message}</p>
          )}
        </div>

        {status === "error" && (
          <div className="flex items-center gap-3 p-4 bg-error-container/20 rounded-lg text-error">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full md:w-auto bg-primary hover:bg-primary-container text-on-primary px-10 py-4 rounded-lg font-headline font-bold text-lg transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Inquiry
                <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
