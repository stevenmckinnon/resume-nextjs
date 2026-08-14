"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { BadgeCheck, Clock, Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Confetti, type ConfettiRef } from "./magicui/confetti";

const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormData = z.infer<typeof schema>;

const BLUR_FADE_DELAY = 0.04;

export const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    if (
      submitted &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      confettiRef.current?.fire({});
    }
  }, [submitted]);

  const onSubmit = async (formData: ContactFormData) => {
    try {
      setLoading(true);

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        toast.error("Failed to send message", {
          description: response.statusText,
        });
      }
    } catch (error) {
      toast.error("Failed to send message", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section
        id="contact"
        className="relative flex w-full flex-col items-center justify-center overflow-hidden py-24"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="border-primary-accent bg-card relative z-10 flex flex-col items-center gap-6 rounded-2xl border-2 p-12 text-center shadow-[0_0_60px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="bg-primary/10 rounded-full p-4"
          >
            <BadgeCheck className="text-primary-accent size-12" />
          </motion.div>
          <h2 className="relative text-3xl font-bold tracking-tighter sm:text-5xl">
            Message sent
          </h2>
          <p className="text-muted-foreground max-w-md text-sm">
            Thanks for getting in touch. I&apos;ll reply within 24 hours.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            size="lg"
            className="active:scale-[0.96] lg:h-14 lg:text-lg"
          >
            Send another
          </Button>
        </motion.div>
        <Confetti
          ref={confettiRef}
          className="pointer-events-none absolute top-0 left-0 z-0 size-full"
        />
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="border-border/50 relative border-t-2 py-12 md:py-24"
    >
      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex flex-col justify-start space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <SectionHeading title="Contact" />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-muted-foreground max-w-md text-xl font-light">
              Hiring, or just want to talk shop? Send me a message.
            </p>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="border-primary-accent/20 bg-primary/5 flex items-center gap-3 rounded-lg border px-4 py-3">
              <Clock className="text-primary-accent size-5" strokeWidth={1.5} />
              <span className="text-muted-foreground text-sm">
                I usually reply within{" "}
                <span className="text-foreground font-semibold">24 hours</span>
              </span>
            </div>
          </BlurFade>
        </div>

        <div className="relative">
          <Form {...form}>
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              {/* Panel radius is concentric with the inputs inside it: Input is
                  rounded-lg (--radius), plus this panel's p-4. */}
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="border-border/50 bg-card/50 focus-within:border-primary-accent/30 space-y-6 rounded-[calc(var(--radius)+1rem)] border p-4 backdrop-blur-sm transition-[border-color] duration-300"
                noValidate
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Name</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="name"
                            placeholder="Your name"
                            required
                            className="transition-[box-shadow,border-color] duration-150 focus:shadow-[0_0_16px_color-mix(in_srgb,var(--color-primary)_10%,transparent)]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            autoComplete="email"
                            placeholder="Your email"
                            required
                            className="transition-[box-shadow,border-color] duration-150 focus:shadow-[0_0_16px_color-mix(in_srgb,var(--color-primary)_10%,transparent)]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel required>Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="What's this about?"
                          required
                          className="transition-[box-shadow,border-color] duration-150 focus:shadow-[0_0_16px_color-mix(in_srgb,var(--color-primary)_10%,transparent)]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel required>Message</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="Tell me about the role, the team, or what you're building..."
                            required
                            maxLength={1000}
                            className="min-h-[150px] transition-[box-shadow,border-color] duration-150 focus:shadow-[0_0_16px_color-mix(in_srgb,var(--color-primary)_10%,transparent)]"
                            {...field}
                          />
                          <span
                            className={cn(
                              "absolute right-3 bottom-3 font-mono text-[10px] transition-colors",
                              field.value.length > 900
                                ? "text-destructive"
                                : "text-muted-foreground",
                            )}
                          >
                            {field.value.length}/1000
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="w-full active:scale-[0.96] lg:h-14 lg:text-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? (
                      <Loader2
                        className="size-5 animate-spin"
                        strokeWidth={2}
                      />
                    ) : (
                      <Send className="size-5" strokeWidth={2} />
                    )}
                    {loading ? "Sending…" : "Send message"}
                  </span>
                </Button>
              </form>
            </BlurFade>
          </Form>
        </div>
      </div>
    </section>
  );
};
