import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';

import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

export default function Navbar() {
    const user = useUser().user;
    const navigation = useNavigation();

    const handlePress = (page) => {
        navigation.navigate(page);
    }

    return (
        <>
            {user != null && (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserLandingPage', {user: user})}>
                        <Ionicons name="home-outline" style={styles.icon}></Ionicons>
                        <Text style={styles.buttonText}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Ionicons name="person-outline" style={styles.icon}></Ionicons>
                        <Text style={styles.buttonText}>Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Ionicons name="document-text-outline" style={styles.icon}></Ionicons>
                        <Text style={styles.buttonText}>Forums</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Ionicons name="log-out-outline" style={styles.icon}></Ionicons>
                        <Text style={styles.buttonText}>Log out</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
}
