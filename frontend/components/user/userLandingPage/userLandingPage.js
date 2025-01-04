import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useUser } from '../../context/UserContext';

export default function UserLandingPage({ navigation }) {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>Welcome, {user.firstname} {user.lastname}!</Text>
      </View>

      <View style={styles.buttonGrid}>
        <TouchableOpacity 
          style={styles.gridButton} 
          onPress={() => navigation.navigate('AllForumsPage')}
        >
          <Ionicons name="document-text-outline" size={32} color="white" />
          <Text style={styles.buttonText}>Forums</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.gridButton} 
          onPress={() => navigation.navigate('ProfilePage')}
        >
          <Ionicons name="person-outline" size={32} color="white" />
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
