import { StyleSheet } from "react-native";
import { colors } from "../../../../config/colors";
import { screenHeight, screenWidth } from "../../../../config/constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.white,
        paddingTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    statusText: {
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    bullet: {
        fontSize: 18,
        marginRight: 5,
        color: '#333',
    },
    listText: {
        fontSize: 16,
        color: '#555',
    },
});