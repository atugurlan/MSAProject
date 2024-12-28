import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from '../../../config/constants';
import { colors } from '../../../config/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.white,
        paddingTop: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    author: {
        fontSize: 16,
        marginBottom: 5,
        fontStyle: 'italic'
    },
    content: {
        fontSize: 14,
        marginBottom: 15,
    },
    fileContainer: {
        width: screenWidth * 0.2,
        height: screenHeight * 0.2,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.lightgrey,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    unknownFileText: {
        color: colors.lightgrey,
        fontSize: 12,
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20,
        color: '#000',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'relative',
    },
    modalImage: {
        width: '90%',
        height: '70%',
        resizeMode: 'contain',
        borderRadius: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
    },
    navButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    navButtonLeft: {
        right: screenWidth * 0.35,
        transform: [{ translateY: - 0.35 * screenHeight }],
    },
    navButtonRight: {
        left: screenWidth * 0.35,
        transform: [{ translateY: - 0.35 * screenHeight }],
    },
    viewAllButton: {
        padding: 5,
        width: screenWidth * 0.15,
        left: screenWidth * 0.8,
        borderWidth: 2,
        borderColor: colors.grey,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateY: - 0.13 * screenHeight }],
    },
    row: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap',
    }
});