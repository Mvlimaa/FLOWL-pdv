import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 5,
  },

  subtitle: {
    color: "#d9d9d9",
    fontSize: 14,
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 14,
    paddingHorizontal: 20,
    flex: 1,
  },

  mesa: {
    width: 75,
    height: 75,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },

  numMesa: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  statusMesa: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
    opacity: 0.8,
  },

  emptyText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 40,
  },

  actionButton: {
    backgroundColor: "#E53935",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 80,
    shadowColor: "#E53935",
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },

  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  modalBox: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 14,
    width: "80%",
    alignItems: "center",
  },

  modalText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
