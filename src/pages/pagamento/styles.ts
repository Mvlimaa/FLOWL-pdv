import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#0008",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    height: "60%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
    alignItems: "center",
    elevation: 10,
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: "#eee",
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: 22,
    color: "#888",
    fontWeight: "bold",
  },
  progressContainer: {
    marginTop: 10,
    marginBottom: 18,
    alignItems: "center",
    width: "100%",
  },
  progressImg: {
    width: 180,
    height: 32,
    resizeMode: "contain",
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
  },
  amountBox: {
    backgroundColor: "#f6f8ff",
    borderRadius: 18,
    padding: 12,
    alignItems: "center",
    marginBottom: 18,
    width: "100%",
  },
  amountLabel: {
    color: "red",
    fontSize: 13,
    marginBottom: 2,
  },
  amountValue: {
    color: "green",
    fontSize: 22,
    fontWeight: "bold",
  },
  detailsBox: {
    width: "100%",
    marginTop: 30,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  detailLabel: {
    color: "#aaa",
    fontSize: 14,
  },
  detailValue: {
    color: "#444",
    fontSize: 14,
    fontWeight: "bold",
  },
  fecharBtn: {
    backgroundColor: "#D62828",
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 50,
    width: "80%",
    alignItems: "center",
  },
  fecharBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});