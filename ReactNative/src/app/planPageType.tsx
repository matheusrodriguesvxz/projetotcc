import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { LogoWithoutName } from "../components/Svgs";
import { router } from "expo-router";
import { UseTypesEvents } from "@/hooks/useTypesEvents";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function planPageWelcome() {
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  const { selectedIndex, toggleSelect } = UseTypesEvents();

  return (
    <>
      <Image source={require("../../assets/purplewallpapers2.png")} />
      <View className="absolute h-full w-full">
        <LogoWithoutName />
        <View className="mt-[210] mb-10 ml-[24]">
          <Text style={style.Texto}>
            Que tipo de evento você pretende fazer?
          </Text>
        </View>
        <View className="w-full rounded-[45] bg-white h-[800] items-center">
          <View className="flex flex-row items-center justify-center gap-8 mt-8 mb-8">
            <TouchableOpacity
              onPress={() => toggleSelect(0)}
              style={[style.container, selectedIndex === 0 && style.selected]}
            >
              <View className="flex justify-end">
                <Image
                  source={require("../../assets/Group 2.png")}
                  style={style.image}
                />
                <Text className="absolute" style={style.categorias}>
                  Casamento
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleSelect(1)}
              style={[style.container, selectedIndex === 1 && style.selected]}
            >
              <View className="flex justify-end">
                <Image
                  source={require("../../assets/Group 3.png")}
                  style={style.image}
                />
                <Text className="absolute" style={style.categorias}>
                  Aniversário
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="flex flex-row items-center justify-center gap-8  ">
            <TouchableOpacity
              onPress={() => toggleSelect(2)}
              style={[style.container, selectedIndex === 2 && style.selected]}
            >
              <View className="flex justify-end">
                <Image
                  source={require("../../assets/Group 4.png")}
                  style={style.image}
                />
                <Text className="absolute" style={style.categorias}>
                  Viagem
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleSelect(3)}
              style={[style.container, selectedIndex === 3 && style.selected]}
            >
              <View className="flex justify-end">
                <Image
                  source={require("../../assets/Group 5.png")}
                  style={style.image}
                />
                <Text className="absolute" style={style.categorias}>
                  Rolê/Festa
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={style.NextButton}
            onPressIn={() => {
              const typeMap = [
                "Casamento",
                "Aniversário",
                "Viagem",
                "Role / Festas",
                "Outro",
              ];
              
              const eventType = typeMap[selectedIndex!] || "Outro";
              console.log(eventType);
              AsyncStorage.setItem("index", eventType);

              router.push("/planPageGuests");
            }}
          >
            <Text style={style.NextButtonText}>Próximo</Text>
          </TouchableOpacity>
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
  container: {
    borderWidth: 3,
    borderColor: "transparent",
    borderRadius: 8,
    overflow: "hidden",
  },
  selected: {
    borderColor: "green",
    borderRadius: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  NextButton: {
    justifyContent: "center",
    width: 233,
    height: 56,
    marginTop: 20,
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

  categorias: {
    fontFamily: "Poppins",
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 17,
    marginLeft: 10,
    letterSpacing: 1,
  },
});
