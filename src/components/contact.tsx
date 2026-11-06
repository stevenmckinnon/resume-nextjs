"use client";

import { CopyEmailButton } from "@/components/copy-email-button";
import { Reveal } from "@/components/reveal";
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
import { DATA } from "@/data/resume";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { BadgeCheck, Loader2, Send } from "lucide-react";
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
          className="border-primary-accent bg-card relative z-10 flex flex-col items-center gap-6 rounded-2xl border-2 p-12 text-center"
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
      aria-labelledby="contact-heading"
      className="relative pb-16 md:pb-32"
    >
      <Reveal>
        <SectionHeading
          id="contact-heading"
          title="Contact"
          kicker="Hiring, or just want to talk shop? I usually reply within 24 hours."
        />
      </Reveal>

      {/* The address is the headline act. The form is there for anyone who
          prefers one; a recruiter mostly wants something to paste. */}
      <Reveal
        order={1}
        className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2"
      >
        <a
          href={`mailto:${DATA.contact.email}`}
          className="text-primary-accent font-display min-w-0 text-[clamp(1.75rem,9.1cqw,8rem)] leading-tight font-bold tracking-[-0.025em] wrap-anywhere underline-offset-8 hover:underline"
        >
          {DATA.contact.email}
        </a>
        <CopyEmailButton />
      </Reveal>

      <div className="short:hidden mt-12 grid grid-cols-1 gap-x-16 gap-y-10 md:mt-16 lg:grid-cols-12">
        <Reveal className="flex flex-col gap-2 lg:col-span-4">
          <h3 className="text-foreground text-lg font-bold">Elsewhere</h3>
          <ul className="flex flex-col">
            {Object.values(DATA.contact.social)
              .filter((social) => social.navbar)
              .map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary-accent inline-flex items-center gap-2.5 py-1.5 font-medium transition-colors"
                  >
                    <social.icon aria-hidden="true" className="size-4" />
                    {social.name}
                  </a>
                </li>
              ))}
          </ul>
        </Reveal>

        <div className="relative lg:col-span-8">
          <h3 className="text-foreground mb-4 text-lg font-bold">
            Or send a message
          </h3>
          <Form {...form}>
            <Reveal order={1}>
              {/* Panel radius is concentric with the inputs inside it: Input is
                  rounded-lg (--radius), plus this panel's p-4. */}
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-card space-y-6 rounded-[calc(var(--radius)+1rem)] p-4 md:p-6"
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
                            className="transition-[border-color] duration-150"
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
                            className="transition-[border-color] duration-150"
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
                          className="transition-[border-color] duration-150"
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
                            className="min-h-[150px] transition-[border-color] duration-150"
                            {...field}
                          />
                          <span
                            className={cn(
                              "absolute right-3 bottom-3 text-xs tabular-nums transition-colors",
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
                  className="w-full active:scale-[0.96]"
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
            </Reveal>
          </Form>
        </div>
      </div>
    </section>
  );
};
