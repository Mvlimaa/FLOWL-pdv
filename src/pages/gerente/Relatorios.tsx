import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BarChart } from "react-native-chart-kit";
import api from "../../axios/api";
import { styles } from "./relatoriosStyles";
import BottomMenu from "../../components/reutilizaveis/BottomMenu";

export default function Relatorios() {
  const [periodo, setPeriodo] = useState<"hoje" | "semana" | "mes">("hoje");
  const [faturamento, setFaturamento] = useState(0);
  const [qtdPedidos, setQtdPedidos] = useState(0);
  const [ticketMedio, setTicketMedio] = useState(0);

  useEffect(() => {
    carregarDados();
  }, [periodo]);

  const carregarDados = async () => {
    try {
      const { data } = await api.get("/pedidos/");
      const pedidosFiltrados = data; 

      const total = pedidosFiltrados.reduce((acc: number, pedido: any) => {
        const subtotal = pedido.itens.reduce(
          (sum: number, item: any) => sum + Number(item.quantidade * (item.produto_preco || 0)),
          0
        );
        return acc + subtotal;
      }, 0);

      setFaturamento(total);
      setQtdPedidos(pedidosFiltrados.length);
      setTicketMedio(pedidosFiltrados.length > 0 ? total / pedidosFiltrados.length : 0);
    } catch (error) {
      console.log("Erro ao carregar relatórios:", error);
    }
  };

  return (
    <LinearGradient colors={["#0C0C0C", "#1A1A1A", "#000"]} style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>

      {/* SELETOR DE PERÍODO */}
      <View style={styles.periodoContainer}>
        {["hoje", "semana", "mes"].map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => setPeriodo(p as any)}
            style={[styles.periodoBtn, periodo === p && styles.periodoBtnAtivo]}
          >
            <Text style={[styles.periodoTxt, periodo === p && styles.periodoTxtAtivo]}>
              {p === "hoje" ? "Hoje" : p === "semana" ? "Semana" : "Mês"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Faturamento</Text>
          <Text style={styles.cardValue}>R$ {faturamento.toFixed(2)}</Text>
        </View>

        <View style={styles.cardRow}>
          <View style={styles.cardMenor}>
            <Text style={styles.cardLabel}>Pedidos</Text>
            <Text style={styles.cardValue}>{qtdPedidos}</Text>
          </View>

          <View style={styles.cardMenor}>
            <Text style={styles.cardLabel}>Ticket Médio</Text>
            <Text style={styles.cardValue}>R$ {ticketMedio.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.graficoTitulo}>Comparativo de Horários</Text>
        <BarChart
  data={{
    labels: ["12h", "14h", "16h", "18h", "20h"],
    datasets: [{ data: [20, 45, 28, 50, 80] }],
  }}
  width={Dimensions.get("window").width - 32}
  height={220}
  yAxisLabel="R$ "      
  yAxisSuffix=""      
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


        <TouchableOpacity style={styles.btnExportar}>
          <Text style={styles.btnExportarTxt}>📄 Exportar PDF</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomMenu />
    </LinearGradient>
  );
}
