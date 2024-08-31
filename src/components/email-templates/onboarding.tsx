import { type ISelectUserInfo } from "@/server/db/schema";
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

interface WelcomeEmailProps {
  userPersonalInfo: ISelectUserInfo;
  // userId: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://www.greencard.inc";

export const OnboardingEmail: React.FC<Readonly<WelcomeEmailProps>> = ({
  userPersonalInfo,
}) => (
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
          <Text style={paragraph}>Hi {userPersonalInfo.fullName},</Text>
          <Text style={paragraph}>
            Welcome to Greencard Inc. Your Journey to Freedom begins here!
          </Text>

          <Text style={paragraph}>
            You have been onboarded to our platform.
          </Text>
          <Section style={btnContainer}>
            <Section>
              <Row className="py-1">
                <Column>Name: {userPersonalInfo.fullName}</Column>
              </Row>
              <Row className="py-1">
                <Column>Email: {userPersonalInfo.email}</Column>
              </Row>
              <Row className="py-1">
                <Column>Phone: {userPersonalInfo.phone}</Column>
              </Row>
              <Row className="py-1">
                <Column>
                  Highest Education: {userPersonalInfo.highestEducation}
                </Column>
              </Row>
              <Row className="py-1">
                <Column>Major: {userPersonalInfo.major}</Column>
              </Row>
              <Row className="py-1">
                <Column>Brith Country: {userPersonalInfo.brithCountry}</Column>
              </Row>
              <Row className="py-1">
                <Column>
                  Nationality Country: {userPersonalInfo.nationalityCountry}
                </Column>
              </Row>

              <Hr />

              <Row className="py-1">
                <Column>
                  Currently In US:{" "}
                  {userPersonalInfo.currentlyInUS ? "Yes" : "No"}
                </Column>
              </Row>
              <Row className="py-1">
                <Column>
                  Ever Been To US:{" "}
                  {userPersonalInfo.everBeenToUS ? "Yes" : "No"}
                </Column>
              </Row>
              <Row className="py-1">
                <Column>
                  Ever Applied For Green Card:{" "}
                  {userPersonalInfo.everAppliedForGreenCard ? "Yes" : "No"}
                </Column>
              </Row>
              <Row className="py-1">
                <Column>
                  Add Family Members:{" "}
                  {userPersonalInfo.addFamilyMembers ? "Yes" : "No"}
                </Column>
              </Row>
              <Row className="py-1">
                <Column>
                  Current Employer In US:{" "}
                  {userPersonalInfo.currentEmployerInUS ? "Yes" : "No"}
                </Column>
              </Row>
              <Row className="py-1">
                <Column>
                  Current Visa: {userPersonalInfo.currentVisa.toUpperCase()}
                </Column>
              </Row>
              <Row className="py-1">
                <Column>
                  Interested In: {userPersonalInfo.interestedIn.toUpperCase()}
                </Column>
              </Row>
              <Row className="py-1">
                <Column>
                  Is a Student: {userPersonalInfo.isStudent ? "Yes" : "No"}
                </Column>
              </Row>
              <Row className="py-1">
                <Column>
                  Graduation Year: {userPersonalInfo.graduationYear}
                </Column>
              </Row>
              <Row className="py-1">
                <Column>Current Role: {userPersonalInfo.currentRole}</Column>
              </Row>
              <Row className="py-1">
                <Column>Industry Type: {userPersonalInfo.industryType}</Column>
              </Row>
              <Row className="py-1">
                <Column>
                  Priority Date If Any:{" "}
                  {!!userPersonalInfo.priorityDateIfAny
                    ? userPersonalInfo.priorityDateIfAny.slice(1, 10)
                    : "N/A"}
                </Column>
              </Row>
              <Row className="py-1">
                <Column>
                  Field Expert In: {userPersonalInfo.fieldExpertIn}
                </Column>
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

export default OnboardingEmail;

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