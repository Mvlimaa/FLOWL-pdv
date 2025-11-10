// src/pages/chatDetalhes/index.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import BottomMenu from "../../components/reutilizaveis/BottomMenu";

export default function ChatDetalhes() {
  const route = useRoute();
  const { conversa }: any = route.params;

  const mensagensFicticias = [
    { id: 1, texto: "Olá, tudo bem?", enviado: true },
    { id: 2, texto: "Oi! Tudo sim, gostaria de pedir uma batata frita.", enviado: false },
    { id: 3, texto: "Certo, mais alguma coisa?", enviado: true },
    { id: 4, texto: "2 sucos de laranja também!", enviado: false },
    { id: 5, texto: "Pedido anotado 👍", enviado: true },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{conversa.nome}</Text>

      <ScrollView style={styles.chat}>
        {mensagensFicticias.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.msgContainer,
              msg.enviado ? styles.enviado : styles.recebido,
            ]}
          >
            <Text style={styles.texto}>{msg.texto}</Text>
          </View>
        ))}
      </ScrollView>

      <BottomMenu active="mensagens" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1e1e1e", paddingTop: 40 },
  titulo: { color: "#FFD700", fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  chat: { flex: 1, paddingHorizontal: 15 },
  msgContainer: { marginVertical: 6, padding: 10, borderRadius: 10, maxWidth: "80%" },
  enviado: { alignSelf: "flex-end", backgroundColor: "#444" },
  recebido: { alignSelf: "flex-start", backgroundColor: "#2b2b2b" },
  texto: { color: "#fff", fontSize: 15 },
});
