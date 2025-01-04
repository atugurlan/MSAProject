import React, { createContext, useContext, useState } from 'react';

const LogoutContext = createContext();

export const LogoutProvider = ({ children }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const showLogoutModal = () => setModalVisible(true);
    const hideLogoutModal = () => setModalVisible(false);
    

    const logout = (setUser, navigation) => {
        hideLogoutModal();
        navigation.navigate('HomePage');
        setUser(null);
    }

    return (
        <LogoutContext.Provider value={{ modalVisible, showLogoutModal, hideLogoutModal, logout }}>
            {children}
        </LogoutContext.Provider>
    );
};

export const useLogout = () => useContext(LogoutContext);
