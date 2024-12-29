import React from 'react';
import { Text, TouchableOpacity, View, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import { useLogout } from '../../context/LogoutContext';

import { styles } from './styles';

export default function LogoutPage() {
    const { setUser } = useUser();
    const navigation = useNavigation();
    const { modalVisible, hideLogoutModal, logout } = useLogout();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={hideLogoutModal}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <Text>Are you sure you want to logout?</Text>

                    <TouchableOpacity style={styles.modalButton} onPress={() => logout(setUser, navigation)}>
                        <Text>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={() => hideLogoutModal()}>
                        <Text>No</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
