import React, { useState } from "react";  
import { styles } from "./styles";
import {  Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import api from "../../axios/api";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";


async function loginComCpf(cpf: string, senha: string) {  
  try {
    const params = new URLSearchParams();
    params.append("username", cpf);
    params.append("password", senha);

    const response = await api.post("/usuarios/login", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 422) {
      throw new Error("CPF ou senha inválidos");
    }
    throw new Error("Erro ao realizar login. Tente novamente.");
  }
}


export default function Login() {
  const navigation = useNavigation();

  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");       // Definir campos
  const [erro, setErro] = useState("");

  
const handleLogin = async () => {               // Função para lidar com o login
  try {
    const data = await loginComCpf(cpf, senha);
    Alert.alert("Login realizado!", `Token: ${data.token || "Sucesso"}`);
    navigation.navigate("Home"); 
  } catch (err: any) {
    setErro(err.message);
  }
}

return (
  <LinearGradient
        colors={['#7E7E7E', '#FAFAFA']}
        style={styles.container}
      >
    <Image
      source={require('../../assets/icon.png')}
      style={{ width: 200, height: 200 }}/>

    <Text 
    style={styles.title}>Login</Text>

    <View 
    style={styles.box}>
      <View 
      style={styles.inputs}>

        <TextInput placeholder="CPF"
          value={cpf} 
          onChangeText={setCpf}
          style={[styles.input, { paddingLeft: 16}]} />

        <TextInput 
          placeholder="Senha" 
          value={senha}
          onChangeText={setSenha}
          secureTextEntry 
          style={[styles.input, { paddingLeft: 16,  marginTop: 20,}]} /> {/* estilos adicionados separadamente para nao bugar ocodigo, margin top somente na senha para nao desalinhar os inputs do centro */}

          <TouchableOpacity 
            style={styles.button}
            onPress={handleLogin}>
            <Text 
            style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

      </View>

      <Text 
      style={styles.warn}>
        Esqueceu a Senha? {"\n"}
        <Text 
        style={[{color: "black", marginLeft: 0, fontSize: 10}]}>
        Entre em Contato com os DESENVOLVEDORES!
        </Text>
      </Text>
      {erro ? <Text style={{ color: "red", fontSize: 14, marginTop: 10 }}>{erro}</Text> : null}


    </View>


  </LinearGradient>
  );
}