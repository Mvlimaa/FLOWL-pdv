import { Button, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    logo: {
        flexDirection: "column",
    },

    box: {
        width: "85%",
        height: "55%",
        backgroundColor: "#FFFFFF",

        borderRadius: 10,
        marginTop: 25,
        marginBottom: 10,

        alignItems: "center",
        justifyContent: "flex-start",
    },

    mesa: {
        width: "90%",
        height: "7%",
        backgroundColor: "white",
        marginTop: 15,

        borderRadius: 4,
        borderWidth: 2,
        borderColor: "purple",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },

    button: {
        backgroundColor: "#000",
        borderRadius: 8,
        
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 85,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },

    buttonText: {
        color: "#fff",
        textAlign: "center",
        backgroundColor: "black"
    },
})