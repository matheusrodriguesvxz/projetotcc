import { View, StyleSheet, TouchableOpacity } from "react-native";
import { RoxoPasswordReset, VoltarButton } from "../components/Svgs";
import { Image, Text} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { ResetInputs } from "../components/RegisterPage/RegisterPageComp";
import { ButaoRedefinirSenhaEmail } from "../components/ResetPasswordEmailComp/ResetPasswordEmailCompIndex";
import { router } from "expo-router";

export default function ProfilePage(){
    return(
        <View>
            <Image className="mt-[-30] ml-[5] absolute w-200" source={require("../../assets/purplebg.png")}/>
            <RoxoPasswordReset/>
            <View className="absolute mt-[290]">
                <TouchableOpacity  onPress={() => {router.push("../index")}}>
                    <EvilIcons name="chevron-left" color={"black"} size={70} />
                </TouchableOpacity>
            </View>
            <View>
                <Text  style={style.Textobutao}>Redefinir senha</Text>
            </View>
            <View className="items-center mt-[20]" >
                <ResetInputs
                    placeholder="Insira um email para reuperação"
                />
                
            </View>
            <View className="items-center mt-[160] mr-[50]">
                <ButaoRedefinirSenhaEmail/>
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