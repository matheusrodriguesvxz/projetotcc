import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { View, Image, Text, StyleSheet, Dimensions} from "react-native";

export function NextButton({...rest}) {
    return (
      <TouchableOpacity {...rest}  style={style.NextButton}>
        <Text style={style.NextButtonText}>Próximo</Text>
      </TouchableOpacity>
    );
  }
  const style = StyleSheet.create({
   
    NextButton: {
      justifyContent: "center",
      position: "relative",
      top: 330,
      left: 85,
      width: 233,
      height: 56, 
      paddingVertical: 12,
      backgroundColor: "black",
      paddingHorizontal: 3,
      borderRadius: 20,
      marginBottom: 30,
    },
    NextButtonText: {
      fontFamily: "Poppins",
      color: "#ffffff",
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
      letterSpacing: 1,
    },
  });
  