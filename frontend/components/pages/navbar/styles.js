import { StyleSheet } from 'react-native';

import { colors } from '../../../config/colors';
import { screenWidth, screenHeight } from '../../../config/constants';

export const styles = StyleSheet.create({
    parentContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 0, 0, 0.07)',
        borderRadius: 10,
        width: screenWidth * 0.9,
        height: screenHeight * 0.07,
    },
    button: {
        alignItems: 'center',
        height: '100%',
        paddingVertical: 5,
    },
    buttonText: {
        fontSize: 12,
        marginTop: 2,
    },
    icon: {
        fontSize: 22,
    },
    activeButton: {
        borderTopColor: colors.red,
        borderTopWidth: 2,
    },
    activeButtonText: {
        color: colors.red
    },
    activeIcon: {
        color: colors.red
    },
});