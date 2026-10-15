import React from "react";
import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { CVFormData } from "../context/CVFormContext";
import { PARTNERS } from "../config/partners";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    backgroundColor: "#ffffff",
    color: "#0A1931",
    height: "100%",
    position: "relative",
  },
  stampHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7.5,
    color: "#555555",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    paddingBottom: 4,
  },
  // Partner Header Banners
  headerBanner: {
    backgroundColor: "#0A1931",
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#88C057",
    fontSize: 14,
    fontWeight: "bold",
  },
  headerArabic: {
    color: "#ffffff",
    fontSize: 12,
  },
  pillHeader: {
    backgroundColor: "#88C057",
    color: "#0A1931",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontWeight: "bold",
    fontSize: 8,
    marginBottom: 4,
    marginTop: 6,
    width: "65%",
  },
  twoColumnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftColumn: {
    width: "57%",
  },
  rightColumn: {
    width: "40%",
    alignItems: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 3.5,
  },
  labelCell: {
    width: "45%",
    fontWeight: "bold",
    color: "#1f2937",
    fontSize: 8,
  },
  valueCell: {
    width: "55%",
    color: "#111827",
    fontSize: 8,
  },
  // Photo Frame
  photoBox: {
    width: 200,
    height: 380,
    borderWidth: 3,
    borderColor: "#88C057",
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    marginTop: 10,
  },
  passportSectionBox: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#0A1931",
    borderRadius: 4,
    padding: 6,
  },
  footerBox: {
    position: "absolute",
    bottom: 15,
    left: 20,
    right: 20,
    backgroundColor: "#0A1931",
    padding: 6,
    textAlign: "center",
    color: "#ffffff",
    fontSize: 7.5,
    borderRadius: 3,
  },
  // Page 2 Attachments
  attachmentContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "90%",
  },
  attachmentBox: {
    width: "100%",
    height: 350,
    borderWidth: 1.5,
    borderColor: "#0A1931",
    borderRadius: 6,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
  },
});

