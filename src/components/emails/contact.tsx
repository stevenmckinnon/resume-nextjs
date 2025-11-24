import { DATA } from "@/data/resume";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const baseUrl = "https://stevemckinnon.co.uk";

export const ContactEmail = ({
  name,
  email,
  subject,
  message,
}: EmailTemplateProps) => {
  const previewText = `New message from ${name}: ${subject}`;

  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: "#7c3aed",
                "primary-light": "#f3e8ff",
                secondary: "#14b8a6",
                accent: "#f59e0b",
                foreground: "#1e1b4b",
                "muted-foreground": "#6b7280",
                surface: "#fafafa",
                border: "#e5e7eb",
              },
              fontFamily: {
                sans: ["DM Sans", "system-ui", "sans-serif"],
                mono: ["Space Mono", "monospace"],
              },
              borderRadius: {
                xl: "12px",
                "2xl": "16px",
              },
            },
          },
        }}
      >
        <Head>
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono&display=swap');
            `}
          </style>
        </Head>

        <Body className="bg-[#f7f5f2] px-5 py-10 font-sans">
          <Preview>{previewText}</Preview>

          <Container className="mx-auto max-w-[600px]">
            {/* Header Card */}
            <Section className="overflow-hidden rounded-t-2xl bg-white">
              {/* Gradient accent bar - using inline style for gradient */}
              <div
                style={{
                  height: "4px",
                  background:
                    "linear-gradient(90deg, #7c3aed 0%, #14b8a6 50%, #f59e0b 100%)",
                }}
              />

              {/* Logo and name */}
              <Row className="p-6">
                <Column className="w-[72px] pr-3">
                  <Img
                    src={`${baseUrl}/me.jpg`}
                    width="56"
                    height="56"
                    alt={DATA.name}
                    className="border-border rounded-xl border-2"
                  />
                </Column>
                <Column className="align-middle">
                  <Text className="text-foreground m-0 text-lg font-bold tracking-tight">
                    {DATA.name}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Main Content Card */}
            <Section className="border-border rounded-b-2xl border-t bg-white px-8 py-8">
              {/* Badge */}
              <div className="bg-primary-light mb-5 inline-block rounded-full px-3.5 py-1.5">
                <span className="text-primary font-mono text-[11px] font-semibold tracking-widest">
                  📨 NEW MESSAGE
                </span>
              </div>

              <Heading className="text-foreground m-0 mb-2 text-[28px] leading-tight font-bold tracking-tight">
                You&apos;ve got mail!
              </Heading>

              <Text className="text-muted-foreground m-0 mb-7 text-base">
                <span className="text-primary font-semibold">{name}</span>{" "}
                reached out via your portfolio
              </Text>

              {/* Sender Details Card */}
              <Section className="bg-surface mb-6 rounded-xl p-4">
                <Row className="mb-2">
                  <Column className="w-[80px] align-top">
                    <Text className="text-muted-foreground m-0 font-mono text-xs font-medium tracking-wider uppercase">
                      From
                    </Text>
                  </Column>
                  <Column className="align-top">
                    <Link
                      href={`mailto:${email}`}
                      className="text-primary text-sm font-medium no-underline"
                    >
                      {email}
                    </Link>
                  </Column>
                </Row>
                <Row>
                  <Column className="w-[80px] align-top">
                    <Text className="text-muted-foreground m-0 font-mono text-xs font-medium tracking-wider uppercase">
                      Subject
                    </Text>
                  </Column>
                  <Column className="align-top">
                    <Text className="text-foreground m-0 text-sm font-medium">
                      {subject}
                    </Text>
                  </Column>
                </Row>
              </Section>

              {/* Message Section */}
              <Section className="mb-7">
                <Text className="text-muted-foreground m-0 mb-2.5 font-mono text-xs font-medium tracking-wider uppercase">
                  Message
                </Text>
                <div
                  className="bg-surface rounded-xl p-5"
                  style={{
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <Text className="text-foreground m-0 text-[15px] leading-relaxed whitespace-pre-wrap">
                    {message}
                  </Text>
                </div>
              </Section>

              {/* CTA Button */}
              <Section className="text-center">
                <Link
                  href={`mailto:${email}?subject=Re: ${subject}`}
                  className="bg-primary inline-block rounded-xl px-8 py-3.5 text-sm font-semibold text-white no-underline"
                >
                  Reply to {name.split(" ")[0]} →
                </Link>
              </Section>
            </Section>

            {/* Footer */}
            <Section className="pt-8">
              <Hr className="border-border mb-6 border-t" />
              <Text className="text-muted-foreground m-0 mb-4 text-center text-[13px]">
                This email was sent from your portfolio contact form at{" "}
                <Link href={baseUrl} className="text-primary no-underline">
                  stevemckinnon.co.uk
                </Link>
              </Text>
              <Row className="mb-4">
                <Column align="center">
                  <Link
                    href="https://github.com/stevenmckinnon"
                    className="text-muted-foreground font-mono text-xs no-underline"
                  >
                    GitHub
                  </Link>
                  <span className="text-border mx-3">•</span>
                  <Link
                    href="https://linkedin.com/in/stevenmckinnon92"
                    className="text-muted-foreground font-mono text-xs no-underline"
                  >
                    LinkedIn
                  </Link>
                  <span className="text-border mx-3">•</span>
                  <Link
                    href="https://x.com/stevenmckinnon"
                    className="text-muted-foreground font-mono text-xs no-underline"
                  >
                    X
                  </Link>
                </Column>
              </Row>
              <Text className="text-muted-foreground m-0 text-center text-xs">
                © {new Date().getFullYear()} Steve McKinnon. Glasgow, Scotland
                🏴󠁧󠁢󠁳󠁣󠁴󠁿
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactEmail;
