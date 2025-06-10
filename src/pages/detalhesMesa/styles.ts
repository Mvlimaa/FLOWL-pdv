import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pedidosBox: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    padding: 15,
    width: "90%",
    marginBottom: 10,
  },
  pedidoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
  },
  pedidoImagem: {
    width: 45,
    height: 45,
    borderRadius: 10,
    marginRight: 10,
  },
  pedidoInfo: {
    flex: 1,
  },
  pedidoNome: {
    fontWeight: "bold",
    fontSize: 16,
  },
  pedidoPreco: {
    color: "#444",
  },
  pedidoQuantidade: {
    color: "green",
  },
  cancelarBtn: {
    backgroundColor: "#D62828",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 10,
  },
  cancelarBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  subtotalBox: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 18,
    paddingVertical: 5,
    elevation: 2,
  },
  subtotalLabel: {
    fontWeight: "bold",
    fontSize: 18,
  },
  cardapioBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFD166",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 15,
    width: "80%",
    justifyContent: "center",
  },
  cardapioBtnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#701515",
    marginRight: 10,
  },
  cardapioBtnIcon: {
    width: 28,
    height: 28,
  },
  pagamentoBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFD166",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
    width: "80%",
    justifyContent: "center",
  },
  pagamentoBtnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#701515",
    marginRight: 10,
  },
  pagamentoBtnIcon: {
    width: 28,
    height: 28,
  },
  fecharMesaBtn: {
    backgroundColor: "#D62828",
    borderRadius: 15,
    paddingVertical: 15,
    width: "80%",
    alignItems: "center",
  },
  fecharMesaBtnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});