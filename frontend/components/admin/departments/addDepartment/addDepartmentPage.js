import React, { useState } from 'react';
import { Alert, Text, View, TouchableOpacity, TextInput } from 'react-native';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default function AddDepartmentPage({ route, navigation }) {
  const { facultyID } = route.params;

  const [name, setName] = useState('');
  const [years, setYears] = useState('');
  const api_url = `${BASE_URL}/api/departments`;

  const postDepartment = async () => {
    if (!name) {
      Alert.alert('Fields are mandatory');
      return;
    }

    try {
      const response = await axios.post(
        api_url,
        {
          name,
          years,
          facultyID
        }
      );

      setName('');

      navigation.navigate('ManageDepartmentsPage');
    } catch (error) {
      Alert.alert('Error', 'Could not create the department');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a new Department</Text>

      <View>
        <View style={styles.inputContainer}>
          <Text>Name</Text>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Years</Text>

          <TextInput
            style={styles.input}
            value={years}
            onChangeText={setYears}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={postDepartment}>
        <Text style={styles.buttonText}>Add Department</Text>
      </TouchableOpacity>
    </View>
  );
};