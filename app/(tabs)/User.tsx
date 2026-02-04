import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const User = () => {
    // Mock Data from your JSON structure
    const userData = {
        name: "Sachin Sahani",
        rollNo: "22CSE045",
        sem: "6th",
        branch: "CSE",
        sgpa: [8.5, 8.2, 9.0, 7.8, 8.4],
        cgpa: 8.38
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header Background */}
            <View style={styles.headerBG}>
                <View style={styles.profileImageWrapper}>
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
                        style={styles.profileImage}
                    />
                </View>
                <Text style={styles.userName}>{userData.name}</Text>
                <Text style={styles.userBranch}>{userData.branch} | {userData.sem} Sem</Text>
            </View>

            {/* Academic Details Section */}
            <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>Academic Details</Text>

                <View style={styles.infoCard}>
                    <InfoRow icon="id-card-outline" label="Roll No" value={userData.rollNo} />
                    <InfoRow icon="school-outline" label="Branch" value={userData.branch} />
                    <InfoRow icon="layers-outline" label="Semester" value={userData.sem} />
                </View>

                {/* Performance Section */}
                <Text style={styles.sectionTitle}>Performance</Text>
                <View style={styles.performanceCard}>
                    <View style={styles.cgpaCircle}>
                        <Text style={styles.cgpaLabel}>CGPA</Text>
                        <Text style={styles.cgpaValue}>{userData.cgpa}</Text>
                    </View>

                    <View style={styles.sgpaList}>
                        {userData.sgpa.map((val, index) => (
                            <View key={index} style={styles.sgpaItem}>
                                <Text style={styles.sgpaText}>Sem {index + 1}</Text>
                                <Text style={styles.sgpaScore}>{val}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            {/* QR Code Section */}
            <View style={styles.qrSection}>
                <Text style={styles.sectionTitle}>Student Digital ID</Text>
                <View style={styles.qrContainer}>
                    {/* Placeholder for QR Code */}
                    <Ionicons name="qr-code-outline" size={150} color="#333" />
                    <Text style={styles.qrSubText}>Scan for Verification</Text>
                </View>
            </View>

            <View style={{ height: 50 }} />
        </ScrollView>
    );
};

// Helper Component for the list rows
const InfoRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
        <View style={styles.iconBox}>
            <Ionicons name={icon} size={20} color="#4E54C8" />
        </View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F0F2F5' },
    headerBG: {
        backgroundColor: '#141633',
        height: 280,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    profileImageWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#fff',
        padding: 5,
        elevation: 10,
    },
    profileImage: { width: '100%', height: '100%', borderRadius: 60 },
    userName: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginTop: 15 },
    userBranch: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 5 },

    detailsSection: { padding: 20 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#444', marginBottom: 10, marginTop: 10 },

    infoCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 15, elevation: 3 },
    infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#EEE' },
    iconBox: { width: 35, height: 35, borderRadius: 10, backgroundColor: '#F0F2FF', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    infoLabel: { flex: 1, fontSize: 14, color: '#666' },
    infoValue: { fontSize: 15, fontWeight: '700', color: '#333' },

    performanceCard: {
        backgroundColor: '#FFF', borderRadius: 20, padding: 20, elevation: 3,
        flexDirection: 'row', alignItems: 'center'
    },
    cgpaCircle: {
        width: 90, height: 90, borderRadius: 45, borderWidth: 6, borderColor: '#4E54C8',
        justifyContent: 'center', alignItems: 'center', marginRight: 20
    },
    cgpaLabel: { fontSize: 10, color: '#666' },
    cgpaValue: { fontSize: 22, fontWeight: 'bold', color: '#4E54C8' },
    sgpaList: { flex: 1 },
    sgpaItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    sgpaText: { fontSize: 12, color: '#777' },
    sgpaScore: { fontSize: 12, fontWeight: 'bold', color: '#333' },

    qrSection: { alignItems: 'center', marginBottom: 30 },
    qrContainer: {
        backgroundColor: '#FFF', padding: 20, borderRadius: 25,
        elevation: 5, alignItems: 'center', width: width * 0.7
    },
    qrSubText: { marginTop: 10, color: '#888', fontSize: 12, fontWeight: '600' }
});

export default User