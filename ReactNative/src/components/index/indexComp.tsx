import { useFonts } from "expo-font";
import * as Svg from "react-native-svg";
import { View,  StyleSheet, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { BackgroundPurple } from "../Svgs";

export default function FundoDaTela() {
  const [loaded, arial] = useFonts({
    PoppinsBold: require("../../../assets/fonts/Poppins-Bold.ttf"),
  });
  return (
    <View style={{ backgroundColor: "white" }}>
      <BackgroundPurple/>
    </View>
  );
}

export function ButaoLogin() {
  return (
    <TouchableOpacity onPress={() => {router.push("/login")}} style={style.butao}>
      <Text style={style.Textobutao}>Entrar</Text>
    </TouchableOpacity>
  );
}
export function ButaoRegistro() {
  return (
    <TouchableOpacity  onPress={() => {router.push("/(tabs)/calendarPage")}} style={style.butaoRegistro}>
      <Text style={style.TextobutaoRegistro}>Registrar-Se</Text>
    </TouchableOpacity>
  );
}

  const style = StyleSheet.create({
  butao: {
    justifyContent: "center",
    position: "relative",
    top: 130,
    left: 20,
    width: 218,
    paddingVertical: 12,
    backgroundColor: "black",
    paddingHorizontal: 3,
    borderRadius: 20,
  },
  butaoRegistro: {
    justifyContent: "center",
    position: "relative",
    top: 130,
    left: 20,
    width: 218,
    paddingVertical: 12,
    backgroundColor: "white",
    paddingHorizontal: 3,
    borderRadius: 20,
    marginBottom: 30,
  },
  Textobutao: {
    fontFamily: "Poppins",
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  TextobutaoRegistro: {
    fontFamily: "Poppins",
    color: "#760BFF",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
