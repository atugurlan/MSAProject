import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';

import { useUser } from '../../context/UserContext';
import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default function ProfilePage() {
    const { user } = useUser();
    console.log(user);

    const [semester1Subjects, setSemester1Subjects] = useState([]);
    const [semester2Subjects, setSemester2Subjects] = useState([]);
    const [previouslyTakenSubjects, setPreviouslyTakenSubjects] = useState([]);
    const [department, setDepartment] = useState('');

    const subjects_api_url = `${BASE_URL}/api/subjectsNames`;
    const department_api_url = `${BASE_URL}/api/departmentInformation`;

    const getDepartment = async () => {
        try {
            const response = await axios.get(department_api_url, {
                params: {
                    department_id: user.department
                }
            });

            setDepartment(response.data[0].department_name);
        } catch (error) {
            console.log('Error getting department name: ', error);
        }
    }

    const getSubjects = async () => {
        try {
            const response = await axios.get(subjects_api_url, {
                params: {
                    subjectsID: user.subjects
                }
            });

            const formattedSubjects = response.data.map((subject) => ({
                label: subject.name,
                value: subject.subject_id,
                year: subject.year,
                semester: subject.semester
            }));

            let semester1Subjects = formattedSubjects.filter((subject) => subject.year == user.year && subject.semester == '1');
            setSemester1Subjects(semester1Subjects);

            let semester2Subjects = formattedSubjects.filter((subject) => subject.year == user.year && subject.semester == '2');
            setSemester2Subjects(semester2Subjects);

            let previouslyTakenSubjects = formattedSubjects.filter((subject) => subject.year < user.year);
            setPreviouslyTakenSubjects(previouslyTakenSubjects);
        } catch (error) {
            console.log('Error getting subjects: ', error);
        }
    }

    useEffect(() => {
        getDepartment();
        getSubjects();
    }, [])

    return (
        <>
            {
                user != null && (
                    <ScrollView style={styles.container}>
                        <Text style={styles.header}>Profile</Text>

                        <Text style={styles.sectionTitle}>Personal details</Text>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Email Address</Text>
                            <Text style={styles.value}>{user.email}</Text>

                            <TouchableOpacity>
                                <Text style={styles.changePasswordText}>Change password</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.sectionTitle}>Current Student Data</Text>
                        <View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.label}>University:</Text>
                                <Text style={styles.value}>{department}</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.label}>Year:</Text>
                                <Text style={styles.value}>{user.year}</Text>
                            </View>
                            <View>
                                <Text style={styles.sectionTitle}>Current Subjects</Text>

                                <Text style={styles.subTitle}>Semester 1</Text>
                                {semester1Subjects.map((subject, index) => (
                                    <View key={index} style={styles.subjectContainer}>
                                        <Text style={styles.subject}>{subject.label}</Text>
                                    </View>
                                ))}
                                <Text style={styles.subTitle}>Semester 2</Text>
                                {semester2Subjects.map((subject, index) => (
                                    <View key={index} style={styles.subjectContainer}>
                                        <Text style={styles.subject}>{subject.label}</Text>
                                    </View>
                                ))}
                            </View>
                            <View>
                                <Text style={styles.sectionTitle}>Previously Taken Subjects</Text>
                                {previouslyTakenSubjects.map((subject, index) => (
                                    <View key={index} style={styles.subjectContainer}>
                                        <Text style={styles.subject}>{subject.label}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                )
            }
        </>
    );
}
