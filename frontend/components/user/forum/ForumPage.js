import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../context/UserContext';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default function ForumPage({ navigation, route }) {
    const { user } = useUser();
    const { subjectID, subjectName } = route.params;
    const [questions, setQuestions] = useState([]);
    const subject_questions_api_url = `${BASE_URL}/api/subjectQuestions`;

    const [likes, setLikes] = useState([]);
    const likes_api_url = `${BASE_URL}/api/likes`;
    const like_a_question_api_url = `${BASE_URL}/api/likeQuestion`;
    const unlike_a_question_api_url = `${BASE_URL}/api/unlikeQuestion`;

    const [refresh, setRefresh] = useState(false);

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
        } catch (error) {
            console.log(error);
        }
    }

    const getLikes = async () => {
        try {
            const response = await axios.get(
                likes_api_url, {
                params: {
                    userID: user.id
                }
            },
            );

            let likedQuestionID = response.data.map((like) => like.question_id);
            setLikes(likedQuestionID);
        } catch (error) {
            console.log(error);
        }
    }

    const handleLike = async (questionId) => {
        const alreadyLiked = likes.includes(questionId);

        try {
            if (alreadyLiked) {
                const response = await axios.delete(
                    unlike_a_question_api_url, {
                        params: {
                            question_id: questionId,
                            user_id: user.id,
                        }
                    }
                );
                setLikes((prevLiked) =>
                    prevLiked.filter((id) => id !== questionId)
                );
            } else {
                const response = await axios.post(
                    like_a_question_api_url,
                    {
                        question_id: questionId,
                        user_id: user.id,
                    }
                );
                setLikes((prevLiked) => [...prevLiked, questionId]);
            }
        } catch (error) {
            console.log('Error at handling like', error);
        } finally {
            setRefresh((prev) => !prev);
        }
    };

    useEffect(() => {
        getSubjectQuestions();
        getLikes();
    }, [refresh]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{subjectName}</Text>

            <View>
                {(questions.length != 0) ? (
                    <FlatList
                        data={questions}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.listItem}>
                                <View style={styles.headerItem}>
                                    <Text style={styles.username}>{item.student_name}</Text>
                                    <TouchableOpacity style={styles.rightSide} onPress={() => handleLike(item.question_id)}>
                                        <Ionicons
                                            name={likes.includes(item.question_id) ? 'heart' : 'heart-outline'}
                                            size={20}
                                            color={likes.includes(item.question_id) ? 'red' : 'black'}
                                        />
                                        <Text>{item.no_likes}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.bottomContainer}>
                                    <Text style={styles.questionText}>{item.question_title}</Text>
                                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SeeConversationPage", { questionId: item.question_id })}>
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

            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate("AddQuestionPage", { subjectName: subjectName, subjectID: subjectID })}>
                <Ionicons name="add-circle" style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}
