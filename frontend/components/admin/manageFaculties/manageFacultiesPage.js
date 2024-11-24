import React, { useEffect, useState } from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default ManageFacultiesPage = ({ navigation }) => {
  const [faculties, setFaculties] = useState([]);
  const api_url = `${BASE_URL}/api/faculties`

  const getFaculties = async () => {
    try {
      const response = await axios.get(api_url);
      setFaculties(response.data);
    } catch(error) {
      console.log('Error fetching faculties: ', error);
    }
  }

  useEffect(() => {
    getFaculties();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Management for Faculties</Text>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Add a Faculty</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddFacultyPage')}>
          <Text style={styles.text}>New Faculty</Text>
          <Ionicons name="arrow-forward" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.subTitle}>List of Faculties</Text>

        <FlatList 
          data={faculties}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('ManageDepartmentsPage', {facultyID: item.id, facultyName: item.name})}>
              <View>
                <Text>Faculty {item.id}</Text>
                <Text>{item.name} ({item.shortname})</Text>
              </View>
              <Ionicons name="arrow-forward" style={styles.icon} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};