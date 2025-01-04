import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';
import { useUser } from '../../context/UserContext';

export default function ChangePasswordPage({ navigation }) {
    const { user } = useUser();

    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const api_url = `${BASE_URL}/api/users/changePassword`;

    const changePassword = async () => {
        if (!password || !confirmPassword) {
            Alert.alert('Error', 'All fields should be filled');
            return;
        }

        try {
            const endpointResponse = await axios.put(
                api_url,
                {
                    email: user.email,
                    password,
                    confirmPassword,
                }
            );

            Alert.alert("Succes", "The password was changed.");
            user.password = password;

            console.log(user);
            setPassword('');
            setConfirmPassword('');
            navigation.navigate('ProfilePage');
        } catch (error) {
            console.log(error.message);
            Alert.alert('Error', 'Could not change the password');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Password Page</Text>

            <View style={styles.input}>
                <TextInput
                    placeholder='New Password'
                    value={password}
                    style={styles.uploadText}
                    secureTextEntry={!passwordVisible}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Ionicons
                        name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.input}>
                <TextInput
                    placeholder='Confirm New Password'
                    value={confirmPassword}
                    style={styles.uploadText}
                    secureTextEntry={!confirmPasswordVisible}
                    onChangeText={setConfirmPassword} />
                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                    <Ionicons
                        name={confirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={changePassword}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
        </View>
    );
}
