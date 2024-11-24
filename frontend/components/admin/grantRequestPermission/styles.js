import { StyleSheet } from 'react-native';
import { colors } from '../../../config/colors';
import { screenWidth, screenHeight } from '../../../config/constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.white,
    },
    firstRow: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    filterButton: {
        marginLeft: 250,
        right: 10,
        top: 10,
    },
    filterIcon: {
        fontSize: 20,   
    },
    dropdown: {
        width: 0.25 * screenWidth,
        right: 0.2 * screenWidth,
    },
    filterItem: {
        flexDirection: 'row',
    },
    filterIcon: {
        fontSize: 20,
        marginRight: 10,
    },
    filterText: {
        fontSize: 15,
    },
    requestContainer: {
        flexDirection: 'row',
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
    leftView: {
        width: screenWidth * 0.5,
    },
    rightView: {
        width: screenWidth * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    acceptButton: {
        flexDirection: 'row',
        backgroundColor: '#0f0',
        borderRadius: 10,
        height: screenHeight * 0.05,
        width: screenWidth * 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
    declineButton: {
        flexDirection: 'row',
        backgroundColor: '#f00',
        borderRadius: 10,
        height: screenHeight * 0.05,
        width: screenWidth * 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
    textButton: {
        textAlign: 'center',
        color: colors.white,
    },
    statusText: {
        fontStyle: 'italic',
        fontSize: 16,
        lineHeight: 20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: screenWidth * 0.9,
        height: screenHeight * 0.8,
        resizeMode: 'contain',
    },
    closeIcon: {
        fontSize: 30,
        color: colors.white,
        right: -screenWidth * 0.35,
    },
    imageContainer: {
        flexDirection: 'column',
    },
    lensContainer: {
        position: 'absolute',
        right: 0.15 * screenWidth,
        bottom: 10,
        width: screenWidth * 0.09,
        height: screenHeight * 0.045,
        backgroundColor: colors.white,
        borderRadius: 20,
        borderColor: '#000',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    loopIcon: {
        fontSize: 20,
    }
});