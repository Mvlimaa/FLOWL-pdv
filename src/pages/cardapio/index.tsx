import React, { useEffect, useState } from "react";
import api from "../../axios/api";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from "../../components/reutilizaveis/BottomMenu";
import { styles } from "./styles";

type Produto = {
  id: number;
  nome: string;
  preco: string;
  categoria: "hamburguer" | "batata" | "bebida" | "sobremesa";
};

const categorias = [
  { key: "hamburguer", label: "Hambúrguer" },
  { key: "batata", label: "Batata" },
  { key: "bebida", label: "Bebida" },
  { key: "sobremesa", label: "Sobremesa" },
];

export default function Cardapio() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<Produto["categoria"]>("hamburguer");

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await api.get("/produtos/");
        setProdutos(response.data);
      } catch (error) {
        setErro("Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    };
    buscarProdutos();
  }, []);

  const produtosFiltrados = produtos.filter(p => p.categoria === categoriaAtiva);

  return (
    <LinearGradient colors={['#D62828', '#701515']} style={styles.container}>
      <Text style={styles.title}>Cardápio</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categorias}>
        {categorias.map(cat => (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.categoriaBtn,
              categoriaAtiva === cat.key && styles.categoriaBtnAtiva
            ]}
            onPress={() => setCategoriaAtiva(cat.key as Produto["categoria"])}
          >
            <Text style={[
              styles.categoriaText,
              categoriaAtiva === cat.key && styles.categoriaTextAtiva
            ]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 32 }} />
      ) : erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.produtosWrapper}>
          {produtosFiltrados.map(produto => (
            <View key={produto.id} style={styles.produtoCard}>
              <Text style={styles.produtoNome}>{produto.nome}</Text>
              <Text style={styles.produtoCategoria}>Categoria: {produto.categoria}</Text>
              <Text style={styles.produtoPreco}>Preço: R$ {produto.preco}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      <BottomMenu />
    </LinearGradient>
  );
}