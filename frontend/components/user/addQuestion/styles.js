import { StyleSheet } from "react-native";

import { colors } from "../../../config/colors";
import { screenHeight, screenWidth } from "../../../config/constants";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
        borderColor: colors.grey,
    },
    uploadText: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10,
        color: colors.greyText,
    },
    anonymousContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: screenWidth * 0.9,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    anonymousText: {
        fontSize: 16,
        color: colors.greyText,
    },    
    filesButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 15,
        alignItems: 'center',
    },
    fileList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: colors.red,
        width: 0.9 * screenWidth,
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
});