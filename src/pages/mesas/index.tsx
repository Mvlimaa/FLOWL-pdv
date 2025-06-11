import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import { View, Text, Image, Modal, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import api from "../../axios/api";
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from "../../components/reutilizaveis/BottomMenu";
import { useNavigation } from "@react-navigation/native";

export default function Mesas() { 
    const navigation = useNavigation();


    const [mesaSelecionada, setMesaSelecionada] = useState<number | null>(null);                // Estado para a mesa selecionada
    const [mesas, setMesas] = useState<{ id: number; numero: number; status: string; }[]>([]);  // Estado para armazenar as mesas obtidas da API
    const [modalVisible, setModalVisible] = useState(false);                                    // Modal para confirmar a criação da mesa
    
    useEffect(() => {                           // Busca mesas na API 
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
    
    const mesasAbertas = mesas.filter((mesa) => mesa.status === "aberta")            // Filtra por mesas abertas

    const toggleMesa = (mesaId: number) => {                                         // Função para selecionar uma mesa                                           
        const mesaInfo = mesas.find((m) => m.id === mesaId);
        if(mesaInfo?.status ==="aberta") return;
        setMesaSelecionada(mesaId)
    };

    const handleSalvar = async () => {

      if (mesaSelecionada === null) return;
      try {
        setModalVisible(true);                                  
        await api.put(`/mesas/${mesaSelecionada}/status?status=aberta`);            // Atualiza o status da mesa selecionada para "aberta" na API Após a confirmação do MODAL
        setMesas(prevMesas =>
          prevMesas.map((m) =>
            m.id === mesaSelecionada ? { ...m, status: "aberta"} : m
          )
        ); 
        const mesa = mesas.find(m => m.id === mesaSelecionada);                    
        } catch (error) {
        console.error("erro ao atualizar a mesa:", error);
      }
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
        
            // Navega para a tela da mesa aberta após confirmação
            const mesa = mesas.find(m => m.id === mesaSelecionada);             
            if (mesa) {
                navigation.navigate("DetalhesMesa", { mesa });                  // Navega para a tela de detalhes após abrir a mesa
            }
        
            setMesaSelecionada(null);                                           // Limpa a mesa selecionada após a confirmação
            setModalVisible(false);                                             // Fecha o modal
        } catch (error: any) {
            console.error("erro ao atualizar a mesa:", error);
            console.log("Erro completo", error)
        }
    };

 return (
    <LinearGradient colors={['#7E7E7E', '#FAFAFA']} style={styles.container}>
        <Image
            source={require('../../assets/icon-hamburgueria.png')}
            style={{ width: 170, height: 170, marginBottom: 60 }}
        />
        <View 
        style={styles.box}>
            {mesas
                .slice()                                                        // cria uma cópia para não alterar o estado original
                .sort((a, b) => a.numero - b.numero)                            // ordena pelo número da mesa
                .map((mesa) => {
                    const isOcupada = mesa.status === "aberta";                 // Verifica se a mesa está ocupada
                    const isSelecionada = mesaSelecionada === mesa.id;          // Verifica se a mesa está selecionada

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
                                if (!isOcupada) setMesaSelecionada(mesa.id);   // Seleciona a mesa se não estiver ocupada
                            }}
                        >
                            <Text 
                            style={styles.numMesa}>{mesa.numero}</Text>
                            
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
                
               
                <TouchableOpacity 
                    onPress={handleSalvar} style={{
                    backgroundColor: "#0A411B",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                    marginBottom: 40,
                }}>
                    <Text 
                    style={{ color: "#fff", 
                    fontWeight: "bold" }}>Salvar</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}               // Fecha o modal ao pressionar o botão de voltar
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

                        <Text 
                            style={{ fontSize: 18, 
                            marginBottom: 15, 
                            textAlign: 'center' }}>
                            Tem certeza que deseja ocupar esta mesa?
                        </Text>

                        <View 
                            style={{ flexDirection: "row", 
                            justifyContent: "space-between", 
                            width: "100%" }}>
                                <TouchableOpacity 
                                    onPress={confirmarCriacao}                              // Chama a função de confirmação ao clicar        
                                    style={{ flex: 1, 
                                    alignItems: "center" }}>
                                        <Text 
                                        style={{ color: "green", 
                                        fontWeight: "bold" }}>Confirmar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={() => setModalVisible(false)}                  // Fecha o modal ao clicar 
                                    style={{ flex: 1, 
                                    alignItems: "center" }}>
                                        <Text 
                                            style={{ color: "red", 
                                            fontWeight: "bold" }}>Cancelar</Text>
                                    </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>

            <BottomMenu />
        </LinearGradient>
    );
}
