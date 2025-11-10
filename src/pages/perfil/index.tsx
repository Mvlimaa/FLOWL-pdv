import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import api from "../../axios/api";
import BottomMenu from "../../components/reutilizaveis/BottomMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  categoria: string;
}

export default function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const buscarUsuario = async () => {
    try {
      const response = await api.get("/usuarios/");
      setUsuario(response.data[0]);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarUsuario();
  }, []);

  const handleLogout = async () => {
    try {
      // Apaga o token salvo no AsyncStorage
      await AsyncStorage.removeItem("token");

      Alert.alert("Logout", "Você saiu da conta.", [
        {
          text: "OK",
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: "Login" as never }],
          }),
        },
      ]);
    } catch (error) {
      console.error("Erro ao sair:", error);
      Alert.alert("Erro", "Não foi possível sair da conta.");
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={["#0f0f0f", "#1a1a1a"]} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5252" />
      </LinearGradient>
    );
  }

  if (!usuario) {
    return (
      <LinearGradient colors={["#0f0f0f", "#1a1a1a"]} style={styles.loadingContainer}>
        <Text style={styles.errorText}>Usuário não encontrado</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#0f0f0f", "#1f1f1f", "#3b3b3b"]} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={["#FF5252", "#FF8A65"]}
            style={styles.avatarBorder}
          />
        </View>

        <Text style={styles.nome}>{usuario.nome}</Text>
        <Text style={styles.categoria}>
          {usuario.categoria === "garcom" ? "Garçom" : usuario.categoria}
        </Text>
      </View>

      <View style={styles.infoBox}>
        <LinearGradient colors={["#2a2a2a", "#1a1a1a"]} style={styles.glassCard}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>CPF:</Text>
            <Text style={styles.value}>{usuario.cpf}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.value}>{usuario.telefone}</Text>
          </View>
        </LinearGradient>
      </View>
      <BottomMenu active="perfil" />
    </LinearGradient>
  );
}
