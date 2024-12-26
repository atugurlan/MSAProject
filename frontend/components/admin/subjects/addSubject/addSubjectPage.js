import React, { useState } from 'react';
import { Alert, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default function AddSubjectPage({ route, navigation }) {
  const { departmentID } = route.params;

  const [name, setName] = useState('');
  const [proffesor, setProffesor] = useState('')
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [labAssistants, setLabAssistants] = useState([]);
  const [newLabAssistant, setNewLabAssistant] = useState('');

  const api_url = `${BASE_URL}/api/subjectsFromDepartment`;

  const handleAddLabAssistant = () => {
    if (newLabAssistant.trim() === '') return; 
    setLabAssistants([...labAssistants, newLabAssistant.trim()]);
    setNewLabAssistant(''); 
  };

  const postSubject = async () => {
    isEnabledString = isEnabled ? "true" : "false";

    if ( !name || !proffesor || !year || !semester || !isEnabledString || labAssistants.length == 0 ) {
      Alert.alert('Fields are mandatory');
      return;
    }

    try {
      const response = await axios.post(
        api_url,
        {
          name,
          proffesor,
          year,
          semester,
          labAssistants,
          isEnabled: isEnabledString,
          departmentID
        }
      );

      setName('');
      setProffesor('');
      setYear('');
      setSemester('');
      setLabAssistants([]);
      setIsEnabled(false);

      navigation.navigate('SubjectsHandlingPage');
    } catch(error) {
      Alert.alert('Error', 'Could not create the subject');
    }
  }

  return (
    <View>
      <Text style={styles.title}>Create a new Subject</Text>

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
          <Text>Proffesor's Name</Text>
          
          <TextInput 
            style={styles.input}
            value={proffesor}
            onChangeText={setProffesor}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Year</Text>
          
          <TextInput 
            style={styles.input}
            value={year}
            onChangeText={setYear}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Semester</Text>
          
          <TextInput 
            style={styles.input}
            value={semester}
            onChangeText={setSemester}
          />
        </View>

        <View style={styles.inputContainer}>
            <Text>Is active? </Text>
          
            <TouchableOpacity onPress={() => setIsEnabled(!isEnabled)}>
                <Ionicons
                    name={isEnabled ? 'checkbox-outline' : 'square-outline'}
                    size={24}
                    color={isEnabled ? 'green' : 'gray'}
                />
                <Text style={styles.checkboxText}>
                    {isEnabled ? 'Active' : 'Inactive'}
                </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
            <Text>Lab Assistants</Text>
            <TextInput
                value={newLabAssistant}
                onChangeText={setNewLabAssistant}
                style={styles.input}
            />
            <TouchableOpacity onPress={handleAddLabAssistant}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>

        <View>
            {labAssistants.map((assistant, index) => (
                <View key={index}>
                    <Text>{assistant}</Text>
                </View>
            ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={postSubject}>
          <Text style={styles.buttonText}>Add Subject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};