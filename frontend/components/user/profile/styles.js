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
    editButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    editButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    saveButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    saveButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
    },
    cancelButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    subjectContainer: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedSubject: {
        backgroundColor: '#cce6ff',
        borderColor: '#cce0ff',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    listItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        width: '100%',
    },
    listItemText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: colors.red,
        borderRadius: 8,
        alignItems: 'center',
        width: '90%',
    },
    closeButtonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
});