import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

const GrantRequestPermissionPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://192.168.43.174:3000/api/requests');
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    if (loading) {
        return <Text>Loading requests...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Requests:</Text>
            <FlatList
                data={requests}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (

                    <View style={styles.requestContainer}>
                        <Text style={styles.id}>Request {item.id}:</Text>
                        <Text>Email: {item.email}</Text>
                        <Text>Password: {item.password}</Text>
                        <Text>Status: {item.status}</Text>
                        <Image
                            source={{ uri: `data:image/png;base64,${item.studentdocument}` }}
                            style={styles.document}
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default GrantRequestPermissionPage;
