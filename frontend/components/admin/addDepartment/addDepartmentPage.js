import React, { useState } from 'react';
import { Alert, Text, View, TouchableOpacity, TextInput } from 'react-native';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default function AddDepartmentPage({ route, navigation }) {
  const { facultyID } = route.params;

  const [name, setName] = useState('');
  const api_url = `${BASE_URL}/api/departments`;

  const postDepartment = async () => {
    if( !name ) {
      Alert.alert('Fields are mandatory');
      return;
    }

    try {
      const response = await axios.post(
        api_url,
        {
          name,
          facultyID
        }
      );

      setName('');

      navigation.navigate('ManageDepartmentsPage');
    } catch(error) {
      Alert.alert('Error', 'Could not create the department');
    }
  }

  return (
    <View>
      <Text style={styles.title}>Create a new Department</Text>

      <View style={styles.forum}>
        <View style={styles.inputContainer}>
          <Text>Name</Text>
          
          <TextInput 
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={postDepartment}>
          <Text style={styles.buttonText}>Add Department</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};