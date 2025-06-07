import React from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { style } from "./BottomMenuStyles";
import { useNavigation } from "@react-navigation/native";


export default function BottomMenu() {

    const navigation = useNavigation();


    return (
        <View style={style.menuContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <FontAwesome5 name="user-tie" size={24} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <FontAwesome5 name="home" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <FontAwesome5 name="money-bill-wave" size={24} color="#fff" />
            </TouchableOpacity>

        </View>
    );
}


