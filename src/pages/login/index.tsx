import api from "../../axios/api";
import React, { useState } from "react";  //useState para armazenar email e senha
import { styles } from "./styles";
import {  Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { LinearGradient } from 'expo-linear-gradient';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async() => {     // Funcao executada ao clicar em ENTRAR
    try {
      const response = await api.post("/login", {
        email,
        password
      });

      if (response.status === 200) {
        Alert.alert("Login realizado!", `Token: ${response.data.token}`);
      } else {
        Alert.alert("Erro", "Credenciais inválidas! Verificar novamente ou entrar em contato com os Desenvolvedores")
      }     
    } catch (error) {
      Alert.alert("Erro", "Falha na conexão com o servidor");
      console.error(error);
    }
  };

return (
  <LinearGradient
        colors={['#D62828', '#701515']}
        style={styles.container}
      >
    <Image
      source={require('../../assets/adaptive-icon.png')}
      style={{ width: 150, height: 150, marginBottom: '5%' }}/>

    <Text style={styles.title}>Login</Text>

    <View style={styles.box}>
      <View style={styles.inputs}>

        <TextInput placeholder="Email" //Valor dentro da box
          value={email} //Sincroniza o estado
          onChangeText={setEmail} // Atualiza o valor quando digitado pelo usuário
          style={[styles.input, { paddingLeft: 16}]} />

        <TextInput placeholder="Senha" 
          value={password}
          onChangeText={setPassword}
          secureTextEntry 
          style={[styles.input, { paddingLeft: 16,  marginTop: 20,}]}/> {/* estilos adicionados separadamente para nao bugar ocodigo,   margin top somente na senha para nao desalinhar os inputs do centro */}

          <TouchableOpacity 
            onPress={handleLogin}
            style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

      </View>

      <Text style={styles.warn}>
        Esqueceu a Senha? {"\n"}
        <Text style={[{color: "black", marginLeft: 0, fontSize: 10}]}>
        Entre em Contato com os DESENVOLVEDORES!
        </Text>
      </Text>
      


    </View>

    
  </LinearGradient>
  );
}