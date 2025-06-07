import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        
    },

    box: {
        backgroundColor: "#D9D9D9",
        width: "70%",
        height: "50%",
        borderRadius: 5,

        flexDirection: "row",
        flexWrap: "wrap",
        gap: 15,

        alignItems: "center",
        justifyContent: "center",
        

        shadowColor: "#171717",      
        shadowOffset: {width: -3, height: 5},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },

    mesaDisponivel: {
        marginTop: 10,
        width: 50,
        height: 50,

        backgroundColor: "#0A411B",
        borderRadius: 2,

        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    mesaOcupada: { 
        marginTop: 10,
        width: 50,
        height: 50,

        backgroundColor: "#720000",
        borderRadius: 2,

        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    numMesa: {
        color: "white",
        fontSize: 20
    },

    formQTD: {
        marginTop: 20,
        width: "70%",
        alignItems: "center",
        gap: 10,
    },

    input: {
        backgroundColor: "#fff",
        width: "100%",

        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        
    },

    button: {
        backgroundColor: "#000",
        padding: 10,
        borderRadius: 4,
        width: "100%"
    },

    mesaSelecionada: {
        borderWidth: 2,
        borderColor: "#720000",
    }



})