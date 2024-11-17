import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default function LoginPage({}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        // navigate to admin page
      }
      else {
        // navigate to user page
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
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={loginUser}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
