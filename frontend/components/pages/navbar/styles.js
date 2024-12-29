import { StyleSheet } from 'react-native';

import { colors } from '../../../config/colors';
import { screenWidth, screenHeight } from '../../../config/constants';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        padding: 20,
    },
    buttonText: {
        fontSize: 12,
        marginTop: 2,
        color: colors.grey
    },
    icon: {
        fontSize: 22,
    }
});