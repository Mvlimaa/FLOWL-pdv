// src/pages/mensagens/index.tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomMenu from "../../components/reutilizaveis/BottomMenu";

const conversas = [
  { id: "1", nome: "Mesa 04", ultima: "2 cervejas e 1 porção de batata", hora: "12:30" },
  { id: "2", nome: "Mesa 07", ultima: "Pizza grande meia calabresa", hora: "12:45" },
  { id: "3", nome: "Delivery João", ultima: "Pedido confirmado!", hora: "13:00" },
  { id: "4", nome: "Mesa 10", ultima: "Churrasco misto + refri", hora: "13:10" },
  { id: "5", nome: "Cliente Maria", ultima: "Troca o suco por água, por favor", hora: "13:15" },
];

export default function Mensagens() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mensagens</Text>

      <FlatList
        data={conversas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ChatDetalhes" as never, { conversa: item } as never)}
          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.ultima}>{item.ultima}</Text>
            <Text style={styles.hora}>{item.hora}</Text>
          </TouchableOpacity>
        )}
      />

      <BottomMenu active="mensagens" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1e1e1e", paddingTop: 40 },
  titulo: { color: "#fff", fontSize: 22, fontWeight: "bold", marginLeft: 20, marginBottom: 10 },
  card: {
    backgroundColor: "#333",
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 15,
    borderRadius: 12,
  },
  nome: { color: "#FFD700", fontSize: 18, fontWeight: "bold" },
  ultima: { color: "#ccc", fontSize: 14, marginTop: 4 },
  hora: { color: "#999", fontSize: 12, marginTop: 4, textAlign: "right" },
});
