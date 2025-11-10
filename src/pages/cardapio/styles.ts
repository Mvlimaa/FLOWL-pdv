import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  categoriasContainer: {
    marginBottom: 15,
  },
  categoriaBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 25,
    backgroundColor: "#FFFFFF22",
    marginRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  categoriaBtnAtiva: {
    backgroundColor: "#FFF",
  },
  categoriaBtnText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  categoriaBtnTextAtiva: {
    color: "#FF3C00",
    fontWeight: "bold",
  },
  produtosWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 100,
  },
  produtoCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 15,
    margin: 10,
    width: 165,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  produtoImagem: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginBottom: 8,
  },
  produtoNome: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  produtoPreco: {
    fontSize: 15,
    color: "#00A650",
    fontWeight: "600",
    marginBottom: 10,
  },
  adicionarBtn: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 25,
    width: "90%",
  },
  adicionarBtnText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  erro: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
  },
});
