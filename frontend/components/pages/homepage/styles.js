import { StyleSheet } from 'react-native';
import { screenWidth } from '../../../config/constants';
import { colors } from '../../../config/colors';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontsize: 30,
      fontWeight: 'bold',
      color: colors.red,
      marginBottom: 50,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: colors.red,
      width: 0.3 * screenWidth,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: colors.white,
      fontsize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    }
});