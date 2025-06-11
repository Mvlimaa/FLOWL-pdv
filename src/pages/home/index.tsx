import BottomMenu from "../../components/reutilizaveis/BottomMenu";
import React, { useState, useEffect } from "react";
import { View, Text, Image, Modal, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { styles } from "./styles";
import api from "../../axios/api";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



export default function Home() {        // Pega na API as mesas abertas e exibe na tela inicial
    const navigation = useNavigation();

    const [mesasAbertas, setMesasAbertas] = useState<{ id: number; numero: number; status: string } []>([]);

    useEffect(() => {
        const buscarMesasAbertas = async () => {
            try {
                const response = await api.get("/mesas/abertas");
                setMesasAbertas(response.data);
            } catch (error) {
                console.error("Erro ao buscar mesas abertas: ", error)
            }
        };

        buscarMesasAbertas();
    }, []);

    return (

        <LinearGradient colors={['#7E7E7E', '#FAFAFA']} style={styles.container}>
            
            <View 
            style={styles.logo}>
                <Image 
                    source={require('../../assets/icon-hamburgueria.png')}
                    style={{ width: 125, height: 125 }}
                />
                <Text 
                    style={{ textAlign: "center",
                    fontSize: 15,
                    fontFamily: 'Pacifico',
                    color: "white" }}> Brabu's Burguer 
                </Text>
            </View>

            <View 
            style={styles.box}>
                {mesasAbertas.map((mesa) => (
                    <TouchableOpacity
                    key={mesa.id}
                    style={styles.mesa}
                    onPress={() => navigation.navigate('DetalhesMesa', { mesa })}
                    >
                        <Text 
                            style={{ fontSize: 15, 
                            color: "black", 
                            fontFamily: 'Pacifico', 
                            marginLeft: 10 }}>Mesa {mesa.numero}
                        </Text>

                        <Image 
                        source={require("../../assets/next.png")}
                        style={{
                            width: 25,
                            height:25,
                            marginLeft: "80%",
                            opacity: 0.45,
                            position: "absolute",
                        }}
                    />
                    </TouchableOpacity>
                ))}

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
