import { StyleSheet } from "react-native";
import { colors } from "../../../../config/colors";
import { screenHeight, screenWidth } from "../../../../config/constants";

export const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    height: screenHeight * 0.07,
    width: screenWidth * 0.6,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderColor: colors.grey, 
    borderWidth: 2, 
    borderRadius: 10, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
    color: colors.icons,
  },
  text: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    height: screenHeight * 0.07,
    width: screenWidth * 0.8,
    marginVertical: 10,
    borderColor: colors.grey,
    borderWidth: 2,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
  }
});