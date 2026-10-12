import React from "react";
import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { CVFormData } from "../context/CVFormContext";
import { PARTNERS } from "../config/partners";

const styles = StyleSheet.create({
  page: {
    padding: 18,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    backgroundColor: "#ffffff",
  },
  stampHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    color: "#555555",
    marginBottom: 6,
  },
  // Al-Andalus Header
  alAndalusHeader: {
    backgroundColor: "#0A1931",
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  alAndalusHeaderTitle: {
    color: "#88C057",
    fontSize: 14,
    fontWeight: "bold",
  },
  alAndalusHeaderSub: {
    color: "#ffffff",
    fontSize: 9,
  },
  pillHeader: {
    backgroundColor: "#88C057",
    color: "#0A1931",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontWeight: "bold",
    fontSize: 8.5,
    marginBottom: 4,
    width: "70%",
  },
  twoColumnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  leftColumn: {
    width: "56%",
  },
  rightColumn: {
    width: "42%",
    alignItems: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    paddingVertical: 3,
  },
  labelCell: {
    width: "40%",
    fontWeight: "bold",
    color: "#222222",
  },
  valueCell: {
    width: "60%",
    color: "#000000",
  },
  photoBoxPill: {
    width: 210,
    height: 420,
    borderWidth: 3,
    borderColor: "#88C057",
    borderRadius: 24,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7faf5",
  },
  footerBox: {
    backgroundColor: "#0A1931",
    padding: 6,
    textAlign: "center",
    color: "#ffffff",
    fontSize: 7.5,
    marginTop: 10,
  },
  // Attachment Slots
  attachmentBox: {
    width: "100%",
    height: 340,
    borderWidth: 1,
    borderColor: "#0A1931",
    borderRadius: 4,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});

export function buildCVFormView(formData: CVFormData) {
  const partnerKey = formData.selectedPartner || "al_andalus";
  const partner = PARTNERS[partnerKey] || PARTNERS.al_andalus;

  const now = new Date();
  const timeStamp = now.toISOString().replace("T", " ").substring(0, 16);
  const serialNo = "CV-" + now.getFullYear() + String(now.getMonth() + 1).padStart(2, "0") + String(now.getDate()).padStart(2, "0") + "-001";

  const experiences = formData.previousExperiences || [];
  const expText = experiences.length > 0
    ? experiences.map((e) => e.country + " (" + e.years + "Y " + (e.months !== "0" ? e.months + "M" : "") + ")").join(" • ")
    : "None";

  return (
    <Document>
      {/* PAGE 1: DETAILS & PROFILE PHOTO */}
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.stampHeader}>
          <Text>Date: {timeStamp}</Text>
          <Text>Serial No: {serialNo}</Text>
        </View>

        <View style={styles.alAndalusHeader}>
          <Text style={styles.alAndalusHeaderTitle}>{partner.name}</Text>
          <Text style={styles.alAndalusHeaderSub}>{partner.arabicName}</Text>
        </View>

        <View style={styles.twoColumnContainer}>
          <View style={styles.leftColumn}>
            <Text style={styles.pillHeader}>Details of Application</Text>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Full Name:</Text><Text style={styles.valueCell}>{formData.fullName || "N/A"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Nationality:</Text><Text style={styles.valueCell}>{formData.nationality || "Ethiopia"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Religion:</Text><Text style={styles.valueCell}>{formData.religion || "N/A"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Place of Birth:</Text><Text style={styles.valueCell}>{formData.placeOfBirth || formData.livingTown || "N/A"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Date of Birth / Age:</Text><Text style={styles.valueCell}>{(formData.dateOfBirth || "N/A") + " (" + (formData.age || "N/A") + " Yrs)"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Living Town:</Text><Text style={styles.valueCell}>{formData.livingTown || "N/A"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Marital Status / Children:</Text><Text style={styles.valueCell}>{(formData.maritalStatus || "Single") + " (" + (formData.numberOfChildren || "0") + ")"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Mother Name:</Text><Text style={styles.valueCell}>{formData.mothersName || "N/A"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Height / Weight:</Text><Text style={styles.valueCell}>{(formData.height ? formData.height + " cm" : "N/A") + " / " + (formData.weight ? formData.weight + " kg" : "N/A")}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Education:</Text><Text style={styles.valueCell}>{formData.educationalQualification || "Primary Education"}</Text></View>

            <Text style={[styles.pillHeader, { marginTop: 8 }]}>Previous Experience</Text>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Arab Countries:</Text><Text style={styles.valueCell}>{expText}</Text></View>

            <Text style={[styles.pillHeader, { marginTop: 8 }]}>Passport Details</Text>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Number:</Text><Text style={styles.valueCell}>{formData.passportNumber || "N/A"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Issue Date / Place:</Text><Text style={styles.valueCell}>{(formData.passportDateOfIssue || "N/A") + " / " + (formData.passportPlaceOfIssue || "Addis Ababa")}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Expiry Date:</Text><Text style={styles.valueCell}>{formData.passportDateOfExpiry || "N/A"}</Text></View>
          </View>

          <View style={styles.rightColumn}>
            <View style={styles.photoBoxPill}>
              {formData.fullBodyPhoto ? (
                <Image src={formData.fullBodyPhoto} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : formData.headshotPhoto ? (
                <Image src={formData.headshotPhoto} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <Text style={{ color: "#888888" }}>Full Candidate Photo</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.footerBox}>
          <Text>TESNIM FOREIGN EMPLOYMENT AGENCY | Tel: +251 90 828 2828 | tesnimagency2828@gmail.com</Text>
        </View>
      </Page>

      {/* PAGE 2: PASSPORT AND MEDICAL ATTACHMENTS (STRICT 2 PAGES) */}
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.stampHeader}>
          <Text>Date: {timeStamp}</Text>
          <Text>Serial No: {serialNo}</Text>
        </View>

        <Text style={styles.pillHeader}>Attachments / المرفقات</Text>

        {formData.passportScan ? (
          <View style={styles.attachmentBox}>
            <Text style={{ fontSize: 8, fontWeight: "bold", color: "#0A1931", marginBottom: 4 }}>PASSPORT COPY</Text>
            <Image src={formData.passportScan} style={{ width: "95%", height: "90%", objectFit: "contain" }} />
          </View>
        ) : null}

        {formData.medicalScan ? (
          <View style={styles.attachmentBox}>
            <Text style={{ fontSize: 8, fontWeight: "bold", color: "#0A1931", marginBottom: 4 }}>MEDICAL ATTACHMENT</Text>
            <Image src={formData.medicalScan} style={{ width: "95%", height: "90%", objectFit: "contain" }} />
          </View>
        ) : null}
      </Page>
    </Document>
  );
}