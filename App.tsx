import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import FirstScreen from './src/pages/firstScreen';
import Login from "./src/pages/login";
import Home from "./src/pages/home";
import Mesas from "./src/pages/mesas";
import DetalhesMesa from "./src/pages/detalhesMesa";
import Cardapio from "./src/pages/cardapio";
import Perfil from "./src/pages/perfil";
import Mensagens from "./src/pages/mensagens";
import ChatDetalhes from "./src/pages/mensagens/chatDetalhes";
import DashboardGerente from "./src/pages/gerente/index";
import Relatorios from "./src/pages/gerente/Relatorios";
import Garcons from "./src/pages/gerente/Garcons";


const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Pacifico: require('./src/assets/fonts/Pacifico-Regular.ttf'),
  });

  const [carregandoAuth, setCarregandoAuth] = useState(true);
  const [rotaInicial, setRotaInicial] = useState("First");

  useEffect(() => {
    const verificarLogin = async () => {
      const userData = await AsyncStorage.getItem("usuarioLogado");

      if (!userData) {
        setRotaInicial("Login");
      } else {
        const user = JSON.parse(userData);
        setRotaInicial(user.categoria === "gerente" ? "DashboardGerente" : "Home");
      }

      setCarregandoAuth(false);
    };

    verificarLogin();
  }, []);

  if (!fontsLoaded || carregandoAuth) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={rotaInicial}>
        <Stack.Screen name="First" component={FirstScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
        <Stack.Screen name="Mesas" component={Mesas} options={{ title: "Mesas" }} />
        <Stack.Screen name="DetalhesMesa" component={DetalhesMesa} options={{ title: "Detalhes da Mesa" }} />
        <Stack.Screen name="Cardapio" component={Cardapio} options={{ title: "Cardápio" }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ title: "Perfil", headerShown: false }} /> 
        <Stack.Screen name="Mensagens" component={Mensagens} options={{ title: "Mensagens" }} />
        <Stack.Screen name="ChatDetalhes" component={ChatDetalhes} options={{ title: "Chat", headerShown: false }} />
        <Stack.Screen name="DashboardGerente" component={DashboardGerente} options={{ title: "Painel do Gerente", headerShown: false }} />
        <Stack.Screen name="GerenteRelatorios" component={Relatorios} options={{ headerShown: false }} />
        <Stack.Screen name="Garcons" component={Garcons} options={{ title: "Garçons" }} />

      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
