import { Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

export default function SubjectInformationPage({ route }) {
  const { subject } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subject.name}</Text>
      <Text style={styles.infoText}>Professor's name: {subject.proffesor}</Text>
      <Text style={styles.infoText}>Year: {subject.year}</Text>
      <Text style={styles.infoText}>Semester: {subject.semester}</Text>

      <View style={styles.statusContainer}>
        <Ionicons
          name={subject.is_enabled ? 'lock-open-outline' : 'lock-closed-outline'}
          size={24}
          color={subject.is_enabled ? 'green' : 'red'}
        />
        <Text style={[styles.statusText, { color: subject.is_enabled ? 'green' : 'red' }]}>
          {subject.is_enabled ? 'Active' : 'Inactive'}
        </Text>
      </View>

      <Text style={styles.subtitle}>Lab assistants:</Text>
      <FlatList
        data={subject.lab_assistants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}
