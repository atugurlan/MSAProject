import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

export default function AdminLandingPage({ navigation }) {  
  return (
    <View style={styles.container}>
      <Text>Admin Landing Page</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GrantRequestPermissionPage')}>
        <Text style={styles.text}>Manage Requests</Text>

        <Ionicons
            name="arrow-forward"
            style={styles.icon}
          />
      </TouchableOpacity>
    </View>
  );
}
