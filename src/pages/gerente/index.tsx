import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BarChart } from "react-native-chart-kit";
import api from "../../axios/api";
import BottomMenu from "../../components/reutilizaveis/BottomMenu";
import { styles } from "./styles";

export default function DashboardGerente() {
  const [mesasAbertas, setMesasAbertas] = useState(0);
  const [mesasLivres, setMesasLivres] = useState(0);
  const [pedidosPendentes, setPedidosPendentes] = useState(0);
  const [faturamento, setFaturamento] = useState(0);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const mesas = await api.get("/mesas/");
        const pedidos = await api.get("/pedidos/");

        setMesasAbertas(mesas.data.filter((m: any) => m.status === "aberta").length);
        setMesasLivres(mesas.data.filter((m: any) => m.status === "fechada").length);
        setPedidosPendentes(pedidos.data.filter((p: any) => p.status === "pendente").length);

        const total = pedidos.data.reduce((acc: number, pedido: any) => {
          return acc + pedido.itens.reduce(
            (sum: number, item: any) => sum + Number(item.quantidade * (item.produto_preco || 0)),
            0
          );
        }, 0);
        setFaturamento(total);
      } catch (err) {
        console.log("Erro ao carregar dados:", err);
      }
    };

    carregarDados();
  }, []);

  return (
    <LinearGradient colors={["#0C0C0C", "#1A1A1A", "#000"]} style={styles.container}>
      <Text style={styles.title}>Dashboard Gerente</Text>
      <Text style={styles.subtitle}>Visão geral do restaurante</Text>

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Mesas Ocupadas</Text>
            <Text style={styles.cardValue}>{mesasAbertas}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Mesas Livres</Text>
            <Text style={styles.cardValue}>{mesasLivres}</Text>
          </View>
        </View>

        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Pedidos Pendentes</Text>
            <Text style={styles.cardValue}>{pedidosPendentes}</Text>
          </View>

          <LinearGradient colors={["#FF7A00", "#FF3C00"]} style={styles.cardFaturamento}>
            <Text style={styles.cardLabelWhite}>Faturamento</Text>
            <Text style={styles.cardValueWhite}>R$ {faturamento.toFixed(2)}</Text>
          </LinearGradient>
        </View>

        <Text style={styles.graficoLabel}>Movimento do Dia</Text>

        <BarChart
          data={{
            labels: ["12h", "14h", "16h", "18h", "20h"],
            datasets: [{ data: [20, 45, 28, 80, 99] }],
          }}
          width={Dimensions.get("window").width - 32}
          height={220}
          yAxisLabel=""
          yAxisSuffix=" pedidos"
          chartConfig={{
            backgroundColor: "#000",
            backgroundGradientFrom: "#0D0D0D",
            backgroundGradientTo: "#1C1C1C",
            decimalPlaces: 0,
            color: () => "#FF7A00",
            labelColor: () => "#fff",
          }}
          style={styles.chart}
        />
      </ScrollView>

      <BottomMenu />
    </LinearGradient>
  );
}
