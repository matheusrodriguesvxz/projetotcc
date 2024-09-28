import { ImageBackground, View, Image, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "../components/Svgs";
import { useFonts } from "expo-font";
import { CheckBox } from "@rneui/themed";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ButaoRegistro } from "../components/RegisterPage/RegisterPageComp";

export default function RegisterPage() {
  const [loaded, arial] = useFonts({
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  const [checked, setChecked] = useState(false);

  return (
    <View className="h-full bg-white">
      <Image
        source={require("../../assets/purplebg.png")}
        className="h-100 w-100 z-index -1 right-[7] bottom-1"
      />
      <View className=" w-full h-52 absolute items-center mt-28">
        <Logo />
      </View>
      <View className="bg-white rounded-[80] h-[80] top-[-50] w-full p-9">
        <View className="absolute left-11 top-14">
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "#760FFF",
              letterSpacing: 0.5,
              marginTop: 5,
              fontSize: 23,
            }}
          >
            Criar Conta
          </Text>

          <TextInput
            className="mt-8 border-1 border-b-4 py-2 w-[315] border-purple-800   "
            placeholder="Nome completo"
            placeholderTextColor="#909090"
            style={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "#000000",
              letterSpacing: 0.5,
              marginTop: 25,
              fontSize: 16,
              borderColor: "#760bFF",
            }}
          />

          <TextInput
            className="mt-8 border-1 border-b-4 py-2 w-[315] border-purple-800   "
            placeholder="E-mail"
            placeholderTextColor="#909090"
            style={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "#000000",
              letterSpacing: 0.5,
              marginTop: 25,
              fontSize: 16,
              borderColor: "#760bFF",
            }}
          />

          <TextInput
            className="mt-8 border-1 border-b-4 py-2 w-[315] border-purple-800   "
            placeholder="Senha"
            secureTextEntry
            placeholderTextColor="#909090"
            style={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "#000000",
              letterSpacing: 0.5,
              marginTop: 25,
              fontSize: 16,
              borderColor: "#760bFF",
            }}
          />

          <TextInput
            className="mt-8 border-1 border-b-4 py-2 w-[315] border-purple-800   "
            placeholder="Confirme sua senha"
            placeholderTextColor="#909090"
            style={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "#000000",
              letterSpacing: 0.5,
              marginTop: 25,
              fontSize: 16,
              borderColor: "#760bFF",
            }}
          />

          <CheckBox
            className="w-96 right-5"
            title="Eu li e Aceito os Termos de Serviços e a Politica de Privacidade"
            checked={checked}
            checkedColor="#760FFF"
            onPress={() => setChecked(!checked)}
          />
        </View>
      </View>
      <ButaoRegistro />
    </View>
  );
}
