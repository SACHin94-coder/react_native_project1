import { COLORS } from "@/asset/color"; // Ensure COLORS.white and COLORS.black exist here
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router"; // Use router for Expo navigation

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate a small delay for "Trust" feedback
    setTimeout(() => {
      setIsLoading(false);
      router.replace("./(tabs)/Home"); // Moves to the home tab
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Top Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://media.licdn.com/dms/image/v2/C510BAQE7ypo_hqddKg/company-logo_200_200/company-logo_200_200/0/1630577195237/government_college_of_engineering_nagpur_logo?e=2147483647&v=beta&t=HIMosgMzDtEb3A1gmtT3ucGA9CFON9OsxngbmzAPxvE' }}
          style={styles.logoImage}
        />
      </View>

      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>
          Welcome to the{"\n"}
          <Text style={styles.brandText}>GCOEN NEWS</Text>
        </Text>
        <Text style={styles.subText}>
          Stay updated with the latest campus alerts, events, and academic news.
        </Text>
      </View>

      {/* Custom Button Section */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Get Started</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Clean light gray background
    paddingHorizontal: 30,
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    borderRadius: 90, // Circular look
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 22,
    color: '#333',
    lineHeight: 30,
  },
  brandText: {
    color: "#4E54C8", // Your primary blue
    fontWeight: "900",
    fontSize: 38,
  },
  subText: {
    textAlign: "center",
    color: "#666",
    marginTop: 15,
    fontSize: 15,
    lineHeight: 22,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "#4E54C8",
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#4E54C8",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: 'bold',
  }
});