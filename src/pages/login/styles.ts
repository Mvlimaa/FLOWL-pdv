import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
    opacity: 1, 
  },
  card: {
    width: "90%",
    maxWidth: 400,
    borderRadius: 30, 
    padding: 30,
    alignItems: "center",

    backgroundColor: "rgba(255, 255, 255, 0.05)", 
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)', 
  },
  title: {
    
    fontFamily: 'Pacifico', 
    fontSize: 25, 
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 40,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
   
    backgroundColor: "rgba(255, 255, 255, 0.05)", 
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 15,
    width: "100%",
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15, 
    color: "#fff",
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    width: "100%",
    borderRadius: 30, 
    overflow: "hidden",
    shadowColor: "#007BFF", 
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 15,
  },
  gradientBtn: {
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800", 
  },
  loadingIndicator: {
    paddingVertical: 15,
  },
  link: {
    color: "#B0B9C6", 
    marginTop: 20,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  linkRegister: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    
  },
  errorText: {
    color: "#FF5252", 
    fontSize: 14,
    marginTop: 10,
    fontWeight: '600',
  },
});