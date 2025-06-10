import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#222",
  },
  categorias: {
    flexDirection: "row",
    marginBottom: 10,
  },
  categoria: {
    fontSize: 16,
    color: "#888",
    marginRight: 18,
    fontWeight: "500",
  },
  categoriaAtiva: {
    fontSize: 16,
    color: "#222",
    marginRight: 18,
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#222",
    paddingBottom: 2,
  },
  section: {
    marginBottom: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  verTodos: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  cardPromo: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    marginBottom: 10,
    padding: 10,
    alignItems: "flex-start",
  },
  cardBurger: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 1,
    marginBottom: 10,
    padding: 10,
    alignItems: "flex-start",
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  tagPromo: {
    backgroundColor: "#222",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
    marginBottom: 2,
  },
  tagPromoText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  cardNome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },
  cardDescricao: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  precoOriginal: {
    fontSize: 13,
    color: "#888",
    textDecorationLine: "line-through",
    marginRight: 4,
  },
  precoPromocional: {
    fontSize: 14,
    color: "#1DB954",
    fontWeight: "bold",
  },
  precoBurger: {
    fontSize: 15,
    color: "#222",
    fontWeight: "bold",
    marginTop: 2,
  },
});