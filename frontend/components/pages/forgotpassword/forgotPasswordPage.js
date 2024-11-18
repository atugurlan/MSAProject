import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassowrd] = useState('');
  const api_url = `${BASE_URL}/api/users/changePassword`;

  const changePassword = async () => {
    if(!email || !password || !confirmPassword) {
        Alert.alert('Error', 'All fields should be filled');
        return;
    }

    console.log('here');

    try {
        const endpointResponse = await axios.put(
            api_url,
            {
                email,
                password,
                confirmPassword,
            }
        );

        Alert.alert("Succes", "The password was changed.")
        setEmail('');
        setPassword('');
        setConfirmPassowrd('');
    } catch(error) {
        console.log(error.message);
        Alert.alert('Error', 'Could not change the password');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password Page</Text>

      <View style={styles.input}>
        <TextInput 
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.input}>
        <TextInput 
          placeholder='New Password'
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.input}>
        <TextInput 
          placeholder='Confirm New Password' 
          value={confirmPassword}
          onChangeText={setConfirmPassowrd}/>
      </View>

      <TouchableOpacity style={styles.button} onPress={changePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
}
