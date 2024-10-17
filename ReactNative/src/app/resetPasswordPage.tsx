import { SafeAreaView, View, StyleSheet } from "react-native";
import { RoxoPasswordReset, VoltarButton } from "../components/Svgs";
import { Image, Text} from "react-native";
import { EvilIcons } from "@expo/vector-icons";


export default function resetPasswordPage(){
    return(
       <View>
            <Image className="mt-[-30] absolute" source={require("../../assets/purplebg.png")}/>
            <RoxoPasswordReset/>
            <View className="absolute mt-[250]">
                <EvilIcons name="chevron-left" color={"black"} size={70} />
            </View>
            <View>
                <Text style={style.TextobutaoRegistro}>Redefinir Senha</Text>
                
            </View>
       </View> 


    );
}
const style = StyleSheet.create({
    TextobutaoRegistro: {
        fontFamily: "Poppins",
        color: "#760BFF",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 1,
        marginTop: 265,
      }
})