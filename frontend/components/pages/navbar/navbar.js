import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import { useLogout } from '../../context/LogoutContext';

import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';


export default function Navbar({ currentRoute }) {
    const user = useUser().user;
    const navigation = useNavigation();
    const { showLogoutModal } = useLogout();

    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const handlePress = (page) => {
        navigation.navigate(page);
    }

    const isUserOnPage = (page) => {
        return currentRoute === page;
    }

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);


    if (keyboardVisible) {
        return null;
    }

    return (
        <>
            {user != null && (
                <View style={styles.parentContainer}>
                    <View style={styles.container}>
                        {user.isadmin ? (
                            <>
                                <TouchableOpacity style={[styles.button, isUserOnPage('AdminLandingPage') && styles.activeButton]} onPress={() => handlePress('AdminLandingPage')}>
                                    <Ionicons name="home-outline" style={[styles.icon, isUserOnPage('AdminLandingPage') && styles.activeIcon]}></Ionicons>
                                    <Text style={[styles.buttonText, isUserOnPage('AdminLandingPage') && styles.activeButtonText]}>Home</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.button, isUserOnPage('GrantRequestPermissionPage') && styles.activeButton]} onPress={() => handlePress('GrantRequestPermissionPage')}>
                                    <Ionicons name="notifications-outline" style={[styles.icon, isUserOnPage('GrantRequestPermissionPage') && styles.activeIcon]}></Ionicons>
                                    <Text style={[styles.buttonText, isUserOnPage('GrantRequestPermissionPage') && styles.activeButtonText]}>Requests</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.button, isUserOnPage('ManageFacultiesPage') && styles.activeButton]} onPress={() => handlePress('ManageFacultiesPage')}>
                                    <Ionicons name="school-outline" style={[styles.icon, isUserOnPage('ManageFacultiesPage') && styles.activeIcon]}></Ionicons>
                                    <Text style={[styles.buttonText, isUserOnPage('ManageFacultiesPage') && styles.activeButtonText]}>Faculties</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.button, isUserOnPage('LogoutPage') && styles.activeButton]} onPress={() => showLogoutModal()}>
                                    <Ionicons name="log-out-outline" style={[styles.icon, isUserOnPage('LogoutPage') && styles.activeIcon]}></Ionicons>
                                    <Text style={[styles.buttonText, isUserOnPage('LogoutPage') && styles.activeButtonText]}>Log out</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
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

                                <TouchableOpacity style={[styles.button, isUserOnPage('LogoutPage') && styles.activeButton]} onPress={() => showLogoutModal()}>
                                    <Ionicons name="log-out-outline" style={[styles.icon, isUserOnPage('LogoutPage') && styles.activeIcon]}></Ionicons>
                                    <Text style={[styles.buttonText, isUserOnPage('LogoutPage') && styles.activeButtonText]}>Log out</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            )}
        </>
    );
}
