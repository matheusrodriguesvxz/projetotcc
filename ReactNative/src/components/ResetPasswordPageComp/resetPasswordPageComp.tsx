import {
  TextInput,
  TouchableOpacity,
  type TextInputProps,
} from "react-native";
import { forwardRef } from "react";
import { router } from "expo-router";
import { View,  StyleSheet, Text, } from "react-native";


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
  export function ButaoRedefinirSenha() {
    return (
      <TouchableOpacity  onPress={() => {router.push("/")}} style={style.butaoRegistro}>
        <Text style={style.TextobutaoRegistro}>Redefinir</Text>
      </TouchableOpacity>
    );
  }
  const style = StyleSheet.create({
   
    TextobutaoRegistro: {
      fontFamily: "Poppins",
      color: "white",
      textAlign: "center",
      fontSize: 24,
      fontWeight: "bold",
      letterSpacing: 1,
    },
    butaoRegistro: {
        justifyContent: "center",
        position: "relative",
        top: 130,
        left: 20,
        width: 348,
        height: 56, 
        paddingVertical: 12,
        backgroundColor: "black",
        paddingHorizontal: 3,
        borderRadius: 20,
        marginBottom: 30,
      },
  });
  