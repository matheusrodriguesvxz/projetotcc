import { View, Image, Text, StyleSheet, Dimensions} from "react-native";
import { useFonts } from "expo-font";
import { LogoWithoutName, PlanTypeEvent1, PlanTypeEvent2, PlanTypeEvent3, PlanTypeEvent4 } from "../components/Svgs";
import { NextButton, OptionsTypeBirthdayEvent } from "../components/PlanPageTypeEventComponent/PlanPageTypeEventComp";

export default function planPageWelcome(){
    const { width, height } = Dimensions.get("window");
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins-Bold.ttf"),
  });

    return(
        <>
        <Image source={require("../../assets/purplewallpapers2.png")}/>
        <View className="absolute h-full w-full">
        <LogoWithoutName/>
            <View className="mt-[236] ml-[24]">
                <Text style={style.Texto}>Que tipo de evento você pretende realizar?</Text>
            </View>
            <View>
                <PlanTypeEvent1/>
            </View>
            <View  className="mt-[126]">
                <NextButton/>
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
  