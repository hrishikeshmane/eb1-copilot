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
  Heading,
  Column,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  userFirstname: string;
  // userId: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://www.greencard.inc";

export const WelcomeEmail = ({ userFirstname }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Greencard Inc- Your Journey to freedom begins here!</Preview>
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
          <Text style={paragraph}>Hi {userFirstname},</Text>
          <Text style={paragraph}>
            Welcome to Greencard Inc. Your Journey to Freedom begins here!
          </Text>

          <Text style={paragraph}>
            You have been onboarded to our platform.
          </Text>
          <Section style={btnContainer}>
            <Section>
              <Row className="py-1">
                <Column>Name: Row 1</Column>
              </Row>
              <Row className="py-1">
                <Column>Email: Row 1</Column>
              </Row>
              <Row className="py-1">
                <Column>Phone: Row 2</Column>
              </Row>
              <Row className="py-1">
                <Column>Highest Education: Row 2</Column>
              </Row>
              <Row className="py-1">
                <Column>Major: Row 2</Column>
              </Row>
              <Row className="py-1">
                <Column>Brith Country: Row 2</Column>
              </Row>
              <Row className="py-1">
                <Column>Nationality Country: Row 2</Column>
              </Row>
              <Hr />
              <Row className="py-1">
                <Column>Currently In US: Row 2</Column>
              </Row>
              <Row className="py-1">
                <Column>Ever Been To US: Row 2</Column>
              </Row>
              <Row className="py-1">
                <Column>Ever Applied For Green Card: Row 2</Column>
              </Row>
              <Row className="py-1">
                <Column>Add Family Members: Row 2</Column>
              </Row>
              <Row className="py-1">
                <Column>Current Employer In US: Row 2</Column>
              </Row>
              <Row className="py-1">
                <Column>Current Visa: Row 2</Column>
              </Row>
              <Row className="py-1">
                <Column>Interested In: Row 2</Column>
              </Row>
              <Row className="py-1">
                <Column>Is a Student: Row 2</Column>
              </Row>
              <Row className="py-1">
                <Column>Graduation Year: Row 2</Column>
              </Row>
              <Row className="py-1">
                <Column>Is a Student: Row 2</Column>
              </Row>
              <Row className="py-1">
                <Column>Industry Type: Row 2</Column>
              </Row>
              <Row className="py-1">
                <Column>Priority Date If Any: Row 2</Column>
              </Row>
              <Row className="py-1">
                <Column>Field Expert In: Row 2</Column>
              </Row>
            </Section>
            <Button
              style={button}
              href="https://www.greencard.inc/dashboard/profile-tracker"
            >
              Track your profile
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            The Greencard team
          </Text>
          <Hr style={hr} />
          {/* <Text style={footer}>
          470 Noor Ave STE B #1148, South San Francisco, CA 94080
        </Text> */}
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

WelcomeEmail.PreviewProps = {
  userFirstname: "Alan",
} as WelcomeEmailProps;

export default WelcomeEmail;

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

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
