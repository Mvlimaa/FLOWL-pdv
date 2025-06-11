import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
  },
  categorias: {
    marginBottom: 16,
    maxHeight: 50,
  },
  categoriaBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "#fff2",
    marginRight: 10,
  },
  categoriaBtnAtiva: {
    backgroundColor: "#fff",
  },
  categoriaText: {
    color: "#fff",
    fontWeight: "bold",
  },
  categoriaTextAtiva: {
    color: "#D62828",
  },
  produtosWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 80,
  },
  produtoCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    margin: 8,
    width: 160,
    alignItems: "center",
    elevation: 2,
  },
  produtoNome: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#222",
  },
  produtoCategoria: {
    fontSize: 13,
    color: "#555",
    marginBottom: 4,
  },
  produtoPreco: {
    fontSize: 15,
    color: "#1976d2",
    fontWeight: "bold",
  },
  erro: {
    color: "#fff",
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
  },

  adicionarBtn: {
  marginTop: 8,
  backgroundColor: "#1976d2",
  paddingVertical: 6,
  paddingHorizontal: 16,
  borderRadius: 6,
},

adicionarBtnText: {
  color: "#fff",
  fontWeight: "bold",
},
});