import { StyleSheet } from 'react-native';

import {colors} from '../../../config/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 20,
  },
  welcomeCard: {
    width: '90%',
    backgroundColor: colors.red,
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  gridButton: {
    width: '40%',
    backgroundColor: 'rgba(255, 0, 0, 0.4)',
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
    fontWeight: '600',
  },
});
