import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LogoWithoutName } from "../components/Svgs";
import Slider from "@react-native-community/slider";
import { NextButton } from "../components/PlanPageWelcomeComponent/planPageWelcomeComponent";
import { router } from "expo-router";
import { useGuests } from "@/hooks/usePeople";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PlanPageGuests() {
  const { adults, setAdults, childs, setChilds } = useGuests();

  return (
    <>
      <Image
        className="-z-10"
        source={require("../../assets/purplewallpapers2.png")}
      />
      <View className="absolute h-full w-full  items-center">
        <LogoWithoutName />
        <View className="mt-[200] text-left flex flex-col justify-center items-center">
          <Text
            style={{
              fontFamily: "Poppins",
              color: "#ffffff",
              fontWeight: "900",
              fontSize: 23,
              width: 370,
              letterSpacing: 1,
            }}
          >
            Quantos adultos você planeja receber em seu evento?
          </Text>
          <View className="flex items-center mt-4">
            <Text
              style={{
                fontFamily: "Poppins",
                color: "#ffffff",
                fontSize: 23,
                letterSpacing: 1,
              }}
            >
              Número de Adultos: {adults}
            </Text>
            <Slider
              style={{ width: 330, height: 50 }}
              minimumValue={0}
              maximumValue={500}
              minimumTrackTintColor="#760BFF"
              maximumTrackTintColor="#760BFF"
              thumbTintColor="white"
              value={0}
              onValueChange={(value) => setAdults(Math.round(value))}
            />
          </View>
        </View>
        <View className=" mt-16 text-left flex flex-col justify-center items-center">
          <Text
            style={{
              fontFamily: "Poppins",
              color: "#ffffff",
              fontWeight: "900",
              fontSize: 23,
              width: 370,
              letterSpacing: 1,
            }}
          >
            Quantas crianças de 0 a 9 anos você planeja receber em seu evento?
          </Text>
          <View className="flex items-center mt-4">
            <Text
              style={{
                fontFamily: "Poppins",
                color: "#ffffff",
                fontSize: 23,
                letterSpacing: 1,
              }}
            >
              Número de Criancas: {childs}
            </Text>

            <Slider
              style={{ width: 330, height: 50 }}
              minimumValue={0}
              maximumValue={500}
              minimumTrackTintColor="#760BFF"
              maximumTrackTintColor="#760BFF"
              thumbTintColor="white"
              value={0}
              onValueChange={(value) => setChilds(Math.round(value))}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.setItem("adults", adults.toString());
              AsyncStorage.setItem("childs", childs.toString());

              console.log(adults, childs);
              router.push("/planPageAdress");
            }}
            style={style.NextButton}
          >
            <Text style={style.NextButtonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  NextButton: {
    width: 233,
    height: 56,
    marginTop: 120,
    paddingVertical: 12,
    backgroundColor: "black",
    paddingHorizontal: 3,
    borderRadius: 20,
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
