import React, { useEffect, useState } from "react";
import api from "../../axios/api";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BottomMenu from "../../components/reutilizaveis/BottomMenu";
import { styles } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";

type Produto = {
  id: number;
  nome: string;
  preco: string;
  categoria: "hamburguer" | "batata" | "bebida" | "sobremesa";
};

const categorias = [
  { key: "hamburguer", label: "🍔 Hambúrguer" },
  { key: "batata", label: "🍟 Batata" },
  { key: "bebida", label: "🥤 Bebida" },
  { key: "sobremesa", label: "🍰 Sobremesa" },
];

export default function Cardapio() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as { mesa?: any; garcom_id?: number } | {};

  const mesa = params.mesa;
  const garcomId = params.garcom_id ?? 1; // fallback para 1 caso não venha da navegação

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] =
    useState<Produto["categoria"]>("hamburguer");

  const adicionarPedido = async (produto: Produto) => {
    try {
      console.log("🧾 Enviando pedido:", {
        mesa_id: mesa?.id,
        garcom_id: garcomId,
        produto_id: produto.id,
      });

      const response = await api.post("/pedidos/", {
        mesa_id: mesa.id,
        garcom_id: garcomId,
        itens: [{ produto_id: produto.id, quantidade: 1 }],
      });

      console.log("✅ Pedido criado:", response.data);
      Alert.alert("Sucesso", "Pedido adicionado à mesa!");
      navigation.navigate("DetalhesMesa", { mesa });
    } catch (error: any) {
      console.error("❌ Erro ao adicionar pedido:", error.response?.data || error.message);
      const msg = error.response?.data?.detail || "Erro ao adicionar pedido. Tente novamente.";
      Alert.alert("Erro", msg);
      setErro(msg);
    }
  };

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await api.get("/produtos/");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setErro("Erro ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    };

    buscarProdutos();
  }, []);

  const produtosFiltrados = produtos.filter(
    (p) => p.categoria === categoriaAtiva
  );

  return (
    <LinearGradient
      colors={["#1C1C1C", "#3A3A3A", "#FAFAFA"]}
      style={styles.container}
    >
      <Text style={styles.title}>Cardápio</Text>

      {/* CATEGORIAS */}
      <View style={styles.categoriasContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
        >
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.categoriaBtn,
                categoriaAtiva === cat.key && styles.categoriaBtnAtiva,
              ]}
              onPress={() => setCategoriaAtiva(cat.key as Produto["categoria"])}
            >
              <Text
                style={[
                  styles.categoriaBtnText,
                  categoriaAtiva === cat.key && styles.categoriaBtnTextAtiva,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* PRODUTOS */}
      {loading ? (
        <ActivityIndicator size="large" color="#FFF" style={{ marginTop: 50 }} />
      ) : erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.produtosWrapper}>
          {produtosFiltrados.map((produto) => (
            <View key={produto.id} style={styles.produtoCard}>
              <Image
                source={require("../../assets/icon.png")}
                style={styles.produtoImagem}
              />
              <Text style={styles.produtoNome}>{produto.nome}</Text>
              <Text style={styles.produtoPreco}>R$ {produto.preco}</Text>
              <LinearGradient
                colors={["#FF7A00", "#FF3C00"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.adicionarBtn}
              >
                <TouchableOpacity onPress={() => adicionarPedido(produto)}>
                  <Text style={styles.adicionarBtnText}>Adicionar</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>
      )}

      <BottomMenu />
    </LinearGradient>
  );
}
