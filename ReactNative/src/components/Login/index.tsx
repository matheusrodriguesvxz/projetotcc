import { useFonts } from "expo-font";
import * as Svg from "react-native-svg";
import { View, Image, StyleSheet, Pressable, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { BackgroundPurple } from "../Svgs";
export function LoginPage(){
    return(
        <View className="">
            <View>
                <View>

                </View>
            </View>
        </View>
    )
}

export function ButaoLogar() {
    return (
      <TouchableOpacity  onPress={() => {router.push("/homePage")}} style={style.butaoLogar}>
        <Text style={style.TextobutaoLogar}>Entrar</Text>
      </TouchableOpacity>
    );
  }
  
  const style = StyleSheet.create({
    butaoLogar: {
      justifyContent: "center",
      position: "relative",
      top: 0,
      left: 0,
      width: 218,
      paddingVertical: 12,
      backgroundColor: "#000000",
      paddingHorizontal: 3,
      borderRadius: 20,
      marginBottom: 30,
    },
    TextobutaoLogar: {
      fontFamily: "Poppins",
      color: "white",
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
      letterSpacing: 1,
    },
  });
  