import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const api_url = `${BASE_URL}/api/users/login`;

  const loginUser = async () => {
    if(!email || !password ) {
      Alert.alert('Error', 'All the fields are mandatory. Please fill all of them!');
      return;
    }

    try {
      const endpointResponse = await axios.post(
        api_url,
        {
          email,
          password,
        },
      );

      setEmail('');
      setPassword('');

      const user = endpointResponse.data.user;
      
      if( user.isadmin == true) {
        navigation.navigate('AdminLandingPage');
      }
      else {
        navigation.navigate('UserLandingPage');
      }
    } catch(error) {
      Alert.alert('Error', 'Could not login into account');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      
      <View style={styles.input}>
        <TextInput
          placeholder='Email'
          style={styles.uploadText}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.input}>
        <TextInput
          placeholder='Password'
          style={styles.uploadText}
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => navigation.navigate('ForgotPasswordPage')}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={loginUser}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
