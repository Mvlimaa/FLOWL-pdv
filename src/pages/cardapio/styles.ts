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
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,

  },
  produtoCategoria: {
    textAlign: "center",
    fontSize: 15,
    color: "#555",
    marginBottom: 4,
  },
  produtoPreco: {
    fontSize: 15,
    color: "green",
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
  backgroundColor: "black",
  paddingVertical: 6,
  paddingHorizontal: 16,
  borderRadius: 6,
},
adicionarBtnText: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
},
categoriaBtnText: {
  color: "white",
  fontWeight: "bold",
},
categoriaBtnTextAtiva: {
  color: "#D62828",
},
});