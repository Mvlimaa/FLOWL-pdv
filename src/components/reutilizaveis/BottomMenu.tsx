import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { style } from "./BottomMenuStyles";

type Props = {
  active?: "perfil" | "home" | "mensagens";
};

export default function BottomMenu({ active }: Props) {
  const navigation = useNavigation();

  return (
    <View style={style.menuContainer}>
      {/* Perfil */}
      <TouchableOpacity onPress={() => navigation.navigate("Perfil" as never)}>
        <FontAwesome5
          name="user"
          size={24}
          color={active === "perfil" ? "#FFD700" : "#fff"}
        />
      </TouchableOpacity>

      {/* Home */}
      <TouchableOpacity onPress={() => navigation.navigate("Home" as never)}>
        <FontAwesome5
          name="home"
          size={24}
          color={active === "home" ? "#FFD700" : "#fff"}
        />
      </TouchableOpacity>

      {/* Mensagens */}
      <TouchableOpacity onPress={() => navigation.navigate("Mensagens" as never)}>
        <FontAwesome5
          name="comment-dots"
          size={24}
          color={active === "mensagens" ? "#FFD700" : "#fff"}
        />
      </TouchableOpacity>
    </View>
  );
}
