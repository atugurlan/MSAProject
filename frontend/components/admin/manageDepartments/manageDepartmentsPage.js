import React, { useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default ManageDepartmentsPage = ({ route, navigation }) => {
  const { id, facultyName } = route.params;

  const [departments, setDepartments] = useState([]);
  const api_url = `${BASE_URL}/api/departments`;

  const getDepartments = async () => {
    try {
      const response = await axios.get(api_url, {
        params: {
          facultyid: String(id)
        }
      });
      setDepartments(response.data);
    } catch(error) {
      console.log('Error getting departments: ', error);
    }
  }

  useEffect(() => {
    getDepartments();
  }, [])  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{facultyName}</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList 
          data={departments}
          keyExtractor={(item) => item.department_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('SubjectsHandlingPage', {departmentName: item.department_name})}>
              <View style={styles.leftSide}>
                <Text style={styles.text}>Department {item.department_id}</Text>
                <Text style={styles.text}>{item.department_name}</Text>
              </View>
              <Ionicons name="arrow-forward" style={styles.icon} />
            </TouchableOpacity>
          )}
        />
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddDepartmentPage', { facultyID: id })}>
          <Text>Add New Department</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};