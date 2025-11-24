import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },

  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    position: "relative",
    marginBottom: 15,
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },

  avatarBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 60,
    opacity: 0.4,
  },

  nome: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 5,
  },

  categoria: {
    fontSize: 16,
    color: "#FF8A65",
    textTransform: "capitalize",
  },

  infoBox: {
    width: "100%",
    marginBottom: 40,
  },

  glassCard: {
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  label: {
    fontSize: 16,
    color: "#aaa",
  },

  value: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },

  logoutButton: {
    width: "90%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 60,
  },

  logoutGradient: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#FF5252",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },

  errorText: {
    color: "#fff",
    fontSize: 18,
  },
});
