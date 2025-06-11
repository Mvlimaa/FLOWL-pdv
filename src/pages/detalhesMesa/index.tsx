import React, { useState } from "react";
import { styles } from "./styles";
import api from "../../axios/api";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import BottomMenu from "../../components/reutilizaveis/BottomMenu";
import Pagamento from "../pagamento";

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


    const { mesa } = route.params as { mesa: any };                                                     // Obtém a mesa passada como parâmetro  

    const [showPagamento, setShowPagamento] = useState(false);                                          // Estado para controlar a visibilidade do modal de pagamento
    const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(mesa);                          // Estado para a mesa selecionada
    const [pedidos, setPedidos] = useState<PedidoDetalhado[]>([]);                                      // Estado para os pedidos da mesa
    const [produtos, setProdutos] = useState<Produto[]>([]);                                            // Estado para os produtos disponíveis

    React.useEffect(() => {                                                                             
      const fetchPedidosEProdutos = async () => {                                                       
        try {
          const produtosResp = await api.get(`/produtos`);                                              // Get em produtos da API 
          setProdutos(produtosResp.data);                                                               // Atualiza o estado com os produtos obtidos

          const pedidosResp = await api.get(`/pedidos/mesa/${mesa.id}`);                                // Get em pedidos da API filtrando pela mesa              
          const pedidosAPI: Pedido[] = pedidosResp.data;

          const pedidosPendentes = pedidosAPI.filter(pedido => pedido.status === "pendente");           // Filtrar apenas pedidos com status "pendente"

          const pedidosDetalhados: PedidoDetalhado[] = [];                                              // Estado para os pedidos detalhados
          pedidosPendentes.forEach(pedido => {
            pedido.itens.forEach(item => {
              const produto = produtosResp.data.find((p: Produto) => p.id === item.produto_id);         // Busca o produto 
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
          setPedidos(pedidosDetalhados);                                                                // Atualiza o estado com os pedidos detalhados
        } catch (error) {
          console.error("Erro ao buscar produtos:", error);
        }
      };
      fetchPedidosEProdutos();
    }, [mesa.id]);

    const subtotal = pedidos.reduce((acc, p) => acc + p.preco * p.quantidade, 0);                       // Calcula o subtotal dos pedidos

    const [statusPagamento, setStatusPagamento] = useState<"sucesso" | "processando" | "erro">("processando");
    const [formaPagamentoSelecionada, setFormaPagamentoSelecionada] = useState<string>("");

    const cancelarPedido = async (id: number) => {
      try {
        
        await api.delete(`/pedidos/${id}`);                                                               // Remove o pedido na API 
        
        setPedidos(pedidos.filter(p => p.id !== id));                                                     // Atualiza o estado local
      } catch (error) {
        console.error("Erro ao cancelar pedido:", error);
  }
};
    
    const fecharMesa = async () => {                                                                      // Atualiza todos os pedidos para "finalizado" antes de fechar a mesa
        try {

            const pedidosResp = await api.get(`/pedidos/mesa/${mesa.id}`);                               
            const pedidosAPI: Pedido[] = pedidosResp.data;                                                // Busca todos os pedidos da mesa na API

            
            await Promise.all(                                                                            // Atualiza cada pedido para status "finalizado" na API
                pedidosAPI.map(pedido =>
                    api.put(`/pedidos/${pedido.id}/status?status=finalizado`)
                )
            );


            await api.put(`/mesas/${mesa.id}/status?status=fechada`);                                      // Fecha a mesa atualizando o status da mesa para 'fechada'
            setPedidos([]);                                                                                // Limpa os pedidos locais após fechar a mesa
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
            <View key={pedido.id} style={styles.pedidoItem}>
              <View style={styles.pedidoInfo}>
                <Text style={styles.pedidoNome}>{pedido.nome}</Text>

                <Text style={styles.pedidoPreco}>
                  R$ {pedido.preco.toFixed(2)} -{" "}
                  <Text style={styles.pedidoQuantidade}>
                    {pedido.quantidade} pedidos
                  </Text>
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
          <Text style={styles.subtotalLabel}>
            R$ {subtotal.toFixed(2)}
          </Text>

        </View>

      </View>
      

      <TouchableOpacity
        style={styles.cardapioBtn}
        onPress={() => navigation.navigate("Cardapio", { mesa })}
      >
        <Text style={styles.cardapioBtnText}>Cardápio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.pagamentoBtn}
        onPress={() => setShowPagamento(true)}
      >
        <Text style={styles.pagamentoBtnText}>Pagamento</Text>
      </TouchableOpacity>

      <Pagamento
        visible={showPagamento}
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
    <BottomMenu/>
  </LinearGradient>
);
}