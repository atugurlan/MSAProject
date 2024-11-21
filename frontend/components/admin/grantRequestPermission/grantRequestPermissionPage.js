import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default function GrantRequestPermissionPage() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const api_url = `${BASE_URL}/api/requests`;
    const add_user_api_url = `${BASE_URL}/api/users/add-user`;

    const fetchRequests = async () => {
        try {
            const response = await axios.get(api_url);
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (loading) {
        return <Text>Loading requests...</Text>;
    }

    const changeStatus = async (id, newStatus) => {
        try {
            await axios.put(
                api_url,
                {
                    id,
                    newStatus
                }
            );

            Alert.alert('Succes', 'The status was modified');
            fetchRequests();
        } catch(error) {
            console.log(error);
            Alert.alert('Error', 'Could not modify the status')
        }
    }

    const addUser = async (email, password) => {
        await axios.post(
            add_user_api_url,
            {
                email,
                password
            }
        )
    }

    const handleImagePress = (imageUri) => {
        setModalImage(imageUri);
        setIsModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Requests:</Text>
            <FlatList
                data={requests}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (

                    <View style={styles.requestContainer}>
                        <View style={styles.leftView}>
                            <Text style={styles.id}>Request {item.id}:</Text>
                            <Text>Email: {item.email}</Text>
                            <Text>Status: {item.status}</Text>
                            <View>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: `data:image/png;base64,${item.studentdocument}` }}
                                        style={styles.document}
                                    />
                                    <TouchableOpacity onPress={() => handleImagePress(`data:image/png;base64,${item.studentdocument}`)}>
                                        <View style={styles.lensContainer}>
                                            <Ionicons name="search" style={styles.loopIcon} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.rightView}>
                            <TouchableOpacity style={styles.acceptButton} onPress={() => {
                                changeStatus(item.id, 'accept');
                                addUser(item.email, item.password);
                            }}>
                                <Text style={styles.textButton}>Accept</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.declineButton} onPress={() => changeStatus(item.id, 'decline')}>
                                <Text style={styles.textButton}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            {modalImage && (
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Ionicons name="close" style={styles.closeIcon} />
                        </TouchableOpacity>
                        <Image source={{ uri: modalImage }} style={styles.modalImage} />
                    </View>
                </Modal>
            )}
        </View>
    );
};
