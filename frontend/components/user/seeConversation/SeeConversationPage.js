import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

import AnswersPage from '../answers/answersPage';

export default function SeeConversationPage({ route }) {
    const { questionId } = route.params;

    const [information, setInformation] = useState(null);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalImage, setModalImage] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showAllImages, setShowAllImages] = useState(false);

    const api_url = `${BASE_URL}/api/question`;

    const getQuestionInformation = async () => {
        try {
            const response = await axios.get(api_url, {
                params: { questionId },
            });

            const data = response.data;

            const combinedFiles = data.files.map((file) => ({
                type: file.file_type,
                base64: file.file_data,
            }));

            setInformation(data);
            setFiles(combinedFiles);
        } catch (error) {
            console.error('Error fetching question information:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getQuestionInformation();
    }, []);

    const handleImagePress = (uri, index) => {
        setModalImage(uri);
        setSelectedImageIndex(index);
        setIsModalVisible(true);
    };

    const previousImage = () => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex((prev) => prev - 1);
        }
    };

    const nextImage = () => {
        if (selectedImageIndex < files.length - 1) {
            setSelectedImageIndex((prev) => prev + 1);
        }
    };

    if (loading) {
        return <Text>Loading requests...</Text>;
    }

    const firstThreeFiles = files.slice(0, 3);

    const shouldAddMarginToAnswers = files.length <= 3;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{information.question_title}</Text>
            <Text style={styles.author}>{information.student_name}</Text>
            <Text style={styles.content}>{information.question_content}</Text>

            <View styles={styles.row}>
                <FlatList
                    data={firstThreeFiles}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        const isImage = item.type.startsWith('image');

                        return (
                            <TouchableOpacity
                                style={styles.fileContainer}
                                onPress={() => isImage && handleImagePress(`data:image/png;base64,${item.base64}`, index)}
                            >
                                {isImage ? (
                                    <Image
                                        source={{ uri: `data:image/png;base64,${item.base64}` }}
                                        style={styles.thumbnail}
                                    />
                                ) : (
                                    <Text style={styles.unknownFileText}>Unknown file</Text>
                                )}
                            </TouchableOpacity>
                        );
                    }}
                    numColumns={3}
                    ListEmptyComponent={<Text style={styles.emptyText}>No files available.</Text>}
                />

                {files.length > 3 && (
                    <TouchableOpacity
                        style={[styles.viewAllButton]}
                        onPress={() => setShowAllImages(true)}
                    >
                        <Text>View All...</Text>
                    </TouchableOpacity>
                )}
            </View>

            {selectedImageIndex !== null && (
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Image
                            source={{
                                uri: `data:image/png;base64,${files[selectedImageIndex]?.base64}`,
                            }}
                            style={styles.modalImage}
                        />
                        <View style={styles.navigationContainer}>
                            <TouchableOpacity
                                style={[styles.navButton, styles.navButtonLeft]}
                                onPress={previousImage}
                                disabled={selectedImageIndex === 0}
                            >
                                {selectedImageIndex > 0 && (
                                    <Ionicons
                                        name="chevron-back"
                                        size={32}
                                        color={'#fff'}
                                    />
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.navButton, styles.navButtonRight]}
                                onPress={nextImage}
                                disabled={selectedImageIndex === files.length - 1}
                            >
                                {selectedImageIndex < files.length - 1 && (
                                    <Ionicons
                                        name="chevron-forward"
                                        size={32}
                                        color={'#fff'}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}


            <Modal
                visible={showAllImages}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowAllImages(false)}
            >
                <View style={styles.modalContainer}>
                    <FlatList
                        data={files}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={styles.fileContainer}
                                onPress={() => handleImagePress(`data:image/png;base64,${item.base64}`, index)}
                            >
                                <Image
                                    source={{ uri: `data:image/png;base64,${item.base64}` }}
                                    style={styles.thumbnail}
                                />
                            </TouchableOpacity>
                        )}
                        numColumns={3}
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setShowAllImages(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <View style={[{ flex: 1 }, shouldAddMarginToAnswers && { marginTop: 50 }]}>
                <AnswersPage questionID={questionId}></AnswersPage>
            </View>
        </View>
    );
}
