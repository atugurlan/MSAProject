import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export default function HomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>UPThreads</Text>
      <StatusBar style="auto" />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} title="Login" onPress={() => navigation.navigate('LoginPage')}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} title="Sign Up" onPress={() => navigation.navigate('SignUpPage')}>
            <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
