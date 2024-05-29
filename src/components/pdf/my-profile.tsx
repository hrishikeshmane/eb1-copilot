import {
  type ISelectTickets,
  type ISelectUserVisaPillarDetails,
} from "@/server/db/schema";
import { VISA_PILLARS_EX_LIST, visaPillars } from "@/lib/constants";
import {
  Document,
  Page,
  Font,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";

type MyProfilePDFProps = {
  userPillars: ISelectUserVisaPillarDetails[];
  completedTickets: ISelectTickets[];
};

const MyProfilePDF = ({ userPillars, completedTickets }: MyProfilePDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.header} fixed>
          Greencard.inc
        </Text>
        <Text style={styles.title}>Hrishikesh Mane</Text>

        {VISA_PILLARS_EX_LIST.map((pillar) => {
          const pillarDetails = userPillars.filter((p) => p.pillar === pillar);
          const completedTicketsForPillar = completedTickets.filter((t) =>
            t.pillars.includes(pillar),
          );
          if (
            (pillarDetails === undefined || pillarDetails.length < 1) &&
            (completedTicketsForPillar === undefined ||
              completedTicketsForPillar.length < 1)
          ) {
            return null;
          }
          return (
            <View key={pillar} style={styles.section}>
              <Text style={styles.subtitle}>
                {visaPillars.filter((p) => p.value == pillar).at(0)?.label}
              </Text>
              {pillarDetails.map((card) => {
                return (
                  <View style={styles.section} key={card.id}>
                    <Text style={styles.textTitle}>{card.title}</Text>
                    <Text style={styles.text}>{card.detail}</Text>
                  </View>
                );
              })}
              {completedTicketsForPillar.map((ticket) => {
                return (
                  <View style={styles.subsection} key={ticket.ticketId}>
                    <Text style={styles.textTitle}>{ticket.title}</Text>
                    <Text style={styles.text}>{ticket.description}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </Page>
    </Document>
  );
};

export default MyProfilePDF;

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0xCHy5XgqoUPvi5.ttf",
      fontStyle: "italic",
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf",
      fontWeight: 800,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
      fontWeight: 700,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
      fontWeight: 600,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
      fontWeight: 500,
    },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  header: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "right",
    borderBottom: 1,
    borderBottomWidth: 1.5,
    borderColor: "#D9F522",
    fontFamily: "Inter",
    fontWeight: 400,
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 6,
    // margin: 12,
    fontFamily: "Inter",
    // fontWeight: 400,
  },
  title: {
    fontSize: 28,
    marginBottom: 14,
    textAlign: "left",
    fontFamily: "Inter",
    fontWeight: 600,
  },
  textTitle: {
    marginVertical: 12,
    fontSize: 12,
    textAlign: "justify",
    fontFamily: "Inter",
    fontWeight: 500,
  },
  text: {
    marginVertical: 8,
    fontSize: 12,
    textAlign: "justify",
    fontFamily: "Inter",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  section: {
    marginVertical: 12,
  },
  subsection: {
    marginVertical: 6,
  },
});
