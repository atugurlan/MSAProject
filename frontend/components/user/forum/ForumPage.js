import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default function ForumPage({ navigation, route }) {
    const { subjectID, subjectName } = route.params;
    const [questions, setQuestions] = useState([]);
    const subject_questions_api_url = `${BASE_URL}/api/subjectQuestions`;

    const getSubjectQuestions = async () => {
        try {
            const response = await axios.get(
                subject_questions_api_url, {
                params: {
                    subjectID: subjectID
                }
              },
            );

            setQuestions(response.data);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSubjectQuestions();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{subjectName}</Text>

            <View>
                { (questions.length != 0) ? (
                    <FlatList
                        data={questions}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.listItem}>
                                <View style={styles.headerItem}>
                                    <Text style={styles.username}>{item.student_name}</Text>
                                    <View style={styles.rightSide}>
                                        <Ionicons name="heart-outline" />
                                        <Text>{item.no_likes}</Text>
                                    </View>
                                </View>
                                <View style={styles.bottomContainer}>
                                    <Text style={styles.questionText}>{item.question_title}</Text>
                                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SeeConversationPage", {questionId: item.question_id})}>
                                        <Text style={styles.buttonText}>See conversation</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                          )}
                    />
                ) : (
                    <View style={styles.noQuestions}>
                        <Text style={styles.noQuestionsText}>~ No questions available ~</Text>
                    </View>
                )}
            </View>

            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate("AddQuestionPage", {subjectName: subjectName, subjectID: subjectID})}>
                <Ionicons name="add-circle" style={styles.icon}/>
            </TouchableOpacity>
        </View>
    );
}
