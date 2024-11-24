import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default function GrantRequestPermissionPage() {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [filterButtonVisible, setFilterButtonVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const api_url = `${BASE_URL}/api/requests`;
    const add_user_api_url = `${BASE_URL}/api/users/add-user`;
    const filters = [
        { key: 'All', value: 'all' },
        { key: 'Accepted', value: 'accept' },
        { key: 'Declined', value: 'decline' },
        { key: 'Pending', value: 'pending' },
    ];

    const fetchRequests = async () => {
        try {
            const response = await axios.get(api_url);
            setRequests(response.data);
            setFilteredRequests(response.data);
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

    const filterRequests = (filterStatus) => {
        setSelectedFilter(filterStatus);
        if(filterStatus === 'all') {
            setFilteredRequests(requests);
        }
        else {
            const filtered = requests.filter(
                (request) => request.status === filterStatus
            );
            setFilteredRequests(filtered);
        }
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
            <View style={styles.firstRow}>
                <Text style={styles.title}>Requests:</Text>

                <View style={styles.filterButton}>
                    <TouchableOpacity onPress={() => setFilterButtonVisible(!filterButtonVisible)}>
                        <Ionicons name='filter-outline' style={styles.filterIcon}/>
                    </TouchableOpacity>
                    {filterButtonVisible && (
                        <FlatList
                            style={styles.dropdown}
                            data={filters}
                            keyExtractor={(item) => item.key}
                            renderItem={({ item }) => (
                                <View>
                                    <TouchableOpacity onPress={() => filterRequests(item.value)} style={styles.filterItem}>
                                        <Ionicons 
                                            name={
                                                item.value === selectedFilter ? "radio-button-on-outline" : "radio-button-off-outline"
                                            }
                                            style={styles.filterIcon} 
                                        />
                                        <Text style={styles.filterText}>{item.key}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    )}
                </View>
            </View>

            <FlatList
                data={filteredRequests}
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

                        {item.status === 'pending' && 
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
                        }

                        {item.status === 'accept' && 
                            <View style={styles.rightView}>
                                <Text style={styles.statusText}>The request was approved.</Text>
                            </View>
                        }

                        {item.status === 'decline' && 
                            <View style={styles.rightView}>
                                <Text style={styles.statusText}>The request was rejected.</Text>
                            </View>
                        }   
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
