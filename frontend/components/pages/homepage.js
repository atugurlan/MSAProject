import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { screenWidth, screenHeight } from '../../config/constants';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontsize: 30,
    fontWeight: 'bold',
    color: '#F83758',
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#F83758',
    width: 0.3 * screenWidth,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontsize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
