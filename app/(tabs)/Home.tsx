import { COLORS } from '@/asset/color'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Home = () => {
    const newsData = [
        { id: 1, title: "Exam Schedule Out", content: "Check the portal for summer exams.", image: "https://picsum.photos/400/200" },
        { id: 2, title: "GCOEN Tech Fest", content: "Registration starts tomorrow!", image: "https://picsum.photos/401/200" },
        { id: 3, title: "Holiday Notice", content: "College closed this Friday.", image: "https://picsum.photos/402/200" },
    ];

    const featureList = [
        { id: 1, name: 'Attendance', icon: 'stats-chart', color: '#4CAF50' },
        { id: 2, name: 'Time Table', icon: 'time', color: '#2196F3' },
        { id: 3, name: 'Result', icon: 'document-text', color: '#FF9800' },
        { id: 4, name: 'Calendar', icon: 'calendar', color: '#E91E63' },
        { id: 5, name: 'PYQ', icon: 'library', color: '#9C27B0' },
        { id: 6, name: 'Hall Ticket', icon: 'card', color: '#00BCD4' },
    ];

    const CARD_WIDTH = width * 0.80; // Changed to 80% so the next card peeks out

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* Header Section */}
            <View style={styles.userbasic}>
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
                        style={styles.avatar}
                    />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.userName}>Sachin Sahani</Text>
                    <View style={styles.tagRow}>
                        <View style={styles.tag}><Text style={styles.tagText}>3rd Year</Text></View>
                        <View style={styles.tag}><Text style={styles.tagText}>CSE</Text></View>
                    </View>
                </View>
            </View>

            {/* News Carousel Section */}
            <View style={styles.newsSection}>
                <Text style={styles.sectionTitle}>Latest Updates</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    snapToInterval={CARD_WIDTH + 20}
                    decelerationRate="fast"
                >
                    {newsData.map((item) => (
                        <View key={item.id} style={[styles.newsCard, { width: CARD_WIDTH }]}>
                            <Image source={{ uri: item.image }} style={styles.newsImage} />
                            <View style={styles.cardTextContent}>
                                <Text style={styles.newsTitle}>{item.title}</Text>
                                <Text style={styles.newsSub}>{item.content}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Feature Grid Section */}
            <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>Quick Links</Text>
            <View style={styles.featureContainer}>
                {featureList.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.featureCard}>
                        <View style={[styles.iconCircle, { backgroundColor: item.color + '15' }]}>
                            <Ionicons name={item.icon} size={28} color={item.color} />
                        </View>
                        <Text style={styles.featureText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Bottom Padding for scroll room */}
            <View style={{ height: 40 }} />
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    userbasic: {
        height: 150,
        width: "100%",
        backgroundColor: '#141633',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 10,
    },
    profileContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    avatar: { width: 60, height: 60, borderRadius: 30 },
    infoContainer: { marginLeft: 20 },
    userName: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
    tagRow: { flexDirection: 'row', marginTop: 5 },
    tag: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 10, marginRight: 8 },
    tagText: { color: '#fff', fontSize: 12, fontWeight: '600' },

    newsSection: { marginVertical: 10 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 20, color: '#333', marginTop: 10 },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 10 },
    newsCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginRight: 20,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    newsImage: { width: '100%', height: 140 },
    cardTextContent: { padding: 15 },
    newsTitle: { fontSize: 16, fontWeight: 'bold' },
    newsSub: { fontSize: 13, color: '#666', marginTop: 4 },

    featureContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 20,
        marginHorizontal: 15,
        backgroundColor: '#e9edf0',
        borderRadius: 20,
        elevation: 8,
    },
    featureCard: {
        width: '30%',
        backgroundColor: '#fff',
        aspectRatio: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconCircle: { width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
    featureText: { fontSize: 11, fontWeight: '700', color: '#333' },
});

export default Home;