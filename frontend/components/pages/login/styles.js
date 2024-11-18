import { StyleSheet } from 'react-native';

import { colors } from '../../../config/colors';
import { screenWidth, screenHeight } from '../../../config/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  input: {
    flexDirection: 'row',
    height: screenHeight * 0.08,
    width: screenWidth * 0.9,
    alignItems: 'center',
    backgroundColor: colors.lightgrey,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  uploadText: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    color: colors.greyText,
  },
  forgotPasswordContainer: {
    width: screenWidth * 0.9,
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  forgotPassword: {
    color: colors.red,
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.red,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    size: 20,
    color: colors.icons,
  },
});