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
    header: {
        marginTop: 40,
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
    leftSide: {
        width: screenWidth * 0.9,
    },
    listItem: {
        width: screenWidth * 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        flex: 1,
    },
    button: {
        flexDirection: 'row',
        height: screenHeight * 0.07,
        width: screenWidth * 0.4,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: colors.red,
        borderRadius: 10, 
        alignItems: 'center',
        justifyContent: 'center',
        left: screenWidth * 0.25
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        marginTop: 10,
    },
  });