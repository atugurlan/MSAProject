import { StyleSheet } from "react-native";
import { colors } from "../../../config/colors";
import { screenHeight, screenWidth } from "../../../config/constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    listContainer: {
        width: screenWidth,
    },
    listItem: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
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
  });