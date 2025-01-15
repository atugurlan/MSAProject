import { StyleSheet } from "react-native";
import { colors } from "../../../config/colors";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    paddingTop: 40,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  dropDownContainer: {
    marginBottom: 20,
  },
  dropDownStyle: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  subjectsContainer: {
    marginTop: 20,
  },
  yearSection: {
    marginBottom: 20,
  },
  yearTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  subjectItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedItem: {
    backgroundColor: '#e0f7e9',
    borderColor: 'green',
  },
  subjectLabel: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: colors.red,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 100,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});