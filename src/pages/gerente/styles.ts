import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#9A9A9A",
    marginBottom: 20,
  },
  cardsContainer: {
    paddingBottom: 80,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#1B1B1B",
    padding: 18,
    borderRadius: 12,
    marginRight: 10,
  },
  cardLabel: {
    color: "#CFCFCF",
    fontSize: 13,
  },
  cardValue: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 6,
  },
  cardFaturamento: {
    flex: 1,
    padding: 18,
    borderRadius: 12,
  },
  cardLabelWhite: {
    color: "#fff",
    fontSize: 13,
  },
  cardValueWhite: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 6,
  },
  graficoLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 12,
  },
  chart: {
    borderRadius: 12,
  },
});
