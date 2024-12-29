import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../context/UserContext';

import { styles } from './styles';

import { BASE_URL } from '@env';
import axios from 'axios';


export default CompleteProfilePage = ({ navigation }) => {
  const user = useUser().user;
  const userID = user.id;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const faculties_api_url = `${BASE_URL}/api/faculties`;
  const departments_api_url = `${BASE_URL}/api/departments`;
  const subjects_api_url = `${BASE_URL}/api/subjectsFromDepartment`;
  const complete_profile_api_url = `${BASE_URL}/api/users/completeProfile`;

  const [facultyOpen, setFacultyOpen] = useState(false);
  const [faculties, setFaculties] = useState([]);

  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [departments, setDepartments] = useState([]);

  const [yearsOpen, setYearsOpen] = useState(false)
  const [years, setYears] = useState([]);

  const [subjects, setSubjects] = useState([]);

  const [fieldEnabled, setFieldEnabled] = useState({
    department: false,
    year: false,
  });

  const getFaculties = async () => {
    try {
      const response = await axios.get(faculties_api_url);
      const formattedFaculties = response.data.map((faculty) => ({
        label: faculty.name,
        value: faculty.id,
      }));
      setFaculties(formattedFaculties);
    } catch(error) {
      console.log('Error fetching faculties: ', error);
    }
  }

  const getDepartments = async (facultyID) => {
    try {
      const response = await axios.get(departments_api_url, {
        params: {
          facultyid: String(facultyID)
        }
      });
      const formattedDepartments = response.data.map((department) => ({
        label: department.department_name,
        value: department.department_id,
        years: department.years
      }));
      setDepartments(formattedDepartments);
    } catch(error) {
      console.log('Error getting departments: ', error);
    }
  }

  const getYears = async (departmentID) => {
    const selectedDepartment = departments.find(
      (d) => d.value == departmentID
    );

    if(selectedDepartment) {
      const yearsList = Array.from(
        { length: selectedDepartment.years },
        (_, index) => ({
          label: String(index + 1), 
          value: String(index + 1),
        })
      );
      setYears(yearsList);
    }
  }

  const getSubjects = async (departmentID) => {
    try {
      const response = await axios.get(subjects_api_url, {
        params: {
          departmentID: String(departmentID)
        }
      });

      let filteredSubjects = response.data.filter(item => item.year <= year)

      const formattedSubjects = filteredSubjects.map((subject) => ({
        label: subject.name,
        value: subject.subject_id,
        year: subject.year
      }));

      const groupedSubjects = formattedSubjects.reduce((acc, subject) => {
        if (!acc[subject.year]) {
          acc[subject.year] = [];
        }
        acc[subject.year].push(subject);
        return acc;
      }, {});
  
      setSubjects(groupedSubjects);
      } catch(error) {
        console.log('Error getting subjects: ', error);
      }
  }

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
  }, [faculty, department, year])

  const handleInputChange = (value, field) => {
    if (field === 'firstName') {
        setFirstName(value);
    } else if (field === 'lastName') {
        setLastName(value);
    } else if (field === 'faculty') {
        setFaculty(value);
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
    console.log({
        userID,
        firstName,
        lastName,
        faculty,
        department,
        year,
        selectedSubjects
      });

    if(!selectedSubjects) {
        Alert.alert('Error', 'Fields were not filled');
        return;
    }

    try {
        const endpointResponse = await axios.put(
            complete_profile_api_url,
            {
                userID,
                firstName,
                lastName,
                faculty,
                department,
                year,
                selectedSubjects
            }
        );

        Alert.alert("Succes", "The password was changed.")
        setFirstName('');
        setLastName('');
        setFaculty('');
        setDepartment('');
        setYear('');
        setSelectedSubjects([]);

        navigation.navigate('UserLandingPage');
    } catch(error) {
        console.log(error.message);
        Alert.alert('Error', 'Could not change the password');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={(value) => handleInputChange(value, 'firstName')}
        editable={true}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={(value) => handleInputChange(value, 'lastName')}
        editable={true}
      />
      <DropDownPicker
        open={facultyOpen}
        value={faculty}
        items={faculties}
        setOpen={setFacultyOpen}
        setValue={setFaculty}
        setItems={setFaculty}
        placeholder="Select a faculty"
        containerStyle={{ zIndex: facultyOpen ? 2000 : 1000 }}
        dropDownContainerStyle={{ zIndex: 2000 }}
      />
      <DropDownPicker
        open={departmentOpen}
        value={department}
        items={departments}
        setOpen={setDepartmentOpen}
        setValue={(value) => {
            setDepartment(value);
        }}
        setItems={setDepartment}
        placeholder="Select a department"
        editable={fieldEnabled.department}
        dropDownContainerStyle={{ zIndex: 1000 }}
        containerStyle={{ zIndex: 1000 }}
      />
      <DropDownPicker
        open={yearsOpen}
        value={year}
        items={years}
        setOpen={setYearsOpen}
        setValue={(value) => {
            setYear(value);
        }}
        setItems={setYear}
        placeholder="Select your year"
        editable={fieldEnabled.years}
        dropDownContainerStyle={{ zIndex: 500 }}
        containerStyle={{ zIndex: 500 }}
      />

      <View>
        {Object.entries(subjects).map(([year, subjectsInYear]) => (
          <View key={year} style={{ marginBottom: 20 }}>
          <Text>
            Year {year}
          </Text>
          {subjectsInYear.map((subject, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.subjectItem,
                selectedSubjects.includes(subject.value) && styles.selectedItem,
              ]}
              onPress={() => toggleSelection(subject)}
            >
              <Text>{subject.label}</Text>
              {selectedSubjects.includes(subject.value) && (
                <Ionicons name="checkmark" size={20} color="green" />
              )}
            </TouchableOpacity>
        ))}
      </View>
    ))}
    </View>

      <Button
        title="Submit"
        onPress={handleSubmit}
        disabled={!year}
      />
    </View>
  );
};
