import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";


interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: any;
}


const burgers = [
  {
    id: 1,
    nome: "Alabama Apimentado",
    descricao: "Pão americano, hambúrguer 140g, queijo cheddar, bacon, alface...",
    preco: 20.0,
    imagem: require("../../assets/icon.png"),
  },
  {
    id: 2,
    nome: "Alabama Bacon Duplo",
    descricao: "Pão americano, blend 150g, queijo cheddar, bacon, alface...",
    preco: 26.0,
    imagem: require("../../assets/icon.png"),
  },
];

const batatas = [
  {
    id: 3,
    nome: "Batata Frita",
    descricao: "Porção de batata frita crocante.",
    preco: 12.0,
    imagem: require("../../assets/icon.png"),
  },
];

const sobremesas = [
  {
    id: 4,
    nome: "Pudim",
    descricao: "Pudim de leite condensado tradicional.",
    preco: 8.0,
    imagem: require("../../assets/icon.png"),
  },
];

const bebidas = [
  {
    id: 5,
    nome: "Refrigerante Lata",
    descricao: "Coca-Cola, Guaraná, Fanta, etc.",
    preco: 6.0,
    imagem: require("../../assets/icon.png"),
  },
];

const categorias = [
  { key: "burgers", label: "Hambúrguer" },
  { key: "batatas", label: "Batatas" },
  { key: "sobremesas", label: "Sobremesa" },
  { key: "bebidas", label: "Bebidas" },
];

export default function Cardapio() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("burgers");

  let lista: Produto[] = [];
  if (categoriaAtiva === "burgers") lista = burgers;
  if (categoriaAtiva === "batatas") lista = batatas;
  if (categoriaAtiva === "sobremesas") lista = sobremesas;
  if (categoriaAtiva === "bebidas") lista = bebidas;
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Cardápio</Text>
        <TouchableOpacity>
          <Image source={require("../../assets/icon.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Categorias */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categorias}>
        {categorias.map(cat => (
          <TouchableOpacity
            key={cat.key}
            onPress={() => setCategoriaAtiva(cat.key)}
          >
            <Text style={categoriaAtiva === cat.key ? styles.categoriaAtiva : styles.categoria}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista da categoria ativa */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{categorias.find(c => c.key === categoriaAtiva)?.label}</Text>
        {lista.map(item => (
          <View key={item.id} style={styles.cardBurger}>
            <Image source={item.imagem} style={styles.cardImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardNome}>{item.nome}</Text>
              <Text style={styles.cardDescricao}>{item.descricao}</Text>
              <Text style={styles.precoBurger}>R$ {item.preco.toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}