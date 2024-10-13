import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Row,
    Column,
    Tailwind,
  } from "@react-email/components";
  import * as React from "react";
  
  interface ReminderEmailProps {
    name: string; // Only the name is needed now
    message: string;
    link?: string; // Optional link for scheduling calls or onboarding
    linkText?: string; // Optional text for the link button
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.greencard.inc";
  
  export const ReminderEmail: React.FC<Readonly<ReminderEmailProps>> = ({
    name,
    message,
    link,
    linkText = "Click Here",
  }) => (
    <Html>
      <Head />
      <Preview>{message}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#D9F522",
              },
            },
          },
        }}
      >
        <Body style={main}>
          <Container style={container}>
            <Row>
              <Img
                src={`${baseUrl}/logo-512.png`}
                width="50"
                height="50"
                alt="GreenCard Inc Logo"
                style={logo}
              />
            </Row>
            <Text style={paragraph}>Hi {name},</Text>
            <Text style={paragraph}>{message}</Text>
  
            <Section style={btnContainer}>
              <Hr />
              {link && (
                <Button style={button} href={link}>
                  {linkText}
                </Button>
              )}
            </Section>
  
            <Text style={paragraph}>
              Best,
              <br />
              The Greencard team
            </Text>
            <Hr style={hr} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
  
  export default ReminderEmail;
  
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
  };
  
  const logo = {
    margin: "0 auto",
  };
  
  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
  };
  
  const btnContainer = {
    backgroundColor: "#C1C8C6",
    textAlign: "left" as const,
    padding: "18px",
  };
  
  const button = {
    backgroundColor: "#D9F522",
    borderRadius: "3px",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
    margin: "20px 0",
  };
  
  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };
  