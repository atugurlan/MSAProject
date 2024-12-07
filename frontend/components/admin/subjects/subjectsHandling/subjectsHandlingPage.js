import React, { useState, useEffect } from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

const SubjectsHandlingPage = ({ route, navigation }) => {
  const { departmentID, departmentName, departmentYear } = route.params;

  const [subjects, setSubjects] = useState([]);
  const api_url = `${BASE_URL}/api/subjects`;

  const getSubjects = async () => {
    try {
      const response = await axios.get(api_url, {
        params: {
          departmentID: String(departmentID)
        }
      });

      setSubjects(response.data);

      console.log(response.data)
    } catch(error) {
      console.log('Error getting subjects: ', error);
    }
  }

  const groupByYear = (data) => {
    return data.reduce((groups, item) => {
      const { year } = item;
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(item);
      return groups;
    }, {});
  };

  const groupedSubjects = groupByYear(subjects);
  const years = Array.from({ length: departmentYear }, (_, i) => (i + 1).toString());

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{departmentName}</Text>
      </View>

      <FlatList
        data={years}
        keyExtractor={(year) => year}
        renderItem={({ item: year }) => (
          <View>
            <Text style={styles.sectionHeader}>Year {year}</Text>
            {groupedSubjects[year]?.length > 0 ? (
              groupedSubjects[year].map((subject) => (
                <TouchableOpacity
                  key={subject.subject_id}
                  style={styles.listItem}
                  onPress={() => navigation.navigate('SubjectInformationPage', { subject })}
                >
                  <View style={styles.leftSide}>
                    <Text style={styles.text}>{subject.subject_id}</Text>
                    <Text style={styles.text}>{subject.name}</Text>
                  </View>
                  <Ionicons name="arrow-forward" style={styles.icon} />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noSubjectsText}>~ No subjects available ~</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default SubjectsHandlingPage;