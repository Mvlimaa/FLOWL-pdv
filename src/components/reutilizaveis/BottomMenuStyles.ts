import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    menuContainer: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center", 
        paddingVertical: 20,
        backgroundColor: "#FF0000", 
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        width: "100%",
    }
});
