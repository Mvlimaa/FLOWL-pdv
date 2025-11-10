import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import api from "../../axios/api";
import { styles } from "./styles";

const maskCPF = (value: string) => {
  let digits = value.replace(/\D/g, "");
  if (digits.length > 11) digits = digits.substring(0, 11);

  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export default function Login() {
  const navigation = useNavigation<any>();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleCpfChange = (text: string) => {
    setCpf(maskCPF(text));
  };

  const handleLogin = async () => {
    const cleanCpf = cpf.replace(/\D/g, "");

    if (cleanCpf.length !== 11 || senha.trim() === "") {
      Alert.alert("Atenção", "Preencha o CPF e a senha corretamente.");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const params = new URLSearchParams();
      params.append("username", cleanCpf);
      params.append("password", senha);

      const { data } = await api.post("/usuarios/login", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      console.log("✅ Login OK:", data);

      // 🚨 Aqui fazemos a separação: garçom ou gerente
      if (data.categoria === "gerente") {
        navigation.reset({
          index: 0,
          routes: [{ name: "DashboardGerente" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }

    } catch (err) {
      console.log("❌ Erro no login:", err);
      setErro("CPF ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#0D1117", "#1A202C", "#2D3748"]} style={styles.container}>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />

      <BlurView intensity={80} tint="dark" style={styles.card}>
        <Text style={styles.title}>Acesse sua conta:</Text>

        <View style={styles.inputBox}>
          <Ionicons name="person-outline" size={20} color="#E0E0E0" style={styles.icon} />
          <TextInput
            placeholder="CPF"
            placeholderTextColor="#A0AEC0"
            value={cpf}
            onChangeText={handleCpfChange}
            style={styles.input}
            keyboardType="numeric"
            maxLength={14}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#E0E0E0" style={styles.icon} />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#A0AEC0"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            style={styles.input}
          />
        </View>

        {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

        <TouchableOpacity
          style={[styles.button, (cpf.replace(/\D/g, "").length !== 11 || senha === "") && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <LinearGradient colors={["#007BFF", "#00C6FF"]} style={styles.gradientBtn}>
              <Text style={styles.buttonText}>Entrar</Text>
            </LinearGradient>
          )}
        </TouchableOpacity>
      </BlurView>
    </LinearGradient>
  );
}