export function buildNativeCVDocument(formData: CVFormData) {
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
      {/* PAGE 1: CANDIDATE APPLICATION & PHOTO */}
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.stampHeader}>
          <Text>Date: {timeStamp}</Text>
          <Text>Serial No: {serialNo}</Text>
        </View>

        <View style={styles.headerBanner}>
          <Text style={styles.headerTitle}>{partner.name}</Text>
          <Text style={styles.headerArabic}>{partner.arabicName}</Text>
        </View>

        <View style={styles.twoColumnContainer}>
          {/* Left Column: Data Tables */}
          <View style={styles.leftColumn}>
            <Text style={styles.pillHeader}>Details of Application / تفاصيل التطبيق</Text>
            
            <View style={styles.tableRow}><Text style={styles.labelCell}>Full Name:</Text><Text style={styles.valueCell}>{formData.fullName || "N/A"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Nationality / الجنسية:</Text><Text style={styles.valueCell}>{formData.nationality || "Ethiopia"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Religion / الديانة:</Text><Text style={styles.valueCell}>{formData.religion || "N/A"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Place of Birth / مكان الميلاد:</Text><Text style={styles.valueCell}>{formData.placeOfBirth || formData.livingTown || "N/A"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Date of Birth / تاريخ الميلاد:</Text><Text style={styles.valueCell}>{formData.dateOfBirth || "N/A"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Age / العمر:</Text><Text style={styles.valueCell}>{formData.age ? formData.age + " Yrs" : "N/A"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Living Town / مكان السكن:</Text><Text style={styles.valueCell}>{formData.livingTown || "N/A"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Marital Status / الحالة الاجتماعية:</Text><Text style={styles.valueCell}>{formData.maritalStatus || "Single"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>No. of Children / عدد الأطفال:</Text><Text style={styles.valueCell}>{formData.numberOfChildren || "0"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Phone No. / رقم جوال:</Text><Text style={styles.valueCell}>{formData.phoneNo || "N/A"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Mother's Name / اسم الأم:</Text><Text style={styles.valueCell}>{formData.mothersName || "N/A"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Height / الطول:</Text><Text style={styles.valueCell}>{formData.height ? formData.height + " cm" : "N/A"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Weight / الوزن:</Text><Text style={styles.valueCell}>{formData.weight ? formData.weight + " kg" : "N/A"}</Text></View>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Educational / المستوي التعليمي:</Text><Text style={styles.valueCell}>{formData.educationalQualification || "Primary"}</Text></View>

            <Text style={styles.pillHeader}>Previous Experience / الخبرة السابقة</Text>
            <View style={styles.tableRow}><Text style={styles.labelCell}>Countries / Period:</Text><Text style={styles.valueCell}>{expText}</Text></View>

            <View style={styles.passportSectionBox}>
              <Text style={{ fontSize: 8, fontWeight: "bold", color: "#0A1931", marginBottom: 3 }}>Passport Details / تفاصيل جواز السفر</Text>
              <View style={styles.tableRow}><Text style={styles.labelCell}>Number:</Text><Text style={styles.valueCell}>{formData.passportNumber || "N/A"}</Text></View>
              <View style={styles.tableRow}><Text style={styles.labelCell}>Issue Date / Place:</Text><Text style={styles.valueCell}>{(formData.passportDateOfIssue || "N/A") + " / " + (formData.passportPlaceOfIssue || "Addis Ababa")}</Text></View>
              <View style={styles.tableRow}><Text style={styles.labelCell}>Expiry Date:</Text><Text style={styles.valueCell}>{formData.passportDateOfExpiry || "N/A"}</Text></View>
            </View>
          </View>

          {/* Right Column: Candidate Photo Frame */}
          <View style={styles.rightColumn}>
            <View style={styles.photoBox}>
              {formData.fullBodyPhoto ? (
                <Image src={formData.fullBodyPhoto} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : formData.headshotPhoto ? (
                <Image src={formData.headshotPhoto} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <Text style={{ color: "#9ca3af", fontSize: 9 }}>Candidate Photo</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.footerBox}>
          <Text>TESNIM FOREIGN EMPLOYMENT AGENCY | Tel: +251 11 128 0000 / +251 90 828 2828 | tesnimagency2828@gmail.com</Text>
        </View>
      </Page>

      {/* PAGE 2: PASSPORT & MEDICAL SCANS */}
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.stampHeader}>
          <Text>Date: {timeStamp}</Text>
          <Text>Serial No: {serialNo}</Text>
        </View>

        <View style={styles.headerBanner}>
          <Text style={styles.headerTitle}>Document Attachments</Text>
          <Text style={styles.headerArabic}>المرفقات الرسمية</Text>
        </View>

        <View style={styles.attachmentContainer}>
          <View style={styles.attachmentBox}>
            <Text style={{ fontSize: 9, fontWeight: "bold", color: "#0A1931", marginBottom: 6 }}>PASSPORT COPY / نسخة جواز السفر</Text>
            {formData.passportScan ? (
              <Image src={formData.passportScan} style={{ width: "100%", height: "90%", objectFit: "contain" }} />
            ) : (
              <Text style={{ color: "#9ca3af", fontSize: 9 }}>No passport scan attached</Text>
            )}
          </View>

          <View style={styles.attachmentBox}>
            <Text style={{ fontSize: 9, fontWeight: "bold", color: "#0A1931", marginBottom: 6 }}>MEDICAL EXAMINATION / التقرير الطبي</Text>
            {formData.medicalScan ? (
              <Image src={formData.medicalScan} style={{ width: "100%", height: "90%", objectFit: "contain" }} />
            ) : (
              <Text style={{ color: "#9ca3af", fontSize: 9 }}>No medical scan attached</Text>
            )}
          </View>
        </View>

        <View style={styles.footerBox}>
          <Text>TESNIM FOREIGN EMPLOYMENT AGENCY | Tel: +251 11 128 0000 / +251 90 828 2828</Text>
        </View>
      </Page>
    </Document>
  );
}