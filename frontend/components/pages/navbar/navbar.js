import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';

import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

export default function Navbar({ currentRoute }) {
    const user = useUser().user;
    const navigation = useNavigation();

    const handlePress = (page) => {
        navigation.navigate(page);
    }

    const isUserOnPage = (page) => {
        return currentRoute === page;
    }

    return (
        <>
            {(user != null && !user.isadmin) && (
                <View style={styles.parentContainer}>
                    <View style={styles.container}>
                        <TouchableOpacity style={[styles.button, isUserOnPage('UserLandingPage') && styles.activeButton]} onPress={() => navigation.navigate('UserLandingPage', { user: user })}>
                            <Ionicons name="home-outline" style={[styles.icon, isUserOnPage('UserLandingPage') && styles.activeIcon]}></Ionicons>
                            <Text style={[styles.buttonText, isUserOnPage('UserLandingPage') && styles.activeButtonText]}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, isUserOnPage('AllForumsPage') && styles.activeButton]} onPress={() => navigation.navigate('AllForumsPage', { userInfo: user })}>
                            <Ionicons name="document-text-outline" style={[styles.icon, isUserOnPage('AllForumsPage') && styles.activeIcon]}></Ionicons>
                            <Text style={[styles.buttonText, isUserOnPage('AllForumsPage') && styles.activeButtonText]}>Forums</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <Ionicons name="person-outline" style={styles.icon}></Ionicons>
                            <Text style={styles.buttonText}>Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <Ionicons name="log-out-outline" style={styles.icon}></Ionicons>
                            <Text style={styles.buttonText}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
}
