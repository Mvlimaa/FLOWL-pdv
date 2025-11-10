import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  logoImage: {
    width: 110,
    height: 110,
    marginBottom: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 14,
    color: "#d9d9d9",
    marginTop: 5,
  },

  listContainer: {
    flex: 1,
    marginTop: 10,
  },

  cardMesa: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c5364",
  },

  cardSubtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },

  nextIcon: {
    width: 24,
    height: 24,
    opacity: 0.4,
  },

  emptyText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    marginTop: 50,
  },

  fab: {
    backgroundColor: "#E53935",
    position: "absolute",
    bottom: 85,
    alignSelf: "center",
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 40,
    shadowColor: "#E53935",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },

  fabText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },


  menuWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
