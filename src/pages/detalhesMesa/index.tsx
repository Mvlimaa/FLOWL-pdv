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
            
            

            
            
            
            
        

            <BottomMenu />
        </LinearGradient>



    )



}
