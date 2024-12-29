import { StyleSheet } from 'react-native';
import { colors } from '../../../config/colors';

export const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: colors.white,
    },
});