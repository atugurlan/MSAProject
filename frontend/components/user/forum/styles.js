import { StyleSheet } from 'react-native';
import { colors } from '../../../config/colors';
import { screenWidth } from '../../../config/constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.white,
        paddingVertical: 50,
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    listItem: {
        backgroundColor: colors.lightgrey,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        width: screenWidth * 0.8,
    },
    headerItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    username: {
        fontSize: 14,
        marginLeft: 10,
    },
    rightSide: {
        flexDirection: 'row',
        alignItems: 'center',
    }, 
    likesCount: {
        marginLeft: 4,
        fontSize: 14,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    button: {
        width: screenWidth * 0.6,
        backgroundColor: colors.red,
        paddingVertical: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center', 
        alignSelf: 'center',
    },
    noQuestions: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    noQuestionsText: {
        fontSize: 16,
    },
    floatingButton: {
        position: 'absolute', 
        left: screenWidth * 0.8,
        bottom: 10,
        backgroundColor: 'transparent',
        borderRadius: 30,
        zIndex: 10,
    },
    icon: {
        fontSize: 60,
        color: colors.red
    }
});
