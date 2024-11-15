import { View, Image, Text, StyleSheet, Dimensions} from "react-native";
import { useFonts } from "expo-font";
import { LogoWithoutName } from "../../components/Svgs";
import { NextButton } from "../../components/PlanPageWelcomeComponent/planPageWelcomeComponent";
import { router } from "expo-router";

export default function planPageWelcome(){
    const { width, height } = Dimensions.get("window");
  const [loaded] = useFonts({
    Poppins: require("../../../assets/fonts/Poppins-Bold.ttf"),
  });

    return(
        <>
        <Image source={require("../../../assets/purplewallpapers2.png")}/>
        <View className="absolute h-full w-full">
        <LogoWithoutName/>
            <View className="mt-[236] ml-[24]">
                <Text style={style.Texto}>Vamos Começar</Text>
                <Text className="mt-[30]" style={style.Texto2}>Esses são os primeiros passos para um momento inesquecível!</Text>
            </View>
            <View>
                <NextButton onPress={() => {router.push('/planPageType')}}/>
            </View>
        </View>
        </>
    );
}
const style = StyleSheet.create({
    Texto: {
        fontFamily: "Poppins",
        color: "#ffffff",
        fontWeight: "900",
        fontSize: 27,
        letterSpacing: 1,
      },
    Texto2: {
      fontFamily: "Poppins",
      color: "#ffffff",
      fontSize: 27,
      letterSpacing: 1,
    },
  });
  