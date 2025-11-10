import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 20,
  },
  periodoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  periodoBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "#1F1F1F",
  },
  periodoBtnAtivo: {
    backgroundColor: "#FF7A00",
  },
  periodoTxt: {
    color: "#9C9C9C",
    fontSize: 14,
  },
  periodoTxtAtivo: {
    color: "#fff",
    fontWeight: "600",
  },
  scroll: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#1B1B1B",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardLabel: {
    color: "#CFCFCF",
    fontSize: 14,
  },
  cardValue: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginTop: 6,
  },
  cardRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  cardMenor: {
    flex: 1,
    backgroundColor: "#1B1B1B",
    padding: 18,
    borderRadius: 12,
  },
  graficoTitulo: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 12,
  },
  chart: {
    borderRadius: 12,
  },
  btnExportar: {
    marginTop: 20,
    backgroundColor: "#FF3C00",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnExportarTxt: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
