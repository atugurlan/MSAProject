import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../context/UserContext';
import { styles } from './styles';
import { BASE_URL } from '@env';
import axios from 'axios';

export default CompleteProfilePage = ({ navigation }) => {
  const { user, setUser } = useUser();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [facultyOpen, setFacultyOpen] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [yearsOpen, setYearsOpen] = useState(false);
  const [years, setYears] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [fieldEnabled, setFieldEnabled] = useState({
    department: false,
    year: false,
  });

  const faculties_api_url = `${BASE_URL}/api/faculties`;
  const departments_api_url = `${BASE_URL}/api/departments`;
  const subjects_api_url = `${BASE_URL}/api/subjectsFromDepartment`;
  const complete_profile_api_url = `${BASE_URL}/api/users/completeProfile`;

  const getFaculties = async () => {
    try {
      const response = await axios.get(faculties_api_url);
      const formattedFaculties = response.data.map((faculty) => ({
        label: faculty.name,
        value: faculty.id,
      }));
      setFaculties(formattedFaculties);
    } catch (error) {
      console.log('Error fetching faculties: ', error);
    }
  };

  const getDepartments = async (facultyID) => {
    try {
      const response = await axios.get(departments_api_url, {
        params: { facultyid: String(facultyID) },
      });
      const formattedDepartments = response.data.map((department) => ({
        label: department.department_name,
        value: department.department_id,
        years: department.years,
      }));
      setDepartments(formattedDepartments);
    } catch (error) {
      console.log('Error getting departments: ', error);
    }
  };

  const getYears = async (departmentID) => {
    const selectedDepartment = departments.find((d) => d.value == departmentID);

    if (selectedDepartment) {
      const yearsList = Array.from(
        { length: selectedDepartment.years },
        (_, index) => ({
          label: String(index + 1),
          value: String(index + 1),
        })
      );
      setYears(yearsList);
    }
  };

  const getSubjects = async (departmentID) => {
    try {
      const response = await axios.get(subjects_api_url, {
        params: { departmentID: String(departmentID) },
      });

      let filteredSubjects = response.data.filter((item) => item.year <= year);

      const formattedSubjects = filteredSubjects.map((subject) => ({
        label: subject.name,
        value: subject.subject_id,
        year: subject.year,
      }));

      const groupedSubjects = formattedSubjects.reduce((acc, subject) => {
        if (!acc[subject.year]) {
          acc[subject.year] = [];
        }
        acc[subject.year].push(subject);
        return acc;
      }, {});

      setSubjects(groupedSubjects);
    } catch (error) {
      console.log('Error getting subjects: ', error);
    }
  };

  useEffect(() => {
    getFaculties();

    if (faculty) {
      getDepartments(faculty);
    }

    if (department) {
      getYears(department);
    }

    if (year) {
      getSubjects(department);
    }
  }, [faculty, department, year]);

  const handleInputChange = (value, field) => {
    if (field === 'firstName') {
      setFirstName(value);
    } else if (field === 'lastName') {
      setLastName(value);
    }

    if (firstName && lastName && faculty) {
      setFieldEnabled({ ...fieldEnabled, department: true });
    }

    if (field === 'department') {
      setDepartment(value);
      setFieldEnabled({ ...fieldEnabled, year: true });
    } else if (field === 'year') {
      setYear(value);
    }
  };

  const toggleSelection = (subject) => {
    setSelectedSubjects((prevSelected) => {
      if (prevSelected.includes(subject.value)) {
        return prevSelected.filter((item) => item !== subject.value);
      } else {
        return [...prevSelected, subject.value];
      }
    });
  };

  const handleSubmit = async () => {
    if (!selectedSubjects) {
      Alert.alert('Error', 'Fields were not filled');
      return;
    }

    try {
      const endpointResponse = await axios.put(complete_profile_api_url, {
        userID: user.id,
        firstName,
        lastName,
        faculty,
        department,
        year,
        selectedSubjects,
      });

      setUser({
        ...user,
        firstname: firstName,
        lastname: lastName,
        facultyid: faculty,
        department,
        year,
        subjects: selectedSubjects,
      });

      Alert.alert("Succes", "Profile Completed.")
      setFirstName('');
      setLastName('');
      setFaculty('');
      setDepartment('');
      setYear('');
      setSelectedSubjects([]);

      navigation.navigate('UserLandingPage');
    } catch (error) {
      console.log(error.message);
      Alert.alert('Error', 'Could not complete the profile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <FlatList
          data={Object.entries(subjects)}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={
            <View style={styles.container}>
              <Text style={styles.title}>Complete Your Profile</Text>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={(value) => handleInputChange(value, 'firstName')}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={(value) => handleInputChange(value, 'lastName')}
              />
              <DropDownPicker
                open={facultyOpen}
                value={faculty}
                items={faculties}
                setOpen={setFacultyOpen}
                setValue={setFaculty}
                setItems={setFaculties}
                placeholder="Select a faculty"
                containerStyle={[styles.dropDownContainer, { zIndex: facultyOpen ? 3000 : 1000 }]}
                dropDownContainerStyle={[styles.dropDownStyle, { elevation: facultyOpen ? 5 : 0 }]}
                nestedScrollEnabled={true}
              />
              <DropDownPicker
                open={departmentOpen}
                value={department}
                items={departments}
                setOpen={setDepartmentOpen}
                setValue={setDepartment}
                setItems={setDepartments}
                placeholder="Select a department"
                containerStyle={[styles.dropDownContainer, { zIndex: departmentOpen ? 2000 : 1000 }]}
                dropDownContainerStyle={[styles.dropDownStyle, { elevation: departmentOpen ? 5 : 0 }]}
                nestedScrollEnabled={true}
              />
              <View>
                <DropDownPicker
                  open={yearsOpen}
                  value={year}
                  items={years}
                  setOpen={setYearsOpen}
                  setValue={setYear}
                  setItems={setYears}
                  placeholder="Select your year"
                  containerStyle={[styles.dropDownContainer, { zIndex: yearsOpen ? 50000000 : 1000 }]}
                  dropDownContainerStyle={[styles.dropDownStyle, { elevation: yearsOpen ? 5 : 0 }]}
                  nestedScrollEnabled={true}
                />
              </View>
            </View>
          }
          renderItem={({ item }) => {
            const [year, subjectsInYear] = item;
            return (
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.yearTitle}>Year {year}</Text>
                {subjectsInYear.map((subject, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.subjectItem,
                      selectedSubjects.includes(subject.value) && styles.selectedItem,
                    ]}
                    onPress={() => toggleSelection(subject)}
                  >
                    <Text style={styles.subjectLabel}>{subject.label}</Text>
                    {selectedSubjects.includes(subject.value) && (
                      <Ionicons name="checkmark" size={20} color="green" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            );
          }}
          ListFooterComponent={
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!year || yearsOpen) && styles.disabledButton,
                yearsOpen && { opacity: 0, pointerEvents: 'none' },
              ]}
              onPress={handleSubmit}
              disabled={!year || yearsOpen}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          }
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          removeClippedSubviews={false}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
