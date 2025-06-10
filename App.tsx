import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstScreen from './src/pages/firstScreen';
import Login from "./src/pages/login";
import Mesas from "./src/pages/mesas";
import Home from "./src/pages/home";
import DetalhesMesa from "./src/pages/detalhesMesa";
import Cardapio from "./src/pages/cardapio";



const Stack = createNativeStackNavigator();




export default function App() {


  const [fontsLoaded] = useFonts ({
    Pacifico: require('./src/assets/fonts/Pacifico-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="First">
        <Stack.Screen name="First" component={FirstScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
        <Stack.Screen name="Home" component={Home}
        options={{title: "Home"}} />
        <Stack.Screen name="Mesas" component={Mesas} options={{title: "Mesas"}} />
        <Stack.Screen name="DetalhesMesa" component={DetalhesMesa} options={{title: "DetalhesMesa"}} />
        <Stack.Screen name="Cardapio" component={Cardapio} options={{title: "Cardápio"}} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
