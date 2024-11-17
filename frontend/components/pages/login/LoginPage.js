import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

export default function LoginPage({}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      
      <View style={styles.input}>
        <TextInput
          placeholder='Email'
          style={styles.uploadText}
        />
      </View>

      <View style={styles.input}>
        <TextInput
          placeholder='Password'
          style={styles.uploadText}
        />
      </View>

      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
