import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import api from "../../axios/api";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import BottomMenu from "../../components/reutilizaveis/BottomMenu";

type Garcom = {
  id_garcom: number;
  id_usuario: number;
  nome_usuario: string;
};

export default function Garcons() {
  const navigation = useNavigation();
  const [garcons, setGarcons] = useState<Garcom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarGarcons = async () => {
      try {
        const response = await api.get("/garcons/");
        setGarcons(response.data);
      } catch (error) {
        console.log("Erro ao carregar garçons:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarGarcons();
  }, []);

  return (
    <LinearGradient colors={["#1C1C1C", "#2B2B2B", "#111"]} style={styles.container}>
      
      <Text style={styles.title}>Gestão de Garçons</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#FFF" style={{ marginTop: 50 }} />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          {garcons.map((g) => (
            <View key={g.id_garcom} style={styles.card}>
              <Text style={styles.cardLabel}>{g.nome_usuario}</Text>
              <Text style={{ color: "#BBB", marginBottom: 8 }}>ID Garçom: {g.id_garcom}</Text>

              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => {
                  // futuramente: ver histórico de pedidos
                }}
              >
                <LinearGradient
                  colors={["#FF7A00", "#FF3C00"]}
                  style={styles.smallButtonGradient}
                >
                  <Text style={styles.smallButtonText}>Ver Detalhes</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      <BottomMenu />
    </LinearGradient>
  );
}
