import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  primary: "#FF69B4",
  secondary: "#4ECDC4",
  dark: "#2D3436",
  gray: "#F7F9FC",
  white: "#FFFFFF",
};

export default function BmrScreen() {
  // สร้าง State เพื่อ handle ข้อมูลต่างๆ บนหน้าจอ
  // **** อย่าลืมไปผูก State กับ Component หรือจุดที่ต้องใช้ State นั้นๆ ****
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [bmr, setBmr] = useState(0);

  // ฟังก์ชันการกดปุ่มคำนวณหาค่า BMR
  const handleCalBMRClick = () => {
    // Validate UI
    if (!height || !weight || !age) {
      Alert.alert("แจ้งเตือน", "!...กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    // คำนวณ BMR
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    let bmrValue = 0;
    // คำนวณ bmr โดยต้องมีการพิสูจน์เพศ เพราะสูตรมันต่างกัน
    if (gender === "male") {
      bmrValue = 66 + 13.7 * w + 5 * h - 6.8 * a;
    } else {
      bmrValue = 655 + 9.6 * w + 1.8 * h - 4.7 * a;
    }

    // กำหนดค่าให้กับ State (bmr) เพื่อแสดงผลบนหน้าจอ
    setBmr(bmrValue);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.headerContainer}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg",
            }}
            style={styles.headerImage}
            resizeMode="cover"
          />
          {/* <View style={styles.headerOverlay} /> */}
          <Text style={styles.headerTitle}>BMR Calculator</Text>
          <Text style={styles.headerSubtitle}>
            อัตราการเผาผลาญพลังงานขั้นพื้นฐานของร่างกาย
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>เพศ (Gender)</Text>
          <View style={styles.genderContainer}>
            {/* ปุ่มเพศชาย */}
            <TouchableOpacity
              onPress={() => setGender("male")}
              style={[
                styles.genderCard,
                gender === "male" && styles.selectedCard,
              ]}
            >
              <Image
                source={require("@/assets/images/male.png")}
                style={styles.genderIcon}
              />
              <Text style={[styles.genderText]}>ชาย</Text>
            </TouchableOpacity>

            {/* ปุ่มเพศหญิง */}
            <TouchableOpacity
              onPress={() => setGender("female")}
              style={[
                styles.genderCard,
                gender === "female" && styles.selectedCard,
              ]}
            >
              <Image
                source={require("@/assets/images/female.png")}
                style={styles.genderIcon}
              />
              <Text style={[styles.genderText]}>หญิง</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            {/* ช่องป้อนน้ำหนัก */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>น้ำหนัก (kg)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="เช่น 60"
                value={weight}
                onChangeText={setWeight}
              />
            </View>

            {/* ช่องป้อนส่วนสูง */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>ส่วนสูง (cm)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="เช่น 170"
                value={height}
                onChangeText={setHeight}
              />
            </View>
          </View>

          {/* ช่องป้อนอายุ */}
          <View style={styles.fullInputGroup}>
            <Text style={styles.label}>อายุ (ปี)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="เช่น 25"
              value={age}
              onChangeText={setAge}
            />
          </View>

          {/* ชปุ่มคำนวณค่า BMR */}
          <TouchableOpacity
            onPress={handleCalBMRClick}
            style={styles.calculateBtn}
          >
            <Text style={styles.btnText}>คำนวณหาค่า BMR</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.title}>BMR ของคุณคือ</Text>
            <Text style={styles.bmrValue}>{bmr.toFixed(2)}</Text>
            <Text style={styles.unit}>แคลอรี่ / วัน</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray },
  headerContainer: { height: 200, position: "relative", marginBottom: 20 },
  headerImage: { width: "100%", height: "100%" },
  headerTitle: {
    position: "absolute",
    bottom: 40,
    left: 20,
    fontFamily: "Kanit_700Bold",
    fontSize: 32,
    color: COLORS.white,
  },
  headerSubtitle: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontFamily: "Kanit_400Regular",
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
  },
  content: { paddingHorizontal: 20 },
  label: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 16,
    color: COLORS.dark,
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genderCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderColor: COLORS.primary,
    backgroundColor: "#FFF5F5",
  },
  genderIcon: { width: 50, height: 50, marginBottom: 8 },
  genderText: {
    fontFamily: "Kanit_400Regular",
    fontSize: 16,
    color: COLORS.dark,
  },
  selectedText: { color: COLORS.primary, fontFamily: "Kanit_600SemiBold" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  inputGroup: { width: "48%" },
  fullInputGroup: { marginBottom: 30 },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    fontSize: 18,
    fontFamily: "Kanit_400Regular",
    color: COLORS.dark,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  calculateBtn: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  btnText: { fontFamily: "Kanit_700Bold", fontSize: 18, color: COLORS.white },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    marginTop: 25,
  },
  imageContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#FFF5F5",
    borderRadius: 100,
  },
  resultImage: {
    width: 80,
    height: 80,
  },
  title: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 20,
    color: "#2D3436",
  },
  bmrValue: {
    fontFamily: "Kanit_700Bold",
    fontSize: 56,
    color: "#FF69B4",
    lineHeight: 65,
  },
  unit: {
    fontFamily: "Kanit_400Regular",
    fontSize: 18,
    color: "#A0AEC0",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#EDF2F7",
    marginVertical: 15,
  },
  description: {
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
    color: "#718096",
    textAlign: "center",
    lineHeight: 20,
  },
  backBtn: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FF6B6B",
  },
  backBtnText: {
    fontFamily: "Kanit_600SemiBold",
    color: "#FF6B6B",
    fontSize: 16,
  },
});
