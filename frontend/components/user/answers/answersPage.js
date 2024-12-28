import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default function AnswersPage({ questionID }) {
    const [answers, setAnswers] = useState([]);
    const api_url = `${BASE_URL}/api/answers`;

    const getAnswers = async () => {
        try {
            const response = await axios.get(api_url, {
                params: { questionID },
            });

            setAnswers(response.data);
        } catch (error) {
            console.error('Error fetching question answers:', error);
        }
    };

    useEffect(() => {
        getAnswers();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Answers</Text>

            <View>
                <FlatList
                    data={answers}
                    keyExtractor={(item) => item.answer_id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.answerContainer}>
                            <View>
                                <Text style={styles.username}>{item.student_name}</Text>
                                <Text style={styles.answerText}>{item.answer_text}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}
