import { StyleSheet } from "react-native";
import { colors } from '../../../config/colors';
import { screenHeight } from '../../../config/constants';

export const styles = StyleSheet.create({
    container: {
        marginTop: -screenHeight * 0.05,
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
});