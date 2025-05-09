import React from "react";
import { Image, Button, Text, View } from "react-native";
import { style } from "./styles";
import { LinearGradient } from "expo-linear-gradient";


export default function FirstScreen() {
    return (
        <View style={style.container}>
            
            

            <View style={style.logo}>
                <Image
                    source={require('../../assets/adaptive-icon.png')}
                    style={{ width: 150, height: 150, marginBottom: '60%' }}
                />
            </View>

            <View style={style.button}>
                <Text style={style.text}>Vamos Lá</Text>
            </View>

        </View>
    )
};