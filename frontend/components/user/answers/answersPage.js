import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert, FlatList, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';
import { colors } from '../../../config/colors';
import { useUser } from '../../context/UserContext';

export default function AnswersPage({ questionID }) {
    const user = useUser().user;
    const [answers, setAnswers] = useState([]);
    const [comment, setComment] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
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

    const addAnswer = async () => {
        if (comment.trim()) {
            try {
                let name = isAnonymous ? 'Anonymous' : `${user.firstname} ${user.lastname}`;
                console.log(name)
                const response = await axios.post(api_url, {
                    questionID,
                    student_name: name,
                    answer_text: comment,
                });
                setComment('');
            } catch (error) {
                console.error('Error adding answer:', error);
            }

            console.log(comment);
            setComment('');
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
                    ListHeaderComponent={
                        <View>
                            <View style={styles.anonymousContainer}>
                                <Text style={styles.anonymousLabel}>Post anonymously</Text>
                                <Switch
                                    value={isAnonymous}
                                    onValueChange={(value) => setIsAnonymous(value)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Write a comment..."
                                    value={comment}
                                    onChangeText={(text) => setComment(text)}
                                />
                                <TouchableOpacity onPress={addAnswer} style={styles.sendButton}>
                                    <Ionicons name="send" size={24} color={colors.red} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                />
            </View>
        </View>
    );
}
