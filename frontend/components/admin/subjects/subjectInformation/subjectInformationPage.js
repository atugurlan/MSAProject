import { Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function SubjectInformationPage({ route }) {
  const { subject } = route.params;

  return (
    <View>
      <Text>{subject.name}</Text>
      <Text>Proffesor's name: {subject.proffesor}</Text>

      <Text>Year: {subject.year}</Text>
      <Text>Semester: {subject.semester}</Text>

      <Ionicons
        name={subject.is_enabled ? 'lock-open-outline' : 'lock-closed-outline'}
      />
      <Text>
        {subject.is_enabled ? 'Active' : 'Inactive'}
      </Text>

      <Text>Lab assistances:</Text>
      <FlatList 
          data={subject.lab_assistants}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>•</Text>
              <Text>{item}</Text>
            </View>
          )}  
      />
    </View>
  );
}
