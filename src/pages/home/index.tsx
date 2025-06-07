import React, { useState } from "react";
import { View, Text, Image, Modal, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from "../../components/reutilizaveis/BottomMenu";
import { useNavigation } from "@react-navigation/native";


export default function Home() {
    const navigation = useNavigation();


    return (

        <LinearGradient colors={['#D62828', '#701515']} style={styles.container}>
            
            <View style={styles.logo}>
                <Image 
                    source={require('../../assets/adaptive-icon.png')}
                    style={{ width: 125, height: 125 }}
                />
                <Text style={{ textAlign: "center",fontSize: 15, fontFamily: 'Pacifico', color: "white" }}> Brabu's Burguer 
                </Text>
            </View>

            <View style={styles.box}>
                <TouchableOpacity onPress={() => navigation.navigate("DetalhesMesa")} 
                style={styles.mesa}>
                    
                    <Text style={{ fontSize: 15,   marginLeft: 10, alignItems:"center" }}    >Mesa 1
                    <Image 
                    source={require('../../assets/next.png')}
                    style={{ width: 15, height: 15,    marginLeft: "70%", marginTop: 4,   alignItems: "center" }}
                    />
                    </Text>

                </TouchableOpacity>
                

            </View>

            
            
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("Mesas")}>
                <Text style={styles.buttonText}>Ir para mesas</ Text>
              </TouchableOpacity>

            <BottomMenu />
        </LinearGradient>



    )



}
