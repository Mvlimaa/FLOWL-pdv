import React from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";
import { style } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

export default function FirstScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
    
      colors={['#7E7E7E', '#FAFAFA']} 
      style={style.container}
    >
      <View style={style.logo}>
        <Image
          source={require('../../assets/icon.png')}
    
          style={{ width: 250, height: 250 }} 
        />
        
       
        <Text style={style.title}>
          Bem-vindo(a)!
        </Text>

        <Text style={style.subtitle}>
          A sua jornada começa aqui.
        </Text>
      </View>

      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.navigate("Login")}
      >

        <Text style={style.text}>Vamos Lá</Text> 
      </TouchableOpacity>
    </LinearGradient>
  );
}