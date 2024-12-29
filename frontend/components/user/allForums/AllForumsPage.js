import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';
import { useUser } from '../../context/UserContext';

export default function AllForumsPage({ navigation }) {
    const userInfo = useUser().user;
    const subjectsID = userInfo.subjects;

    const [subjectNames, setSubjectNames] = useState([]);
    const [allSubjects, setAllSubjects] = useState([]);
    const [otherSubjects, setOtherSubjects] = useState([]);
    const [mySubjectsShown, setMySubjectsShown] = useState(true);

    const user_subject_api_url = `${BASE_URL}/api/subjectsNames`;
    const all_subject_api_url = `${BASE_URL}/api/subjects`;

    const getSubjectNames = async () => {
        try {
            const response = await axios.get(
                user_subject_api_url, {
                params: {
                    subjectsID: subjectsID
                }
              },
            );

            setSubjectNames(response.data);
        } catch(error) {
            console.log(error);
        }
    }

    const getAllSubjects = async () => {
        try {
            const response = await axios.get(
                all_subject_api_url, {
                params: {
                    subjectsID: subjectsID
                }
              },
            );

            setAllSubjects(response.data);
        } catch(error) {
            console.log(error);
        }
    }

    const getOtherSubjects = (allSubjects, subjectNames) => {
        if( allSubjects != null && subjectNames != null) {
            const findOtherSubjects = allSubjects.filter(item1 => 
                !subjectNames.some(item2 => item1.subject_id === item2.subject_id)
            );
    
            setOtherSubjects(findOtherSubjects);
        }
    }

    useEffect(() => {
        getSubjectNames();
        getAllSubjects();
    }, []);

    useEffect(() => {
        getOtherSubjects(allSubjects, subjectNames);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>All Forums</Text>

            <View style={styles.toggleContainer}>
                <TouchableOpacity 
                    style={[
                        styles.toggleButton,
                        mySubjectsShown ? styles.activeToggleButton : styles.inactiveToggleButton,
                    ]}
                    onPress={() => setMySubjectsShown(true)}
                >
                    <Text style={[
                            styles.toggleText,
                            mySubjectsShown ? styles.activeToggleText : null,
                        ]}
                    >
                        My Subjects
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[
                        styles.toggleButton,
                        !mySubjectsShown ? styles.activeToggleButton : styles.inactiveToggleButton,
                    ]}
                    onPress={() => setMySubjectsShown(false)}
                >
                    <Text
                        style={[
                            styles.toggleText,
                            !mySubjectsShown ? styles.activeToggleText : null,
                        ]}
                    >
                        Others
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.listContainer}>
                {mySubjectsShown ? (
                    <View>
                        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('ForumPage', {subjectID: 0, subjectName: 'Administrative'})}>
                            <Text>Administrative</Text>
                        </TouchableOpacity>
        
                        <FlatList
                            data={subjectNames}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('ForumPage', {subjectID: item.subject_id, subjectName: item.name})}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                ) : (
                    <View>
                        <FlatList
                            data={otherSubjects}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('ForumPage', {subjectID: item.subject_id, subjectName: item.name})}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>
        </View>
    );
}
