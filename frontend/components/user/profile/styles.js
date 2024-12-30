import { StyleSheet } from "react-native";
import { colors } from '../../../config/colors';
import { screenHeight, screenWidth } from '../../../config/constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.white
    },
    header: {
        fontSize: 24,
        top: 10,
        fontWeight: 'bold',
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 10,
    },
    infoContainer: {
        marginBottom: 15,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    value: {
        color: '#333',
        fontSize: 16,
        marginBottom: 10,
    },
    subjectContainer: {
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    subject: {
        fontSize: 14,
    },
    changePasswordText: {
        color: colors.red,
        textAlign: 'right',
        marginTop: 5,
    },
});