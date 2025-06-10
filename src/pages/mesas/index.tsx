import React, { useState, useEffect } from "react";
import api from "../../axios/api";
import { View, Text, Image, Modal, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from "../../components/reutilizaveis/BottomMenu";

export default function Mesas() {

    
    const [mesaSelecionada, setMesaSelecionada] = useState<number | null>(null);
    const [mesas, setMesas] = useState<{ id: number; numero: number; status: string; }[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    
    useEffect(() => {
        const buscarMesas = async () => {
            try {
                const response = await api.get("/mesas");
                console.log("Mesas da API: ", response.data)
                setMesas(response.data);
            } catch (error) {
                console.error("Erro ao buscar mesas:", error);
            }
        };
        
        buscarMesas();
    }, []);
    
    const mesasAbertas = mesas.filter((mesa) => mesa.status === "aberta")

    const toggleMesa = (mesaId: number) => {
        const mesaInfo = mesas.find((m) => m.id === mesaId);
        if(mesaInfo?.status ==="aberta") return;
        setMesaSelecionada(mesaId)
    };

    const handleSalvar = () => {
        setModalVisible(true);
    };

    const confirmarCriacao = async () => {
        if (mesaSelecionada === null) return;

        try {
            await api.put(`/mesas/${mesaSelecionada}/status?status=aberta`);

            setMesas(prevMesas =>
                prevMesas.map((m) =>
                    m.id === mesaSelecionada ? { ...m, status: "aberta"} : m
                )
            );
        

        setMesaSelecionada(null);
        setModalVisible(false);
    } catch (error: any) {
        console.error("erro ao atualizar a mesa:", error);
        console.log("Erro completo", error)
    };
}

    return (
        <LinearGradient colors={['#D62828', '#701515']} style={styles.container}>
            <View style={styles.box}>
                {mesas.map((mesa) => {
                    const isOcupada = mesa.status === "aberta";
                    const isSelecionada = mesaSelecionada === mesa.id;

                    const estiloBase = isOcupada ? styles.mesaOcupada : styles.mesaDisponivel;
                    const estiloMesa = [
                        estiloBase,
                        isSelecionada && !isOcupada ? styles.mesaSelecionada : null,
                    ];

                    return (
                        <TouchableOpacity
                            key={mesa.id}
                            style={estiloMesa}
                            onPress={() => {
                                if (!isOcupada) setMesaSelecionada(mesa.id);
                            }}
                        >
                            <Text style={styles.numMesa}>{mesa.numero}</Text>
                            <Image
                                source={require("../../assets/adaptive-icon.png")}
                                style={{
                                    width: 40,
                                    height: 40,
                                    marginBottom: "5%",
                                    opacity: 0.45,
                                    position: "absolute",
                                }}
                            />

                        </TouchableOpacity>
                    );
                    
                })}
            </View>

            <View style={styles.formQTD}>
                
               
                <TouchableOpacity onPress={handleSalvar} style={{
                    backgroundColor: "#0A411B",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 5
                }}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Salvar</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >

                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>

                    <View style={{
                        backgroundColor: "white",
                        padding: 25,
                        borderRadius: 10,
                        width: "80%",
                        alignItems: "center"
                    }}>

                        <Text style={{ fontSize: 18, marginBottom: 15, textAlign: 'center' }}>
                            Tem certeza que deseja ocupar esta mesa?
                        </Text>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                            <TouchableOpacity onPress={confirmarCriacao} style={{ flex: 1, alignItems: "center" }}>
                                <Text style={{ color: "green", fontWeight: "bold" }}>Confirmar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ flex: 1, alignItems: "center" }}>
                                <Text style={{ color: "red", fontWeight: "bold" }}>Cancelar</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>

            <BottomMenu />
        </LinearGradient>
    );
}
