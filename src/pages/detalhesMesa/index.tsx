import React, { useState } from "react";
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from "../../components/reutilizaveis/BottomMenu";
import Pagamento from "../pagamento";
import api from "../../axios/api";

interface Mesa {
    id: number;
    numero: number;
    status: string;
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: "hamburguer" | "batata" | "bebida" | "sobremesa";
}

interface ItemPedido {
  produto_id: number;
  quantidade: number;
}

interface Pedido {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
    mesa_id: number;
    garcom_id: number;
    status?: string;
    itens: ItemPedido[];
}

interface PedidoDetalhado {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  imagem: any;
}


export default function DetalhesMesa() {
    const route = useRoute();
    const navigation = useNavigation();
    const { mesa } = route.params as { mesa: any };

    const [showPagamento, setShowPagamento] = useState(false);
    const [pedidos, setPedidos] = useState<PedidoDetalhado[]>([]); 
    const [produtos, setProdutos] = useState<Produto[]>([]);

    React.useEffect(() => {
      const fetchPedidosEProdutos = async () => {
        try {
          const produtosResp = await api.get(`/produtos`);
          setProdutos(produtosResp.data);

          const pedidosResp = await api.get(`/pedidos/mesa/${mesa.id}`);
          const pedidosAPI: Pedido[] = pedidosResp.data;

          // Filtrar apenas pedidos com status "pendente"
          const pedidosPendentes = pedidosAPI.filter(pedido => pedido.status === "pendente");

          const pedidosDetalhados: PedidoDetalhado[] = [];
          pedidosPendentes.forEach(pedido => {
            pedido.itens.forEach(item => {
              const produto = produtosResp.data.find((p: Produto) => p.id === item.produto_id);
              if (produto) {
                pedidosDetalhados.push({
                  id: pedido.id,
                  nome: produto.nome,
                  preco: Number(produto.preco),
                  quantidade: item.quantidade,
                  imagem: require("../../assets/icon.png")
                });
              }
            });
          });
          setPedidos(pedidosDetalhados);
        } catch (error) {
          console.error("Erro ao buscar produtos:", error);
        }
      };
      fetchPedidosEProdutos();
    }, [mesa.id]);

    const subtotal = pedidos.reduce((acc, p) => acc + p.preco * p.quantidade, 0);

    const [statusPagamento, setStatusPagamento] = useState<"sucesso" | "processando" | "erro">("processando");
    const [formaPagamentoSelecionada, setFormaPagamentoSelecionada] = useState<string>("");

    const cancelarPedido = async (id: number) => {
      try {
        // Remove o pedido no backend
        await api.delete(`/pedidos/${id}`);
        // Atualiza o estado local
        setPedidos(pedidos.filter(p => p.id !== id));
      } catch (error) {
        console.error("Erro ao cancelar pedido:", error);
  }
};
    // Atualiza todos os pedidos para "finalizado" antes de fechar a mesa
    const fecharMesa = async () => {
        try {
            // Busca todos os pedidos da mesa
            const pedidosResp = await api.get(`/pedidos/mesa/${mesa.id}`);
            const pedidosAPI: Pedido[] = pedidosResp.data;

            // Atualiza cada pedido para status "finalizado"
            await Promise.all(
                pedidosAPI.map(pedido =>
                    api.put(`/pedidos/${pedido.id}/status?status=finalizado`)
                )
            );

            // Fecha a mesa
            await api.put(`/mesas/${mesa.id}/status?status=fechada`);
            setPedidos([]); // Limpa os pedidos locais
            setShowPagamento(false);
            navigation.navigate("Mesas");
        } catch (error) {
            console.error("Erro ao fechar mesa:", error);
        }
    };

    return (
      <LinearGradient colors={['#7E7E7E', '#FAFAFA']} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Mesa {mesa.numero < 10 ? `0${mesa.numero}` : mesa.numero}
          </Text>
          <View style={styles.pedidosBox}>
            <ScrollView style={{ maxHeight: 200 }}>
              {pedidos.map(pedido => (
                <View 
                  key={pedido.id} 
                  style={styles.pedidoItem}
                >
                  <Image source={pedido.imagem} style={styles.pedidoImagem} />
                  <View style={styles.pedidoInfo}>
                    <Text style={styles.pedidoNome}>{pedido.nome}</Text>
                    <Text style={styles.pedidoPreco}>
                      R$ {pedido.preco.toFixed(2)} - <Text style={styles.pedidoQuantidade}>{pedido.quantidade} pedidos</Text>
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.cancelarBtn}
                    onPress={() => cancelarPedido(pedido.id)}
                  >
                    <Text style={styles.cancelarBtnText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <View style={styles.subtotalBox}>
              <Text style={styles.subtotalLabel}>SubTotal:</Text>
              <Text style={styles.subtotalLabel}>R$ {subtotal.toFixed(2)}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.cardapioBtn}
            onPress={() =>navigation.navigate("Cardapio", { mesa })}
          >
            <Text style={styles.cardapioBtnText}>Cardápio</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.pagamentoBtn}
            onPress={() => setShowPagamento(true)}
          >
            <Text style={styles.pagamentoBtnText}>Pagamento</Text>
          </TouchableOpacity>

          <Pagamento visible={showPagamento}
            onClose={() => setShowPagamento(false)}
            valor={subtotal} 
            mesa={mesa.numero}
            status={statusPagamento}
            formaPagamento={formaPagamentoSelecionada}
            fecharMesa={fecharMesa}
          />

          <TouchableOpacity 
            style={styles.fecharMesaBtn}
            onPress={fecharMesa}
          >
            <Text style={styles.fecharMesaBtnText}>Fechar Mesa</Text>
          </TouchableOpacity>
        </View>
        <BottomMenu />
      </LinearGradient>
    );
}