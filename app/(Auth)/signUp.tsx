import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    ScrollView, ActivityIndicator, Alert, Platform
} from 'react-native';
import { useRouter } from "expo-router";
import { Picker } from '@react-native-picker/picker'; // Corrected Package
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import users from '@/data/userData';

// Dummy database for real-time check
const TAKEN_USERNAMES = ["sachin", "admin", "gcoen_dev", "root"];

export default function SignupScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    // 1. The Master Object
    const [userObject, setUserObject] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        branch: "CSE",
        year: "1",
        graduationDate: new Date(),
        password: "",
        confirmPassword: ""
    });

    // 2. Validation Status
    const [usernameStatus, setUsernameStatus] = useState('none'); // none, taken, available

    // 3. Bulletproof Username Check
    const checkUsername = (text: string) => {
        if (typeof text !== 'string') return; // Prevents the 'toLowerCase' error

        const val = text.toLowerCase().trim();


        // Update the object using functional state to ensure data integrity
        setUserObject(prev => ({ ...prev, username: val }));


        if (val.length > 2) {
            if (TAKEN_USERNAMES.includes(val)) {
                setUsernameStatus('taken');
            } else {
                setUsernameStatus('available');
            }
        } else {
            setUsernameStatus('none');
        }
    };

    const handleRegister = () => {
        const { password, confirmPassword, username, firstName } = userObject;

        if (usernameStatus !== 'available') {
            Alert.alert("Username Issue", "Please choose a unique username.");
            return;
        }
        if (!firstName || !password) {
            Alert.alert("Missing Info", "Please fill in all required fields.");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Password Error", "Passwords do not match.");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            console.log("FINAL USER OBJECT SAVED:", userObject);
            Alert.alert("Welcome!", `Account created for ${username}`);
            users.push(userObject);
            router.replace("./(tabs)Home");
        }, 2000);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.header}>GCOEN Registration</Text>

            {/* --- Username Section with Red/Green Feedback --- */}
            <Text style={styles.label}>Create Username</Text>
            <View style={[
                styles.inputBox,
                usernameStatus === 'taken' && styles.borderRed,
                usernameStatus === 'available' && styles.borderGreen
            ]}>
                <TextInput
                    style={styles.flexInput}
                    placeholder="e.g. sachin_94"
                    value={userObject.username}
                    onChangeText={checkUsername} // Passes string correctly
                    autoCapitalize="none"
                />
                {usernameStatus === 'available' && <Ionicons name="checkmark-circle" size={22} color="green" />}
                {usernameStatus === 'taken' && <Ionicons name="close-circle" size={22} color="red" />}
            </View>
            {usernameStatus === 'taken' && <Text style={styles.errorMsg}>This username is already taken!</Text>}
            {usernameStatus === 'available' && <Text style={styles.successMsg}>Username looks great!</Text>}

            {/* --- Names Row --- */}
            <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={(v) => setUserObject(p => ({ ...p, firstName: v }))}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={(v) => setUserObject(p => ({ ...p, lastName: v }))}
                    />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={(v) => setUserObject(p => ({ ...p, lastName: v }))}
                />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.label}>Mobile no.</Text>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={(v) => setUserObject(p => ({ ...p, lastName: v }))}
                />
            </View>

            {/* --- Branch Dropdown --- */}
            <Text style={styles.label}>Your Branch</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={userObject.branch}
                    onValueChange={(v) => setUserObject(p => ({ ...p, branch: v }))}
                    style={styles.picker}
                >
                    <Picker.Item label="Computer Science (CSE)" value="CSE" />
                    <Picker.Item label="Mechanical (ME)" value="ME" />
                    <Picker.Item label="Civil (CE)" value="CE" />
                    <Picker.Item label="Electronics (ETC)" value="ETC" />
                    <Picker.Item label="Electrical (EE)" value="EE" />
                </Picker>
            </View>

            {/* --- Year Dropdown --- */}
            <Text style={styles.label}>Current Academic Year</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={userObject.year}
                    onValueChange={(v) => setUserObject(p => ({ ...p, year: v }))}
                    style={styles.picker}
                >
                    <Picker.Item label="1st Year" value="1" />
                    <Picker.Item label="2nd Year" value="2" />
                    <Picker.Item label="3rd Year" value="3" />
                    <Picker.Item label="4th Year" value="4" />
                </Picker>
            </View>

            {/* --- Graduation Date Picker --- */}
            <Text style={styles.label}>Expected Graduation</Text>
            <TouchableOpacity style={styles.dateSelector} onPress={() => setShowDatePicker(true)}>
                <Text style={styles.dateText}>{userObject.graduationDate.toDateString()}</Text>
                <Ionicons name="calendar" size={20} color="#4E54C8" />
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={userObject.graduationDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, date) => {
                        setShowDatePicker(false);
                        if (date) setUserObject(p => ({ ...p, graduationDate: date }));
                    }}
                />
            )}

            {/* --- Password Fields --- */}
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.inputBox}
                secureTextEntry
                onChangeText={(v) => setUserObject(p => ({ ...p, password: v }))}
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
                style={styles.inputBox}
                secureTextEntry
                onChangeText={(v) => setUserObject(p => ({ ...p, confirmPassword: v }))}
            />

            {/* --- Submit Button --- */}
            <TouchableOpacity
                style={[styles.submitBtn, usernameStatus === 'taken' && { opacity: 0.6 }]}
                onPress={handleRegister}
                disabled={loading || usernameStatus === 'taken'}
            >
                {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>Submit Registration</Text>}
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    content: { padding: 25, paddingBottom: 60 },
    header: { fontSize: 26, fontWeight: '900', color: '#4E54C8', textAlign: 'center', marginVertical: 10 },
    label: { fontSize: 13, fontWeight: '700', color: '#444', marginTop: 15, marginBottom: 5 },
    inputBox: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6',
        height: 55, borderRadius: 12, paddingHorizontal: 15, borderWidth: 1, borderColor: '#D1D5DB'
    },
    flexInput: { flex: 1, height: '100%', fontSize: 16 },
    pickerWrapper: { backgroundColor: '#F3F4F6', borderRadius: 12, borderWidth: 1, borderColor: '#D1D5DB', overflow: 'hidden' },
    picker: { height: 55, width: '100%' },
    row: { flexDirection: 'row' },
    borderRed: { borderColor: '#EF4444', backgroundColor: '#FEF2F2' },
    borderGreen: { borderColor: '#10B981', backgroundColor: '#ECFDF5' },
    errorMsg: { color: '#EF4444', fontSize: 12, marginTop: 4, fontWeight: '600' },
    successMsg: { color: '#10B981', fontSize: 12, marginTop: 4, fontWeight: '600' },
    dateSelector: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        backgroundColor: '#F3F4F6', height: 55, borderRadius: 12, paddingHorizontal: 15, borderWidth: 1, borderColor: '#D1D5DB'
    },
    dateText: { fontSize: 16, color: '#333' },
    submitBtn: {
        backgroundColor: '#4E54C8', height: 60, borderRadius: 16,
        justifyContent: 'center', alignItems: 'center', marginTop: 40,
        elevation: 5, shadowColor: '#4E54C8', shadowOpacity: 0.3, shadowRadius: 10
    },
    btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});