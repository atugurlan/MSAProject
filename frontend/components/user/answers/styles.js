import { StyleSheet } from "react-native";
import { colors } from '../../../config/colors';
import { screenHeight, screenWidth } from '../../../config/constants';

export const styles = StyleSheet.create({
    container: {
        marginTop: -screenHeight * 0.05,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    answerContainer: {
        padding: 15,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontStyle: 'italic',
        color: colors.grey,
        marginBottom: 5,
    },
    answerText: {
        fontSize: 14,
    },
    anonymousContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    anonymousLabel: {
        fontSize: 14,
        fontStyle: 'italic',
        color: colors.grey,
        left: screenWidth * 0.5
    },
    inputContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingBottom: 10, 
        paddingHorizontal: 10,
        backgroundColor: colors.white, 
        borderBottomWidth: 1, 
        borderColor: colors.lightgrey,
    },
    input: {
        flex: 1,
        height: 40, 
        paddingHorizontal: 10, 
        borderRadius: 20, 
        backgroundColor: colors.lightgrey,
        marginRight: 10, 
    },
    sendButton: {
        backgroundColor: colors.white, 
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        justifyContent: 'center',
        alignItems: 'center', 
    },
});