import React, { useState } from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

const AddFacultyPage = ({ navigation }) => {
    const [name, setName] = useState('');
    const [shortName, setShortName] = useState('');
    const api_url=`${BASE_URL}/api/faculties`

    const postFaculty = async () => {
        if(!name || !shortName) {
            Alert.alert('All fields are mandatory');
            return;
        }

        try {
            const response = await axios.post(
                api_url,
                {
                    name,
                    shortName
                }
            );

            setName('');
            setShortName('');

            navigation.navigate('ManageFacultiesPage');
        } catch(error) {
            Alert.alert('Error', 'Could not create the faculty');
        }
    }

    return (
        <View>
            <Text style={styles.title}>Create a new Faculty</Text>

            <View style={styles.forum}>
                <View style={styles.inputContainer}>
                    <Text>Name</Text>
                    <TextInput 
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text>Short Name</Text>
                    <TextInput 
                        style={styles.input}
                        value={shortName}
                        onChangeText={setShortName}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={postFaculty}>
                    <Text style={styles.buttonText}>Add Faculty</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default AddFacultyPage;