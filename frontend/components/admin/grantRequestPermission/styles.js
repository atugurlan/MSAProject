import { StyleSheet } from 'react-native';
import { colors } from '../../../config/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.white,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    requestContainer: {
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 5,
    },
    id: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    document: {
        width: 150,
        height: 150,
        marginTop: 10,
        borderRadius: 5,
    },
});