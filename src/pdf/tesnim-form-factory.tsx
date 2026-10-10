import React from "react";
import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { CVFormData } from "../context/CVFormContext";
import { PARTNERS } from "../config/partners";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
    fontSize: 9,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#0A1931",
    paddingBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0A1931",
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    backgroundColor: "#f0f4f8",
    padding: 4,
    marginBottom: 5,
    color: "#0A1931",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    paddingVertical: 3,
  },
  cellLabel: {
    width: "35%",
    fontWeight: "bold",
    color: "#333333",
  },
  cellValue: {
    width: "65%",
    color: "#111111",
  },
});

export function buildCVFormView(formData: CVFormData) {
  const partnerKey = formData.selectedPartner || "al_andalus";
  const partner = PARTNERS[partnerKey] || PARTNERS.al_andalus;
  const skillsObj = formData.skills || {};
  const skillList = Object.keys(skillsObj).filter((k) => skillsObj[k as keyof typeof skillsObj]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{partner.name}</Text>
            <Text>{partner.arabicName}</Text>
          </View>
          {formData.headshotPhoto ? (
            <Image src={formData.headshotPhoto} style={{ width: 60, height: 75 }} />
          ) : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details of Application</Text>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Full Name:</Text>
            <Text style={styles.cellValue}>{formData.fullName || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Mother Name:</Text>
            <Text style={styles.cellValue}>{formData.mothersName || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Phone Number:</Text>
            <Text style={styles.cellValue}>{formData.phoneNo || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Living Town:</Text>
            <Text style={styles.cellValue}>{formData.livingTown || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Nationality / Religion:</Text>
            <Text style={styles.cellValue}>
              {(formData.nationality || "Ethiopia") + " / " + (formData.religion || "N/A")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Date of Birth / Age:</Text>
            <Text style={styles.cellValue}>
              {(formData.dateOfBirth || "N/A") + " (" + (formData.age || "N/A") + " Yrs)"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Place of Birth:</Text>
            <Text style={styles.cellValue}>{formData.placeOfBirth || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Marital Status / Children:</Text>
            <Text style={styles.cellValue}>
              {(formData.maritalStatus || "Single") + " (" + (formData.numberOfChildren || "0") + " Children)"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Weight / Height:</Text>
            <Text style={styles.cellValue}>
              {(formData.weight ? formData.weight + " kg" : "N/A") + " / " + (formData.height ? formData.height + " cm" : "N/A")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Education:</Text>
            <Text style={styles.cellValue}>{formData.educationalQualification || "Primary Education"}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Passport Details</Text>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Passport Number:</Text>
            <Text style={styles.cellValue}>{formData.passportNumber || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Issue Date / Place:</Text>
            <Text style={styles.cellValue}>
              {(formData.passportDateOfIssue || "N/A") + " (" + (formData.passportPlaceOfIssue || "Addis Ababa") + ")"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Expiry Date:</Text>
            <Text style={styles.cellValue}>{formData.passportDateOfExpiry || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills and Languages</Text>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>English / Arabic:</Text>
            <Text style={styles.cellValue}>
              {(formData.englishSkill || "FAIR") + " / " + (formData.arabicSkill || "FAIR")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Job Skills:</Text>
            <Text style={styles.cellValue}>
              {skillList.length > 0 ? skillList.join(", ") : "House Work"}
            </Text>
          </View>
        </View>

        {formData.fullBodyPhoto ? (
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <Text style={styles.sectionTitle}>Full Body Photo</Text>
            <Image src={formData.fullBodyPhoto} style={{ width: 180, height: 260, objectFit: "contain" }} />
          </View>
        ) : null}
      </Page>

      {formData.passportScan ? (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>PASSPORT ATTACHMENT</Text>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Image src={formData.passportScan} style={{ width: 480, height: 320, objectFit: "contain" }} />
          </View>
        </Page>
      ) : null}

      {formData.medicalScan && partner.hasMedicalAttachment ? (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>MEDICAL EXAMINATION ATTACHMENT</Text>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Image src={formData.medicalScan} style={{ width: 480, height: 320, objectFit: "contain" }} />
          </View>
        </Page>
      ) : null}
    </Document>
  );
}