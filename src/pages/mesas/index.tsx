import React, { useState } from "react";
import { View, Text, Image, Modal, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from "../../components/reutilizaveis/BottomMenu";

export default function Mesas() {
    const [mesaSelecionada, setMesaSelecionada] = useState<number | null>(null);
    const [ocupadas, setOcupadas] = useState<number[]>([4, 8, 10]); 
    const [modalVisible, setModalVisible] = useState(false);


    const toggleMesa = (mesa: number) => {
        if (ocupadas.includes(mesa)) return;
        setMesaSelecionada(mesa);
    };

    const handleSalvar = () => {
        setModalVisible(true);
    };

    const confirmarCriacao = () => {
        if (mesaSelecionada !== null && !ocupadas.includes(mesaSelecionada)) {
            setOcupadas(prev => [...prev, mesaSelecionada]);
            setMesaSelecionada(null);
        }
        setModalVisible(false);
    };

    return (
        <LinearGradient colors={['#D62828', '#701515']} style={styles.container}>
            <View style={styles.box}>
                {Array.from({ length: 16 }, (_, i) => {
                    const mesa = i + 1;
                    const isOcupada = ocupadas.includes(mesa);
                    const estiloBase = isOcupada ? styles.mesaOcupada : styles.mesaDisponivel;
                    const estiloMesa = [
                        estiloBase,
                        mesaSelecionada === mesa && !isOcupada ? styles.mesaSelecionada : null,
                    ];

                    return (
                        <TouchableOpacity key={mesa} style={estiloMesa} onPress={() => toggleMesa(mesa)}>
                            <Text style={styles.numMesa}>{mesa}</Text>
                            <Image
                                source={require('../../assets/adaptive-icon.png')}
                                style={{ width: 40, height: 40, marginBottom: '5%', opacity: 0.45, position: 'absolute' }}
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
