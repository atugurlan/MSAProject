import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import CustomModalPicker from './CustomModal';

import { useUser } from '../../context/UserContext';
import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default function ProfilePage() {
    const { user } = useUser();

    const [semester1Subjects, setSemester1Subjects] = useState([]);
    const [semester2Subjects, setSemester2Subjects] = useState([]);
    const [previouslyTakenSubjects, setPreviouslyTakenSubjects] = useState([]);
    const [faculty, setFaculty] = useState('');
    const [department, setDepartment] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [editedFaculty, setEditedFaculty] = useState('');
    const [editedFacultyID, setEditedFacultyID] = useState(0);
    const [editedDepartment, setEditedDepartment] = useState('');
    const [editedDepartmentID, setEditedDepartmentID] = useState(0);
    const [editedYear, setEditedYear] = useState(0);
    const [editedSubjects, setEditedSubjects] = useState([]);
    const [newSubjects, setNewSubjects] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [allFaculties, setAllFaculties] = useState([]);

    const faculty_api_url = `${BASE_URL}/api/faculty`;
    const all_faculties_api_url = `${BASE_URL}/api/faculties`;
    const user_subjects_api_url = `${BASE_URL}/api/subjectsNames`;
    const department_api_url = `${BASE_URL}/api/departmentInformation`;
    const subjects_api_url = `${BASE_URL}/api/subjectsFromDepartment`;
    const all_departments_api_url = `${BASE_URL}/api/departments`;
    const modify_profile_api_url = `${BASE_URL}/api/users/modifyProfile`;

    const [facultyOpen, setFacultyOpen] = useState(false);
    const [departmentOpen, setDepartmentOpen] = useState(false);
    const [departmentYears, setDepartmentYears] = useState([]);
    const [yearsOpen, setYearsOpen] = useState(false);


    // get user data 
    const getFaculty = async () => {
        try {
            const response = await axios.get(faculty_api_url, {
                params: {
                    id: user.facultyid
                }
            });

            setFaculty(response.data[0].name);
            setEditedFaculty(response.data[0].name);
            setEditedFacultyID(response.data[0].id);
        } catch (error) {
            console.log('Error getting faculty name: ', error);
        }
    }

    const getDepartment = async () => {
        try {
            const response = await axios.get(department_api_url, {
                params: {
                    department_id: user.department
                }
            });

            setDepartment(response.data[0].department_name);
            setEditedDepartment(response.data[0].department_name);
            setEditedDepartmentID(response.data[0].department_id);
        } catch (error) {
            console.log('Error getting department name: ', error);
        }
    }

    const getUserSubjects = async () => {
        try {
            const response = await axios.get(user_subjects_api_url, {
                params: {
                    subjectsID: user.subjects
                }
            });

            getSplitSubjects(response.data);
        } catch (error) {
            console.log('Error getting subjects: ', error);
        }
    }

    const getSplitSubjects = (subjects) => {
        const formattedSubjects = subjects.map((subject) => ({
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

        setEditedSubjects(formattedSubjects);
    }


    // functions for retriving info in edit mode
    const getFaculties = async () => {
        try {
            const response = await axios.get(all_faculties_api_url);

            setAllFaculties(response.data);
        } catch (error) {
            console.log('Error getting departments: ', error);
        }
    }


    const getDepartments = async (facultyid) => {
        try {
            const response = await axios.get(all_departments_api_url, {
                params: {
                    facultyid: facultyid
                }
            });

            setAllDepartments(response.data);
        } catch (error) {
            console.log('Error getting department name: ', error);
        }
    }

    const getSubjects = async (year) => {
        try {
            const response = await axios.get(subjects_api_url, {
                params: {
                    departmentID: editedDepartmentID
                }
            });

            let formattedSubjects = response.data.map((subject) => ({
                label: subject.name,
                value: subject.subject_id,
                year: subject.year,
                semester: subject.semester
            }));

            let availableSubjects = formattedSubjects.filter(
                (subject) => subject.year <= year
            )

            setNewSubjects(availableSubjects);
        } catch (error) {
            console.log('Error getting subjects: ', error);
        }
    }

    const getYears = async (years) => {
        const yearsArray = Array.from({ length: years }, (_, i) => i + 1);

        setDepartmentYears(yearsArray);
    }

    // functions for handling each modification in edit mode
    const handleFacultySelect = async (item) => {
        if (item.department_id !== editedDepartmentID) {
            console.log("New faculty selected. Resetting values...");

            setEditedFacultyID(item.id);
            setEditedFaculty(item.name)

            setEditedDepartmentID(0);
            setEditedDepartment(null);

            setEditedYear(0);
            setNewSubjects([]);
            setEditedSubjects([]);

            await getDepartments(item.id);
        } else {
            console.log("Same faculty selected.");
        }
    };

    const handleDepartmentSelect = (item) => {
        if (item.department_id !== editedDepartmentID) {
            console.log("New department selected. Resetting values...");

            setEditedDepartmentID(item.department_id);
            setEditedDepartment(item.department_name);

            setEditedYear(null);
            setNewSubjects([]);
            setEditedSubjects([]);

            getYears(item.years);
        } else {
            console.log("Same department selected.W");
        }
    };

    const handleYearSelect = async (item) => {
        if (item != editedYear) {
            setEditedYear(item);
            setEditedSubjects([]);
            await getSubjects(item);
        }
        else {
            console.log("Same year selected.")
        }
    };

    const handleSave = async () => {
        try {
            let subjectID = editedSubjects.map((s) => s.value);

            console.log(editedFacultyID);
            console.log(editedFaculty);
            console.log(editedDepartmentID);
            console.log(editedDepartment);
            console.log(editedYear);
            console.log(editedSubjects);

            const response = await axios.put(
                modify_profile_api_url,
                {
                    userID: user.id,
                    faculty: editedFacultyID,
                    department: editedDepartmentID,
                    year: editedYear,
                    selectedSubjects: subjectID,
                }
            );

            user.facultyid = editedFacultyID;
            user.department = editedDepartmentID;
            user.year = editedYear;
            user.subjects = subjectID;

            getFaculty();
            getDepartment();
            getUserSubjects();
            setIsEditing(false);
        } catch (error) {
            console.log('Error saving new information: ', error);
        }
    }

    const handleCancel = () => {
        getDefaultEditableInformation();
        setIsEditing(false);
    };

    const getDefaultEditableInformation = async () => {
        if (user) {
            setEditedDepartment(department);
            setEditedYear(user.year);
            getUserSubjects();
            getSubjects(user.year);
        }
    }

    useEffect(() => {
        getFaculty();
        getFaculties();
        getDepartment();
        getDepartments();
        getDefaultEditableInformation();
    }, []);

    const toggleSubjectSelection = (subject) => {
        if (editedSubjects.some((s) => s.value === subject.value)) {
            setEditedSubjects(editedSubjects.filter((s) => s.value !== subject.value));
        } else {
            setEditedSubjects([...editedSubjects, subject]);
        }
    };

    const getSubjectStyle = (subject) => {
        return editedSubjects.some((s) => s.value === subject.value)
            ? [styles.subjectContainer, styles.selectedSubject]
            : styles.subjectContainer;
    };

    const renderSubjects = (subjects, title) => (
        <>
            <Text style={styles.subTitle}>{title}</Text>
            {subjects.map((subject, index) => (
                <View key={index} style={styles.subjectContainer}>
                    <Text style={styles.subject}>{subject.label}</Text>
                </View>
            ))}
        </>
    );

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

                            {isEditing ? (
                                <></>
                            ) : (
                                <TouchableOpacity>
                                    <Text style={styles.changePasswordText}>Change password</Text>
                                </TouchableOpacity>
                            )}
                        </View >

                        <Text style={styles.sectionTitle}>Current Student Data</Text>
                        <View>
                        <View style={styles.infoContainer}>
                                <Text style={styles.label}>Faculty:</Text>
                                {isEditing ? (
                                    <View>
                                        <TouchableOpacity
                                            style={styles.selectorButton}
                                            onPress={() => setFacultyOpen(true)}
                                        >
                                            <Text style={styles.selectorText}>
                                                {editedFaculty}
                                            </Text>
                                        </TouchableOpacity>

                                        <CustomModalPicker
                                            visible={facultyOpen}
                                            data={allFaculties}
                                            onClose={() => setFacultyOpen(false)}
                                            onSelect={handleFacultySelect}
                                        />
                                    </View>
                                ) : (
                                    <Text style={styles.value}>{faculty}</Text>
                                )}
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.label}>Department:</Text>
                                {isEditing ? (
                                    <View>
                                        <TouchableOpacity
                                            style={styles.selectorButton}
                                            onPress={() => setDepartmentOpen(true)}
                                        >
                                            <Text style={styles.selectorText}>
                                                {editedDepartment}
                                            </Text>
                                        </TouchableOpacity>

                                        <CustomModalPicker
                                            visible={departmentOpen}
                                            data={allDepartments}
                                            onClose={() => setDepartmentOpen(false)}
                                            onSelect={handleDepartmentSelect}
                                        />
                                    </View>
                                ) : (
                                    <Text style={styles.value}>{department}</Text>
                                )}
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.label}>Year:</Text>
                                {isEditing ? (
                                    <View>
                                        <TouchableOpacity
                                            style={styles.selectorButton}
                                            onPress={() => setYearsOpen(true)}
                                        >
                                            <Text style={styles.selectorText}>
                                                {editedYear}
                                            </Text>
                                        </TouchableOpacity>

                                        <CustomModalPicker
                                            visible={yearsOpen}
                                            data={departmentYears}
                                            onClose={() => setYearsOpen(false)}
                                            onSelect={handleYearSelect}
                                        />
                                    </View>
                                ) : (
                                    <Text style={styles.value}>{user.year}</Text>
                                )}
                            </View>
                            <View>
                                {isEditing ? (
                                    <View>
                                        <Text style={styles.label}>Subjects</Text>
                                        {newSubjects.map((subject, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={getSubjectStyle(subject)}
                                                onPress={() => toggleSubjectSelection(subject)}
                                            >
                                                <Text style={styles.subject}>{subject.label}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                ) : (
                                    <View>
                                        <View>
                                            <Text style={styles.sectionTitle}>Current Subjects</Text>

                                            {renderSubjects(semester1Subjects, 'Semester 1')}
                                            {renderSubjects(semester2Subjects, 'Semester 2')}
                                        </View>
                                        <View>
                                            {renderSubjects(previouslyTakenSubjects, 'Previously Taken Subjects')}
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            {isEditing ? (
                                <>
                                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                        <Text style={styles.saveButtonText}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel()}>
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <TouchableOpacity style={styles.editButton} onPress={() => { getDefaultEditableInformation(); setIsEditing(true) }}>
                                    <Text style={styles.editButtonText}>Edit</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </ScrollView >
                )
            }
        </>
    );
}
