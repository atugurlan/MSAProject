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
                        <TouchableOpacity style={[styles.button, isUserOnPage('UserLandingPage') && styles.activeButton]} onPress={() => handlePress('UserLandingPage')}>
                            <Ionicons name="home-outline" style={[styles.icon, isUserOnPage('UserLandingPage') && styles.activeIcon]}></Ionicons>
                            <Text style={[styles.buttonText, isUserOnPage('UserLandingPage') && styles.activeButtonText]}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, isUserOnPage('AllForumsPage') && styles.activeButton]} onPress={() => handlePress('AllForumsPage')}>
                            <Ionicons name="document-text-outline" style={[styles.icon, isUserOnPage('AllForumsPage') && styles.activeIcon]}></Ionicons>
                            <Text style={[styles.buttonText, isUserOnPage('AllForumsPage') && styles.activeButtonText]}>Forums</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, isUserOnPage('ProfilePage') && styles.activeButton]} onPress={() => handlePress('ProfilePage')}>
                            <Ionicons name="person-outline" style={[styles.icon, isUserOnPage('ProfilePage') && styles.activeIcon]}></Ionicons>
                            <Text style={[styles.buttonText, isUserOnPage('ProfilePage') && styles.activeButtonText]}>Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, isUserOnPage('LogoutPage') && styles.activeButton]} onPress={() => handlePress('LogoutPage')}>
                            <Ionicons name="log-out-outline" style={[styles.icon, isUserOnPage('LogoutPage') && styles.activeIcon]}></Ionicons>
                            <Text style={[styles.buttonText, isUserOnPage('LogoutPage') && styles.activeButtonText]}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
}
