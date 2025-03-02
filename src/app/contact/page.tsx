"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { useToast } from "@/hooks/use-toast";
import { MailOpen, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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

const Page = () => {
  const router = useRouter();

  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (formData: ContactFormData) => {
    try {
      setLoading(true); // Set loading to true when starting the async operation

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        router.push("/contact/confirm");
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
      setLoading(false); // Set loading back to false after the async operation completes
    }
  };

  return (
    <main className="flex flex-col h-full space-y-10">
      <section id="contact">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex-col flex flex-1 space-y-1.5">
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
                Contact Me
              </h2>
            </BlurFade>
            <BlurFadeText
              className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert"
              delay={BLUR_FADE_DELAY * 3}
              text="Drop me a message and I'll get back to you as soon as possible."
            />
          </div>
          <Form {...form}>
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
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
                              "absolute bottom-2 right-2 text-xs",
                              field.value.length > 900
                                ? "text-warning"
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

                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <MailOpen />
                  )}{" "}
                  Submit
                </Button>
              </form>
            </BlurFade>
          </Form>
        </div>
      </section>
    </main>
  );
};

export default Page;
