import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import api from "../../axios/api";
import BottomMenu from "../../components/reutilizaveis/BottomMenu";

export default function Mesas() {
  const navigation = useNavigation();
  const [mesaSelecionada, setMesaSelecionada] = useState<number | null>(null);
  const [mesas, setMesas] = useState<{ id: number; numero: number; status: string }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarMesas = async () => {
      try {
        const response = await api.get("/mesas");
        setMesas(response.data);
      } catch (error) {
        console.error("Erro ao buscar mesas:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarMesas();
  }, []);

  const handleSelecionarMesa = (mesaId: number, status: string) => {
    if (status === "aberta") return;
    setMesaSelecionada(mesaId);
  };

  const confirmarCriacao = async () => {
    if (mesaSelecionada === null) return;
    try {
      await api.put(`/mesas/${mesaSelecionada}/status?status=aberta`);
      const mesaAtualizada = mesas.find((m) => m.id === mesaSelecionada);

      if (mesaAtualizada) {
        navigation.navigate("DetalhesMesa", { mesa: { ...mesaAtualizada, status: "aberta" } });
      }

      setMesas((prev) =>
        prev.map((m) =>
          m.id === mesaSelecionada ? { ...m, status: "aberta" } : m
        )
      );

      setMesaSelecionada(null);
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao abrir mesa:", error);
    }
  };

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <Image
        source={require("../../assets/icon-hamburgueria.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Selecione uma mesa</Text>
      <Text style={styles.subtitle}>Toque para abrir uma nova mesa</Text>

      <View style={styles.grid}>
        {loading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : mesas.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma mesa cadastrada.</Text>
        ) : (
          mesas
            .slice()
            .sort((a, b) => a.numero - b.numero)
            .map((mesa) => {
              const isOcupada = mesa.status === "aberta";
              const isSelecionada = mesaSelecionada === mesa.id;

              let backgroundColor = "#43A047"; // disponível
              if (isOcupada) backgroundColor = "#B71C1C"; // ocupada
              if (isSelecionada && !isOcupada) backgroundColor = "#FBC02D"; // selecionada

              return (
                <TouchableOpacity
                  key={mesa.id}
                  style={[styles.mesa, { backgroundColor }]}
                  activeOpacity={0.8}
                  onPress={() => handleSelecionarMesa(mesa.id, mesa.status)}
                >
                  <Text style={styles.numMesa}>{mesa.numero}</Text>
                  <Text style={styles.statusMesa}>
                    {isOcupada ? "Ocupada" : isSelecionada ? "Selecionada" : "Livre"}
                  </Text>
                </TouchableOpacity>
              );
            })
        )}
      </View>

      {mesaSelecionada && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.actionButtonText}>Abrir Mesa</Text>
        </TouchableOpacity>
      )}

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Deseja realmente abrir esta mesa?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={confirmarCriacao}
                style={[styles.modalButton, { backgroundColor: "#4CAF50" }]}
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, { backgroundColor: "#B71C1C" }]}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomMenu />
    </LinearGradient>
  );
}
