import React from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";
import { style } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

export default function FirstScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#D62828', '#701515']}
      style={style.container}
    >
      <View style={style.logo}>
        <Image
          source={require('../../assets/adaptive-icon.png')}
          style={{ width: 150, height: 150, marginBottom: '60%' }}
        />
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

            
        
