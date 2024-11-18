import { Text, TextInput, View, TouchableOpacity } from 'react-native';

import { styles } from './styles';

export default function ForgotPasswordPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password Page</Text>

      <View style={styles.input}>
        <TextInput placeholder='New Password'/>
      </View>

      <View style={styles.input}>
        <TextInput placeholder='Confirm New Password'/>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
}
