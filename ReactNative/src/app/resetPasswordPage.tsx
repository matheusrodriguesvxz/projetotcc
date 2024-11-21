import { SafeAreaView, View, StyleSheet } from "react-native";
import { RoxoPasswordReset, VoltarButton } from "../components/Svgs";
import { Image, Text } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Controller } from "react-hook-form/dist/controller";
import { LoginInputs } from "../components/Login";
import { ResetInputs } from "../components/RegisterPage/RegisterPageComp";
import { useFonts } from "expo-font";
import { TouchableOpacity, TextInput, type TextInputProps } from "react-native";
import { forwardRef } from "react";
import { ButaoRedefinirSenha } from "../components/ResetPasswordPageComp/resetPasswordPageComp";

export default function resetPasswordPage() {
  return (
    <View>
      <Image
        className="mt-[-30] ml-[5] absolute w-200"
        source={require("../../assets/purplebg.png")}
      />
      <RoxoPasswordReset />
      <View className="absolute mt-[290]">
        <EvilIcons name="chevron-left" color={"black"} size={70} />
      </View>
      <View>
        <Text style={style.Textobutao}>Redefinir senha</Text>
      </View>
      <View className="items-center mt-[20]">
        <ResetInputs placeholder="Nova senha" secureTextEntry />
        <ResetInputs placeholder="Confirme sua nova senha" secureTextEntry />
      </View>
      <View className="items-center mt-[160] mr-[50]">
        <ButaoRedefinirSenha />
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  Textobutao: {
    fontFamily: "Poppins",
    color: "#760bff",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 305,
  },
});
