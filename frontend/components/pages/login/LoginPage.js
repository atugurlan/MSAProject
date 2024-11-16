import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import { styles } from './styles';

export default function LoginPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <StatusBar style="auto" />
    </View>
  );
}
