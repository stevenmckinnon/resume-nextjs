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

        <Body className="bg-[#f7f5f2] py-10 px-5 font-sans">
          <Preview>{previewText}</Preview>

          <Container className="mx-auto max-w-[600px]">
            {/* Header Card */}
            <Section className="bg-white rounded-t-2xl overflow-hidden">
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
                    className="rounded-xl border-2 border-border"
                  />
                </Column>
                <Column className="align-middle">
                  <Text className="m-0 text-lg font-bold text-foreground tracking-tight">
                    {DATA.name}
                  </Text>
                  <Text className="m-0 text-[13px] text-muted-foreground font-mono tracking-wide">
                    Lead Frontend Developer
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Main Content Card */}
            <Section className="bg-white rounded-b-2xl border-t border-border px-8 py-8">
              {/* Badge */}
              <div className="inline-block bg-primary-light rounded-full px-3.5 py-1.5 mb-5">
                <span className="text-[11px] font-semibold text-primary tracking-widest font-mono">
                  ✉ NEW MESSAGE
                </span>
              </div>

              <Heading className="m-0 mb-2 text-[28px] font-bold text-foreground tracking-tight leading-tight">
                You&apos;ve got mail!
              </Heading>

              <Text className="m-0 mb-7 text-base text-muted-foreground">
                <span className="text-primary font-semibold">{name}</span>{" "}
                reached out via your portfolio
              </Text>

              {/* Sender Details Card */}
              <Section className="bg-surface rounded-xl p-4 mb-6">
                <Row className="mb-2">
                  <Column className="w-[80px] align-top">
                    <Text className="m-0 text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
                      From
                    </Text>
                  </Column>
                  <Column className="align-top">
                    <Link
                      href={`mailto:${email}`}
                      className="text-sm font-medium text-primary no-underline"
                    >
                      {email}
                    </Link>
                  </Column>
                </Row>
                <Row>
                  <Column className="w-[80px] align-top">
                    <Text className="m-0 text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
                      Subject
                    </Text>
                  </Column>
                  <Column className="align-top">
                    <Text className="m-0 text-sm font-medium text-foreground">
                      {subject}
                    </Text>
                  </Column>
                </Row>
              </Section>

              {/* Message Section */}
              <Section className="mb-7">
                <Text className="m-0 mb-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
                  Message
                </Text>
                <div
                  className="bg-surface rounded-xl p-5"
                  style={{
                    border: "1px solid #e5e7eb",
                    borderLeft: "3px solid #7c3aed",
                  }}
                >
                  <Text className="m-0 text-[15px] leading-relaxed text-foreground whitespace-pre-wrap">
                    {message}
                  </Text>
                </div>
              </Section>

              {/* CTA Button */}
              <Section className="text-center">
                <Link
                  href={`mailto:${email}?subject=Re: ${subject}`}
                  className="inline-block bg-primary text-white text-sm font-semibold no-underline px-8 py-3.5 rounded-xl"
                >
                  Reply to {name.split(" ")[0]} →
                </Link>
              </Section>
            </Section>

            {/* Footer */}
            <Section className="pt-8">
              <Hr className="border-t border-border mb-6" />
              <Text className="m-0 mb-4 text-[13px] text-muted-foreground text-center">
                This email was sent from your portfolio contact form at{" "}
                <Link href={baseUrl} className="text-primary no-underline">
                  stevemckinnon.co.uk
                </Link>
              </Text>
              <Row className="mb-4">
                <Column align="center">
                  <Link
                    href="https://github.com/stevenmckinnon"
                    className="text-xs text-muted-foreground no-underline font-mono"
                  >
                    GitHub
                  </Link>
                  <span className="text-border mx-3">•</span>
                  <Link
                    href="https://linkedin.com/in/stevenmckinnon92"
                    className="text-xs text-muted-foreground no-underline font-mono"
                  >
                    LinkedIn
                  </Link>
                  <span className="text-border mx-3">•</span>
                  <Link
                    href="https://x.com/stevenmckinnon"
                    className="text-xs text-muted-foreground no-underline font-mono"
                  >
                    X
                  </Link>
                </Column>
              </Row>
              <Text className="m-0 text-xs text-muted-foreground text-center">
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
