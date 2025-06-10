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

interface Pedido {
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


    // Mock de pedidos para exemplo
    const [pedidos, setPedidos] = useState<Pedido[]>([
        {
            id: 1,
            nome: "Pudim Premium",
            preco: 14.99,
            quantidade: 8,
            imagem: require("../../assets/icon.png"),
        },
        {
            id: 2,
            nome: "X Baratinha",
            preco: 24.99,
            quantidade: 5,
            imagem: require("../../assets/icon.png"),
        },
    ]);

    const subtotal = pedidos.reduce((acc, p) => acc + p.preco * p.quantidade, 0);

    const cancelarPedido = (id: number) => {
        setPedidos(pedidos.filter(p => p.id !== id));
    };

    const fecharMesa = async () => {
        try {
            await api.put(`/mesas/${mesa.id}/status?status=fechada`);
            navigation.navigate("Mesas");
        } catch (error) {
            console.error("Erro ao fechar mesa:", error);
        }
    };

  return (
  <LinearGradient colors={['#D62828', '#701515']} style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>
        Mesa {mesa.numero < 10 ? `0${mesa.numero}` : mesa.numero}
      </Text>
      <View style={styles.pedidosBox}>
        <ScrollView style={{ maxHeight: 180 }}>
          {pedidos.map(pedido => (
            <View key={pedido.id} style={styles.pedidoItem}>
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
       onPress={() =>navigation.navigate("Cardapio")}
       >
        <Text style={styles.cardapioBtnText}>Cardápio</Text>
        <Image source={require("../../assets/icon.png")} style={styles.cardapioBtnIcon} />
      </TouchableOpacity>

      <TouchableOpacity 
      style={styles.pagamentoBtn}
      onPress={() => setShowPagamento(true)}
      >
        <Text style={styles.pagamentoBtnText}>Pagamento</Text>
        <Image source={require("../../assets/icon.png")} style={styles.pagamentoBtnIcon} />
      </TouchableOpacity>

      <Pagamento visible={showPagamento} onClose={() => setShowPagamento(false)} />

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