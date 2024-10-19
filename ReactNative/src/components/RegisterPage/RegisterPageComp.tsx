import { useFonts } from "expo-font";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  type TextInputProps,
} from "react-native";
import { BackgroundPurple } from "../Svgs";
import { forwardRef } from "react";

export default function FundoDaTela() {
  const [loaded] = useFonts({
    Poppins: require("../../../assets/fonts/Poppins-Bold.ttf"),
  });
  return (
    <View style={{ backgroundColor: "white" }}>
      <BackgroundPurple />
    </View>
  );
}


export function ButaoRegistro({ ...rest }) {
   const [loaded] = useFonts({
    Poppins: require("../../../assets/fonts/Poppins-Bold.ttf"),
  });
  return (
    <TouchableOpacity style={style.butaoRegistro} {...rest}>
      <Text style={style.TextobutaoRegistro}>Cadastrar-Se</Text>
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
    top: 320,
    left: 80,
    width: 218,
    paddingVertical: 12,
    backgroundColor: "#760bFF",
    paddingHorizontal: 3,
    borderRadius: 20,
    marginBottom: 30,
  },
  TextobutaoRegistro: {
    fontFamily: "Poppins",
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export const ResetInputs = forwardRef<TextInput, TextInputProps>(
  ({ style, ...rest }, ref) => {
    return (
      <TextInput
        {...rest}
        placeholderTextColor="#909090"
        className="mt-8 border-1 border-b-4 py-2 w-[315] border-purple-800"
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
    );
  }
);

export function TitleRegister() {
  return (
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
  );
}