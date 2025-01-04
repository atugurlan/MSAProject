import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { useUser } from '../../context/UserContext';

export default function UserLandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>User Landing Page</Text>

      <TouchableOpacity title="ForumsPage" onPress={() => navigation.navigate('AllForumsPage')}>
        <Text>To Forums</Text>
      </TouchableOpacity>
    </View>
  );
}
