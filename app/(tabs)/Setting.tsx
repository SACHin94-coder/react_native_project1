import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView,
    TouchableOpacity, Switch, TextInput, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Setting = () => {
    // Activity Data (Mock)
    const activityData = {
        awards: ["1st Rank - Hackathon 2025", "Best Student Coordinator"],
        libraryBooks: [
            { id: 1, name: "Modern Physics", dueDate: "12 Feb", status: "Pending" },
            { id: 2, name: "React Native Guide", dueDate: "02 Feb", status: "Overdue" }
        ]
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header Area */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings & Activity</Text>
            </View>

            {/* SECTION 1: Personal Details (Editable) */}
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Basic Details</Text>
                <View style={styles.card}>
                    <EditableItem label="Email" value="sachin.sahani@gcoen.ac.in" icon="mail-outline" />
                    <EditableItem label="Phone" value="+91 9876543210" icon="call-outline" />
                </View>
            </View>

            {/* SECTION 2: Library Activity */}
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Library Status</Text>
                <View style={styles.card}>
                    {activityData.libraryBooks.map((book) => (
                        <View key={book.id} style={styles.activityRow}>
                            <Ionicons name="book-outline" size={20} color="#4E54C8" />
                            <View style={styles.activityInfo}>
                                <Text style={styles.itemTitle}>{book.name}</Text>
                                <Text style={styles.itemSub}>Due: {book.dueDate}</Text>
                            </View>
                            <Text style={[styles.statusTag, book.status === "Overdue" ? styles.red : styles.orange]}>
                                {book.status}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* SECTION 3: Awards & Achievements */}
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Awards & Recognition</Text>
                <View style={styles.card}>
                    {activityData.awards.map((award, i) => (
                        <View key={i} style={styles.activityRow}>
                            <Ionicons name="trophy-outline" size={20} color="#FFD700" />
                            <Text style={[styles.itemTitle, { marginLeft: 15 }]}>{award}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* SECTION 4: Account Actions */}
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Account</Text>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.actionRow} onPress={() => Alert.alert("Privacy Policy coming soon")}>
                        <Ionicons name="shield-checkmark-outline" size={22} color="#666" />
                        <Text style={styles.actionText}>Privacy & Security</Text>
                        <Ionicons name="chevron-forward" size={18} color="#CCC" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionRow, { borderBottomWidth: 0 }]}
                        onPress={() => Alert.alert("Logout", "Are you sure?", [{ text: "Cancel" }, { text: "Logout", style: "destructive" }])}
                    >
                        <Ionicons name="log-out-outline" size={22} color="#FF4D4D" />
                        <Text style={[styles.actionText, { color: '#FF4D4D' }]}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ height: 50 }} />
        </ScrollView>
    );
};

// Sub-Component for Editable Fields
const EditableItem = ({ label, value, icon }) => (
    <View style={styles.editRow}>
        <Ionicons name={icon} size={20} color="#666" />
        <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} defaultValue={value} />
        </View>
        <Ionicons name="pencil-outline" size={16} color="#4E54C8" />
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { padding: 30, backgroundColor: '#FFF', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 2 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#141633' },

    section: { marginTop: 25, paddingHorizontal: 20 },
    sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#888', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
    card: { backgroundColor: '#FFF', borderRadius: 20, padding: 10, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },

    editRow: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#F0F0F0' },
    label: { fontSize: 12, color: '#999' },
    input: { fontSize: 15, color: '#333', fontWeight: '500', padding: 0 },

    activityRow: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#F0F0F0' },
    activityInfo: { flex: 1, marginLeft: 15 },
    itemTitle: { fontSize: 15, fontWeight: '600', color: '#333' },
    itemSub: { fontSize: 12, color: '#999' },
    statusTag: { fontSize: 11, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, overflow: 'hidden' },
    red: { backgroundColor: '#FFEDED', color: '#FF4D4D' },
    orange: { backgroundColor: '#FFF7ED', color: '#FF9800' },

    actionRow: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#F0F0F0' },
    actionText: { flex: 1, marginLeft: 15, fontSize: 16, color: '#333' }
});

export default Setting;