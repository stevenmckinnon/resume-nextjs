"use client";

import BlurFade from "@/components/magicui/blur-fade";
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

  if (true) {
    return (
      <section
        id="contact"
        className="relative flex w-full flex-col items-center justify-center overflow-hidden py-24"
      >
        <div className="relative z-10 rounded-md flex flex-col items-center gap-6 text-center border-2 border-primary p-12 bg-card shadow-[8px_8px_0px_0px_rgba(var(--primary))]">
          <BadgeCheck className="size-16 text-primary" />
          <h2 className="relative text-3xl font-display font-bold tracking-tighter sm:text-5xl">
            Message Sent
          </h2>
          <p className="font-mono text-sm text-muted-foreground max-w-md">
            I&apos;ll get back to you as soon as possible.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            size="lg"
            className="lg:h-14 lg:text-lg"
          >
            Send Another
          </Button>
        </div>
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 size-full pointer-events-none"
        />
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="py-12 md:py-24 border-t-2 border-border/50"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col justify-start space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 border-b md:border-b-0 md:border-l-4 border-primary/40 pb-4 md:pb-0 md:pl-8">
              <span className="text-sm font-mono text-primary tracking-widest uppercase opacity-70">
                07
              </span>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-black uppercase tracking-tight text-foreground break-words md:break-normal">
                Contact
              </h2>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-xl text-muted-foreground font-light max-w-md">
              Have a project in mind? Let&apos;s build something exceptional
              together.
            </p>
          </BlurFade>
        </div>
        <div className="relative">
          <Form {...form}>
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 p-4 rounded-md border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-500"
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
                    <FormItem>
                      <FormLabel required>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Subject" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Message</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="Your message"
                            required
                            maxLength={1000}
                            {...field}
                          />
                          <span
                            className={cn(
                              "absolute bottom-2 right-2 text-[10px] font-mono",
                              field.value.length > 900
                                ? "text-destructive"
                                : "text-muted-foreground"
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
                  className="w-full lg:h-14 lg:text-lg transition-all duration-300 group"
                >
                  {loading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    <Send className="mr-2 size-4 group-hover:translate-x-1 transition-transform" />
                  )}
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </BlurFade>
          </Form>
        </div>
      </div>
    </section>
  );
};
