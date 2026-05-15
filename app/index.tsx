import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  // ใช้ useEffect เพื่อหน่วงเวลาหน้าจอ 3 วินาทีแล้วเปลี่ยนหน้า /bmi
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/bmr");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // ขนาดของรูปภาพหลัก
  const IMAGE_SIZE = 120;

  return (
    <View style={styles.container}>
      {/* Container สำหรับจัดกลุ่ม รูป + เงา ให้อยู่ตรงกลาง */}
      <View style={styles.centerContainer}>
        {/* --- ส่วนของเงา 4 ชั้น (Render ก่อน เพื่อให้อยู่ด้านหลังรูป) --- */}

        {/* ชั้นที่ 4: นอกสุด (จางสุด) */}
        <View
          style={[
            styles.shadowLayer,
            { width: IMAGE_SIZE * 2.2, height: IMAGE_SIZE * 2.2, opacity: 0.1 },
          ]}
        />

        {/* ชั้นที่ 3 */}
        <View
          style={[
            styles.shadowLayer,
            { width: IMAGE_SIZE * 1.8, height: IMAGE_SIZE * 1.8, opacity: 0.2 },
          ]}
        />

        {/* ชั้นที่ 2 */}
        <View
          style={[
            styles.shadowLayer,
            { width: IMAGE_SIZE * 1.4, height: IMAGE_SIZE * 1.4, opacity: 0.3 },
          ]}
        />

        {/* ชั้นที่ 1: ในสุด (เข้มสุด ติดกับรูป) */}
        <View
          style={[
            styles.shadowLayer,
            { width: IMAGE_SIZE * 1.1, height: IMAGE_SIZE * 1.1, opacity: 0.5 },
          ]}
        />

        {/* --- รูปภาพหลัก (อยู่บนสุด) --- */}
        <Image
          // เปลี่ยน URL รูปภาพตรงนี้ตามต้องการ
          source={{
            uri: "https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg",
          }}
          style={{
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            borderRadius: IMAGE_SIZE / 2,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 120,
          color: "#FF69B4",
          shadowColor: "#000000",
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        BMR Calculatore
      </Text>

      <ActivityIndicator
        size="large"
        color="#ffe5f2"
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFC0CB", // สีชมพู (Pink) หรือใช้ #FF69B4 (HotPink) ก็ได้
    alignItems: "center",
    justifyContent: "center",
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative", // เพื่อให้ลูกๆ ใช้ absolute positioning เทียบกับจุดนี้ได้ง่าย (ถ้าต้องการ)
  },
  shadowLayer: {
    position: "absolute", // ซ้อนทับกัน
    backgroundColor: "white",
    borderRadius: 999, // ทำเป็นวงกลม
    // ไม่ต้องกำหนด top/left เพราะ Parent ใช้ alignItems: center, justifyContent: center แล้ว
    // View ที่เป็น absolute จะถูกดึงมาตรงกลางโดยอัตโนมัติถ้าไม่ได้ระบุ position
  },
});
