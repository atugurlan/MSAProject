import { StyleSheet } from "react-native";
import { colors } from "../../../../config/colors";
import { screenHeight, screenWidth } from "../../../../config/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  forum: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  inputContainer: {
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
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 10,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
  
});