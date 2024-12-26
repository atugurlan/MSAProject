import { StyleSheet } from 'react-native';
import { colors } from '../../../config/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 16,
        paddingTop: 50,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
    },
    toggleButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
    },
    activeToggleButton: {
        borderBottomColor: 'black',
    },
    inactiveToggleButton: {
        borderBottomColor: 'transparent',
    },
    toggleText: {
        fontSize: 16,
    },
    activeToggleText: {
        fontWeight: 'bold',
    },
    listContainer: {
        flex: 1,
    },
    listItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
    },
    listItemText: {
        fontSize: 16,
    },
});
