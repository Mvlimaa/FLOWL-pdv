import React, { useEffect, useState } from "react";
import api from "../../axios/api";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import BottomMenu from "../../components/reutilizaveis/BottomMenu";
import { styles } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";


type Produto = {                                                                                      // Tipo do produto
  id: number;
  nome: string;
  preco: string;
  categoria: "hamburguer" | "batata" | "bebida" | "sobremesa";
};


const categorias = [                                                                                  // Categorias disponíveis
  { key: "hamburguer", label: "Hambúrguer" },
  { key: "batata", label: "Batata" },
  { key: "bebida", label: "Bebida" },
  { key: "sobremesa", label: "Sobremesa" },
];

export default function Cardapio() {
  const navigation = useNavigation();
  const route = useRoute();


  const params = route.params as { mesa?: any, garcom_id?: number } || {};                             // Parâmetros recebidos pela rota
  const mesa = params.mesa;

  
  const [produtos, setProdutos] = useState<Produto[]>([]);                                            // Estados do componente
  const [loading, setLoading] = useState(true);                                                       
  const [erro, setErro] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<Produto["categoria"]>("hamburguer");           


  const adicionarPedido = async (produto: Produto) => {
    try { 
      await api.post("/pedidos/", {                                         // Atualiza estado do pedido 
        mesa_id: mesa.id,
        garcom_id: 1,                                                       // Id 1 como default pois ainda nao colocamos opcao de cadastro para garcom no projeto
        itens: [{ produto_id: produto.id, quantidade: 1 }]
      });
      navigation.navigate("DetalhesMesa", { mesa });
    } catch (error: any) {
      console.error("Erro ao adicionar pedido:", error?.response?.data || error.message || error);
      setErro(
        error?.response?.data?.detail
          ? `Erro: ${JSON.stringify(error.response.data.detail)}`
          : "Erro ao adicionar pedido. Tente novamente mais tarde."
      );
    }
  };


  useEffect(() => {                                                          // Estados do componente
    const buscarProdutos = async () => {
      try {
        const response = await api.get("/produtos/");                       // Get em produtos na API 
        setProdutos(response.data);
      } catch (error) {
        setErro("Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    };
    buscarProdutos();
  }, []);

  
  const produtosFiltrados = produtos.filter(p => p.categoria === categoriaAtiva);                     // Filtra produtos pela categoria ativa

  return (
    <LinearGradient colors={['#7E7E7E', '#FAFAFA']} style={styles.container}>
      
      <View 
        style={{ flexDirection: "row", 
        justifyContent: "center", 
        marginVertical: 16 }}>
          <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, alignItems: "center" }}
          style={{ marginVertical: 16, maxHeight: 50 }}
          >
            {categorias.map(cat => (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.categoriaBtn,
                  categoriaAtiva === cat.key && styles.categoriaBtnAtiva
                ]}
                onPress={() => setCategoriaAtiva(cat.key as Produto["categoria"])}
              >
                <Text
                  style={[
                    styles.categoriaBtnText,
                    categoriaAtiva === cat.key && styles.categoriaBtnTextAtiva
                  ]}
                >
                  {cat.label}
                </Text>

              </TouchableOpacity>

            ))}
        </ScrollView>

      </View>
      

      {/* Exibe loading, erro ou lista de produtos */}
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
              <TouchableOpacity
                style={styles.adicionarBtn}
                onPress={() => adicionarPedido(produto)}
              >
                <Text style={styles.adicionarBtnText}>Adicionar Pedido</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Menu inferior fixo */}
      <BottomMenu />
    </LinearGradient>
  );
}