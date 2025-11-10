import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import api from "../../axios/api";
import { styles } from "./styles";

import BottomMenu from "../../components/reutilizaveis/BottomMenu";
import Pagamento from "../pagamento";

export default function DetalhesMesa() {
  const route = useRoute();
  const navigation = useNavigation();
  const { mesa } = route.params as { mesa: any };

  const [showPagamento, setShowPagamento] = useState(false);
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [statusPagamento, setStatusPagamento] = useState("processando");
  const [formaPagamentoSelecionada, setFormaPagamentoSelecionada] = useState("");

  useEffect(() => {
    const fetchPedidosEProdutos = async () => {
      try {
        const produtosResp = await api.get(`/produtos`);
        setProdutos(produtosResp.data);

        // 🔹 rota corrigida — conforme backend: /pedidos/mesa/{id}
        const pedidosResp = await api.get(`/pedidos/mesa/${mesa.id}`);

        const pedidosPendentes = pedidosResp.data.filter(
          (pedido: any) => pedido.status === "pendente"
        );

        const pedidosDetalhados = pedidosPendentes
          .flatMap((pedido: any) =>
            pedido.itens.map((item: any) => {
              const produto = produtosResp.data.find(
                (p: any) => p.id === item.produto_id
              );
              return produto
                ? {
                    id: pedido.id,
                    nome: produto.nome,
                    preco: Number(produto.preco),
                    quantidade: item.quantidade,
                    imagem: require("../../assets/icon.png"),
                  }
                : null;
            })
          )
          .filter(Boolean);

        setPedidos(pedidosDetalhados);
      } catch (error) {
        console.error("Erro ao buscar pedidos/produtos:", error);
      }
    };

    fetchPedidosEProdutos();
  }, [mesa.id]);

  const subtotal = pedidos.reduce((acc, p) => acc + p.preco * p.quantidade, 0);

  // 🔹 Cancelar pedido
  const cancelarPedido = async (id: number) => {
    try {
      await api.delete(`/pedidos/${id}`);
      setPedidos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erro ao cancelar pedido:", error);
    }
  };

  // 🔹 Fechar mesa (finaliza pedidos + fecha mesa)
  const fecharMesa = async () => {
    try {
      const pedidosResp = await api.get(`/pedidos/mesa/${mesa.id}`);
      const pedidosAPI = pedidosResp.data;

      await Promise.all(
        pedidosAPI.map((pedido: any) =>
          api.put(`/pedidos/${pedido.id}/status?status=finalizado`)
        )
      );

      await api.put(`/mesas/${mesa.id}/status?status=fechada`);

      setPedidos([]);
      setShowPagamento(false);
      navigation.navigate("Mesas");
    } catch (error) {
      console.error("Erro ao fechar mesa:", error);
    }
  };

  // 🔹 Adicionar novo produto (ajustado para o endpoint correto)
  const adicionarProduto = async (produtoId: number, quantidade: number) => {
    try {
      const pedidoData = {
        mesa_id: mesa.id,
        itens: [{ produto_id: produtoId, quantidade }],
      };

      // 🔸 AJUSTE AQUI: se sua API usa /pedido/ e não /pedidos/, troque a rota.
      const resp = await api.post(`/pedidos`, pedidoData);

      if (resp.status === 201 || resp.status === 200) {
        // recarrega lista de pedidos
        const pedidosAtualizados = await api.get(`/pedidos/mesa/${mesa.id}`);
        setPedidos(pedidosAtualizados.data);
      }
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  return (
    <LinearGradient colors={["#1C1C1C", "#3A3A3A", "#FAFAFA"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {mesa.numero.toString().padStart(2, "0")}</Text>

        <View style={styles.pedidosBox}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {pedidos.map((pedido) => (
              <View key={pedido.id} style={styles.pedidoItem}>
                <Image source={pedido.imagem} style={styles.pedidoImagem} />

                <View style={styles.pedidoInfo}>
                  <Text style={styles.pedidoNome}>{pedido.nome}</Text>
                  <Text style={styles.pedidoPreco}>
                    R$ {pedido.preco.toFixed(2)}{" "}
                    <Text style={styles.pedidoQuantidade}>x{pedido.quantidade}</Text>
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.cancelarBtn}
                  onPress={() => cancelarPedido(pedido.id)}
                >
                  <Text style={styles.cancelarBtnText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.subtotalBox}>
            <Text style={styles.subtotalLabel}>Subtotal:</Text>
            <Text style={styles.subtotalValor}>R$ {subtotal.toFixed(2)}</Text>
          </View>
        </View>

        <LinearGradient
          colors={["#FF7A00", "#FF3C00"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardapioBtn}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Cardapio", { mesa })}>
            <Text style={styles.cardapioBtnText}>Ver Cardápio</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={["#00C853", "#009624"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.pagamentoBtn}
        >
          <TouchableOpacity onPress={() => setShowPagamento(true)}>
            <Text style={styles.pagamentoBtnText}>Pagamento</Text>
          </TouchableOpacity>
        </LinearGradient>

        <Pagamento
          visible={showPagamento}
          onClose={() => setShowPagamento(false)}
          valor={subtotal}
          mesa={mesa.numero}
          status={statusPagamento}
          formaPagamento={formaPagamentoSelecionada}
          fecharMesa={fecharMesa}
        />

        <TouchableOpacity style={styles.fecharMesaBtn} onPress={fecharMesa}>
          <Text style={styles.fecharMesaBtnText}>Fechar Mesa</Text>
        </TouchableOpacity>
      </View>

      <BottomMenu />
    </LinearGradient>
  );
}
