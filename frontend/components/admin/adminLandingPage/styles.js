import { StyleSheet } from "react-native";
import { colors } from "../../../config/colors";
import { screenHeight, screenWidth } from "../../../config/constants";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
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
    }
  });