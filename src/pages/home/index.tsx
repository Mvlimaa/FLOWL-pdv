import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import api from "../../axios/api";
import BottomMenu from "../../components/reutilizaveis/BottomMenu";

export default function Home() {
  const navigation = useNavigation();
  const [mesasAbertas, setMesasAbertas] = useState<
    { id: number; numero: number; status: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarMesasAbertas = async () => {
      try {
        const response = await api.get("/mesas/abertas");
        setMesasAbertas(response.data);
      } catch (error) {
        console.error("Erro ao buscar mesas abertas:", error);
      } finally {
        setLoading(false);
      }
    };
    buscarMesasAbertas();
  }, []);

  return (
    <LinearGradient colors={["#0f0f0f", "#1f1f1f", "#3b3b3b"]} style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/icon-hamburgueria.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>Brabu’s Burguer</Text>
        <Text style={styles.subtitle}>Gerencie suas mesas com praticidade 🍔</Text>
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : mesasAbertas.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma mesa aberta no momento.</Text>
        ) : (
          <FlatList
            data={mesasAbertas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cardMesa}
                onPress={() => navigation.navigate("DetalhesMesa", { mesa: item })}
                activeOpacity={0.8}
              >
                <View>
                  <Text style={styles.cardTitle}>Mesa {item.numero}</Text>
                  <Text style={styles.cardSubtitle}>
                    Status: <Text style={{ color: "#4CAF50" }}>{item.status}</Text>
                  </Text>
                </View>
              
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("Mesas")}>
        <Text style={styles.fabText}>Ir para mesas</Text>
      </TouchableOpacity>

      {/* ✅ Barra inferior centralizada */}
      <View style={styles.menuWrapper}>
        <BottomMenu active="home" />
      </View>
    </LinearGradient>
  );
}
