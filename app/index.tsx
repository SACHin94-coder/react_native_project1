import React, { useState, useEffect, useRef, use } from 'react';
import {
  Text, View, StyleSheet, Image, TouchableOpacity,
  ActivityIndicator, TextInput, Animated, Alert
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "@/asset/color";
import users from '@/data/userData';

// Mock User Data (Usually this comes from an external file)


export default function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Animation: Fade in effect
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Check if user exists in our array
      const userExists = users.find(
        (u) => u.username === username && u.password === password
      );

      if (userExists) {
        router.replace("./(tabs)/home"); // Success path
      } else {
        Alert.alert(
          "Access Denied",
          "Incorrect username or password.",
          [
            { text: "Try Again" },
            { text: "Sign Up", onPress: () => router.push("./(Auth)/signIn") }
          ]
        );
      }
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://media.licdn.com/dms/image/v2/C510BAQE7ypo_hqddKg/company-logo_200_200/company-logo_200_200/0/1630577195237/government_college_of_engineering_nagpur_logo?e=2147483647&v=beta&t=HIMosgMzDtEb3A1gmtT3ucGA9CFON9OsxngbmzAPxvE' }}
          style={styles.logoImage}
        />
      </View>

      <Animated.View style={[styles.loginBox, { opacity: fadeAnim }]}>
        <Text style={styles.loginTitle}>Campus Login</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry // Hides characters
          />
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("./(Auth)/signIn")}>
          <Text style={styles.signUpLink}>New here? Create an account</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    padding: 20,
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  loginBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4E54C8',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputWrapper: {
    marginBottom: 15
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: '600'
  },
  input: {
    backgroundColor: '#F8F9FA',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E1E4E8'
  },
  primaryButton: {
    backgroundColor: "#4E54C8",
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: '700'
  },
  signUpLink: {
    textAlign: 'center',
    marginTop: 20,
    color: '#4E54C8',
    fontWeight: '600'
  }
});