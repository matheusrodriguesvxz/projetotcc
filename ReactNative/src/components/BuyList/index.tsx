import { useFonts } from "expo-font";
import { View, Text } from "react-native";

export  default function TextBuyList(){
    const [loaded] = useFonts({
        Poppins: require("../../../assets/fonts/Poppins-ExtraLight.ttf"),
      });
    return(
        <View>
            <Text style={{
        fontFamily: "Poppins",
        fontWeight: "bold",
        color: "white",
        letterSpacing: 0.5,
        marginTop: 5,
        fontSize:30,
        textAlign: "center"
      }}>Lista de Compras</Text>
        </View>
    )
}