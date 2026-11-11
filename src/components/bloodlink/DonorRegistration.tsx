import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, HeartHandshake, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BLOOD_GROUPS } from "@/data/bloodlink";
import { cn } from "@/lib/utils";
import { DemoBadge, Reveal, Serif } from "./shared";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{10,15}$/, "Enter a valid phone number (10–15 digits)"),
  bloodGroup: z.enum(BLOOD_GROUPS, { errorMap: () => ({ message: "Select your blood group" }) }),
  city: z.string().trim().min(2, "Enter your city").max(60),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm consent to continue" }) }),
});
type FormValues = z.infer<typeof schema>;

const inputCls = "h-12 rounded-xl bg-background";

function Field({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-semibold">
        {label}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function DonorRegistration() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { name: "", email: "", phone: "", city: "" } });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(values);
    reset();
  };

  const aria = (k: keyof FormValues) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `reg-${k}-error` : undefined });

  return (
    <section id="become-donor" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-card lg:grid-cols-[1fr_1.1fr]">
          <div className="relative overflow-hidden bg-gradient-crimson p-8 text-primary-foreground sm:p-12">
            <div className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full border-[40px] border-primary-foreground/10" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-8 top-10 size-24 rounded-full bg-primary-foreground/10 blur-xl" aria-hidden="true" />
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/80">Become a donor</p>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
                Your One Donation Can Make a <Serif>Difference.</Serif>
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-primary-foreground/85">
                Join a community of voluntary donors and help make blood donation more accessible.
              </p>
              <ul className="mt-10 space-y-4">
                {[
                  { icon: HeartHandshake, t: "Voluntary, unpaid and community-driven" },
                  { icon: ShieldCheck, t: "Eligibility confirmed by authorised blood banks" },
                  { icon: Lock, t: "Demo form — nothing you enter is stored" },
                ].map(({ icon: Icon, t }) => (
                  <li key={t} className="flex items-center gap-3 text-sm font-medium">
                    <span className="grid size-9 place-items-center rounded-xl bg-primary-foreground/15">
                      <Icon className="size-4" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="relative p-8 sm:p-12">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full flex-col items-center justify-center py-10 text-center"
                  role="status"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                    className="grid size-20 place-items-center rounded-full bg-success-soft text-success"
                  >
                    <CheckCircle2 className="size-10" />
                  </motion.span>
                  <h3 className="mt-6 text-2xl font-extrabold text-foreground">Thank you, {submitted.name.split(" ")[0]}!</h3>
                  <p className="mt-3 max-w-sm text-muted-foreground">
                    Your demo registration as a <strong className="text-primary">{submitted.bloodGroup}</strong> donor in{" "}
                    {submitted.city} was successful. This is a prototype, so no details were saved or shared.
                  </p>
                  <DemoBadge className="mt-5">Demo submission</DemoBadge>
                  <Button variant="soft" className="mt-8" onClick={() => setSubmitted(null)}>
                    <Sparkles /> Register another donor
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-5"
                  aria-label="Donor registration (demo)"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-foreground">Register as a donor</h3>
                    <DemoBadge>Demo only</DemoBadge>
                  </div>
                  <Field id="reg-name" label="Full name" error={errors.name?.message}>
                    <Input id="reg-name" placeholder="e.g. Aisha Rahman" className={inputCls} autoComplete="name" {...aria("name")} {...register("name")} />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="reg-email" label="Email" error={errors.email?.message}>
                      <Input id="reg-email" type="email" placeholder="you@example.com" className={inputCls} autoComplete="email" {...aria("email")} {...register("email")} />
                    </Field>
                    <Field id="reg-phone" label="Phone number" error={errors.phone?.message}>
                      <Input id="reg-phone" type="tel" placeholder="+91 98765 43210" className={inputCls} autoComplete="tel" {...aria("phone")} {...register("phone")} />
                    </Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="reg-bloodGroup" label="Blood group" error={errors.bloodGroup?.message}>
                      <Controller
                        control={control}
                        name="bloodGroup"
                        render={({ field }) => (
                          <Select value={field.value ?? ""} onValueChange={field.onChange}>
                            <SelectTrigger id="reg-bloodGroup" className={cn(inputCls, "w-full")} {...aria("bloodGroup")}>
                              <SelectValue placeholder="Select group" />
                            </SelectTrigger>
                            <SelectContent>
                              {BLOOD_GROUPS.map((g) => (
                                <SelectItem key={g} value={g}>
                                  {g}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </Field>
                    <Field id="reg-city" label="City" error={errors.city?.message}>
                      <Input id="reg-city" placeholder="e.g. Srinagar" className={inputCls} autoComplete="address-level2" {...aria("city")} {...register("city")} />
                    </Field>
                  </div>
                  <Controller
                    control={control}
                    name="consent"
                    render={({ field }) => (
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-3 rounded-2xl bg-muted p-4">
                          <Checkbox
                            id="reg-consent"
                            checked={field.value === true}
                            onCheckedChange={(c) => field.onChange(c === true ? true : undefined)}
                            className="mt-0.5"
                            {...aria("consent")}
                          />
                          <Label htmlFor="reg-consent" className="text-sm font-normal leading-relaxed text-muted-foreground">
                            I understand this is a demonstration and consent to being contacted for voluntary donation.
                            Eligibility will be confirmed by qualified medical professionals.
                          </Label>
                        </div>
                        {errors.consent && (
                          <p id="reg-consent-error" className="text-xs font-medium text-destructive">
                            {errors.consent.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Registering…" : "Register as Donor"}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
