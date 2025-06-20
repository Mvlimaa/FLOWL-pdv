import { Button, StyleSheet } from "react-native";




export const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
         
    },

    title: {
      fontFamily: 'Pacifico',
      color: "white",
      fontSize: 50,
      marginTop: 10,
      marginBottom: 440,
      textAlign: "center",
    },

    box: {
      position: "absolute",
      bottom: 0,

      backgroundColor: "white",
      width: "100%",
      height: "55%",
      padding: 16,
      borderRadius: 40,

      alignItems: "center",
      justifyContent: "center"
    },

    inputs: {
      justifyContent: "center",
      alignItems: "center",
    },

    input: {
      backgroundColor: "#f1f1f1",
      paddingVertical: 10,
      paddingHorizontal: 120,
      borderRadius: 8,
      
      alignItems: "center",
      justifyContent: "center"
    },

    button: {
      backgroundColor: "#000",

      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 85,
      borderRadius: 8
    },

    warn: {
      color: "blue",
      
      fontSize: 20,
      textAlign: "center",
      marginTop: "10%"
    },

    buttonText: {
      color: "#fff",
      textAlign: "center",
    },
  });