"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { MagneticButton } from "@/components/magicui/magnetic-button";
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
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { BadgeCheck, Loader2, Send, Sparkles } from "lucide-react";
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
  const { toast } = useToast();
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
    if (submitted) {
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
        toast({
          title: "Error sending email:",
          description: response.statusText,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error sending email:",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
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
          className="border-primary bg-card relative z-10 flex flex-col items-center gap-6 rounded-2xl border-2 p-12 text-center shadow-[0_0_60px_rgba(var(--primary),0.2)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="bg-primary/10 rounded-full p-4"
          >
            <BadgeCheck className="text-primary size-12" />
          </motion.div>
          <h2 className="font-display relative text-3xl font-bold tracking-tighter sm:text-5xl">
            Message Sent!
          </h2>
          <p className="text-muted-foreground max-w-md font-mono text-sm">
            Thanks for reaching out! I&apos;ll get back to you as soon as
            possible.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            size="lg"
            className="lg:h-14 lg:text-lg"
          >
            Send Another
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
            <div className="border-primary/40 flex flex-row items-center gap-4 border-b pb-4 md:flex-col md:items-start md:border-b-0 md:border-l-4 md:pb-0 md:pl-8">
              <span className="text-primary font-mono text-sm tracking-widest uppercase opacity-70">
                07
              </span>
              <h2 className="font-display text-foreground text-xl font-black tracking-tight wrap-break-word uppercase md:text-2xl md:break-normal lg:text-3xl">
                Contact
              </h2>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-muted-foreground max-w-md text-xl font-light">
              Have a project in mind? Let&apos;s build something exceptional
              together.
            </p>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="border-primary/20 bg-primary/5 flex items-center gap-3 rounded-lg border px-4 py-3">
              <Sparkles className="text-primary h-5 w-5" />
              <span className="text-muted-foreground text-sm">
                Usually responds within{" "}
                <span className="text-foreground font-semibold">24 hours</span>
              </span>
            </div>
          </BlurFade>
        </div>

        <div className="relative">
          <Form {...form}>
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <motion.form
                onSubmit={form.handleSubmit(onSubmit)}
                className="group/form border-border/50 bg-card/50 hover:border-primary/30 space-y-6 rounded-2xl border p-6 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_40px_rgba(var(--primary),0.1)]"
                noValidate
              >
                {/* Form glow effect */}
                <div className="from-primary/20 to-secondary/20 pointer-events-none absolute -inset-px mb-0 rounded-2xl bg-linear-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover/form:opacity-100" />

                <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                            className="transition-all duration-300 focus:shadow-[0_0_20px_rgba(var(--primary),0.1)]"
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
                            className="transition-all duration-300 focus:shadow-[0_0_20px_rgba(var(--primary),0.1)]"
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
                          className="transition-all duration-300 focus:shadow-[0_0_20px_rgba(var(--primary),0.1)]"
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
                            placeholder="Tell me about your project..."
                            required
                            maxLength={1000}
                            className="min-h-[150px] transition-all duration-300 focus:shadow-[0_0_20px_rgba(var(--primary),0.1)]"
                            {...field}
                          />
                          <span
                            className={cn(
                              "absolute right-3 bottom-3 font-mono text-[10px] transition-colors",
                              field.value.length > 900
                                ? "text-destructive"
                                : "text-muted-foreground/50",
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

                <MagneticButton strength={20} className="w-full">
                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="group relative w-full overflow-hidden transition-all duration-300 lg:h-14 lg:text-lg"
                  >
                    {/* Button gradient animation */}
                    <motion.div
                      className="from-primary via-secondary to-primary absolute inset-0 bg-linear-to-r bg-size-[200%_100%]"
                      animate={{
                        backgroundPosition: loading ? ["0%", "100%"] : "0%",
                      }}
                      transition={{
                        duration: 1,
                        repeat: loading ? Infinity : 0,
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5" />
                      )}
                      {loading ? "Sending..." : "Send Message"}
                    </span>
                  </Button>
                </MagneticButton>
              </motion.form>
            </BlurFade>
          </Form>
        </div>
      </div>
    </section>
  );
};
