import React, { useState } from 'react';
import {
    View, Text, StyleSheet, FlatList, Image,
    TouchableOpacity, Modal, TextInput, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Other = () => {
    const [isPostModalVisible, setPostModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    // Mock Data for Blogs/News
    const [posts, setPosts] = useState([
        {
            id: '1',
            title: 'New Library Timing',
            author: 'Sachin Sahani',
            content: 'The library will now be open until 10 PM during exam season. Please maintain silence...',
            image: 'https://picsum.photos/500/300',
            views: 120,
            likes: 45,
            comments: 12
        },
        {
            id: '2',
            title: 'Placement Drive 2026',
            author: 'T&P Cell',
            content: 'Top tech companies are visiting GCOEN next month. Update your resumes now!',
            image: 'https://picsum.photos/501/300',
            views: 890,
            likes: 230,
            comments: 54
        }
    ]);

    // Component for each Post Card
    const renderPost = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => setSelectedPost(item)}
        >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardAuthor}>By {item.author}</Text>
                <Text numberOfLines={2} style={styles.cardSnippet}>{item.content}</Text>

                <View style={styles.statsRow}>
                    <View style={styles.statItem}><Ionicons name="eye-outline" size={16} color="#666" /><Text style={styles.statText}>{item.views}</Text></View>
                    <View style={styles.statItem}><Ionicons name="heart-outline" size={16} color="#666" /><Text style={styles.statText}>{item.likes}</Text></View>
                    <View style={styles.statItem}><Ionicons name="chatbubble-outline" size={16} color="#666" /><Text style={styles.statText}>{item.comments}</Text></View>
                    <Ionicons name="share-social-outline" size={18} color="#666" style={{ marginLeft: 'auto' }} />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>GCOEN Blog & Updates</Text>
            </View>

            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 15 }}
            />

            {/* Floating Action Button (FAB) */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setPostModalVisible(true)}
            >
                <Ionicons name="add" size={32} color="#FFF" />
            </TouchableOpacity>

            {/* MODAL 1: Create Post */}
            <Modal visible={isPostModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setPostModalVisible(false)}>
                            <Ionicons name="close" size={28} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Create Post</Text>
                        <TouchableOpacity style={styles.postBtn}>
                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Post</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.modalBody}>
                        <TextInput placeholder="Title of your blog" style={styles.titleInput} />
                        <TextInput
                            placeholder="Share important updates or knowledge..."
                            multiline
                            style={styles.contentInput}
                        />
                        <TouchableOpacity style={styles.imagePicker}>
                            <Ionicons name="image-outline" size={30} color="#4E54C8" />
                            <Text style={{ color: '#4E54C8', marginLeft: 10 }}>Add Image</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>

            {/* MODAL 2: Full Blog View */}
            <Modal visible={!!selectedPost} animationType="fade">
                {selectedPost && (
                    <ScrollView style={styles.container}>
                        <Image source={{ uri: selectedPost.image }} style={styles.detailImage} />
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => setSelectedPost(null)}
                        >
                            <Ionicons name="arrow-back" size={24} color="#FFF" />
                        </TouchableOpacity>

                        <View style={styles.detailContent}>
                            <Text style={styles.detailTitle}>{selectedPost.title}</Text>
                            <Text style={styles.detailAuthor}>By {selectedPost.author}</Text>
                            <View style={styles.divider} />
                            <Text style={styles.detailBody}>{selectedPost.content}</Text>
                        </View>
                    </ScrollView>
                )}
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F7FF' },
    header: { padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, marginTop: 10, borderBottomColor: '#EEE' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#141633' },

    card: { backgroundColor: '#FFF', borderRadius: 15, marginBottom: 20, overflow: 'hidden', elevation: 3 },
    cardImage: { width: '100%', height: 180 },
    cardBody: { padding: 15 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    cardAuthor: { fontSize: 12, color: '#888', marginVertical: 4 },
    cardSnippet: { fontSize: 14, color: '#666' },

    statsRow: { flexDirection: 'row', marginTop: 15, alignItems: 'center', borderTopWidth: 0.5, borderTopColor: '#EEE', paddingTop: 10 },
    statItem: { flexDirection: 'row', alignItems: 'center', marginRight: 15 },
    statText: { fontSize: 12, color: '#666', marginLeft: 4 },

    fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#4E54C8', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 },

    modalContainer: { flex: 1, backgroundColor: '#FFF' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
    modalTitle: { fontSize: 18, fontWeight: 'bold' },
    postBtn: { backgroundColor: '#4E54C8', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
    modalBody: { padding: 20 },
    titleInput: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    contentInput: { fontSize: 16, textAlignVertical: 'top', height: 200 },
    imagePicker: { flexDirection: 'row', alignItems: 'center', padding: 20, borderWidth: 1, borderColor: '#4E54C8', borderStyle: 'dashed', borderRadius: 15 },

    detailImage: { width: '100%', height: 300 },
    backButton: { position: 'absolute', top: 40, left: 20, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 25 },
    detailContent: { padding: 20, backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30 },
    detailTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    detailAuthor: { color: '#888', marginTop: 5 },
    divider: { height: 1, backgroundColor: '#EEE', marginVertical: 15 },
    detailBody: { fontSize: 16, color: '#444', lineHeight: 24 }
});

export default Other;