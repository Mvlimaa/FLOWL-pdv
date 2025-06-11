import { Button, StyleSheet } from "react-native";


export const style = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',

        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        marginBottom: '30%'
    },
    button:{
        backgroundColor:'black',
        width:225,
        height: 90,
        borderRadius: 25,

        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.4,
        shadowRadius: 7,
        elevation: 3,
    },
    text:{
        fontFamily: 'Pacifico',
        fontSize: 25,
        color:'white',
        textAlign: 'center',
    }
})