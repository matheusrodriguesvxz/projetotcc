import { Text, View,  Dimensions} from "react-native";
import { ButaoLogin, ButaoRegistro } from "../components/index/indexComp";
import { useFonts } from "expo-font";
import FundoDaTela from "../components/index/indexComp";
import { ImageInicialPage } from "../components/Svgs";

export default function Index() {
  const { width, height } = Dimensions.get("window");
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
  });

  return (
    <View className="bg-white w-full h-full items-center">
      <Text className=" z-50 text-center mt-14 text-4xl"
        style={{ color: "#760BFF", fontFamily: "Poppins", fontWeight: "bold" }}>
        EventEasy
      </Text>
      <View className="absolute top-44 z-50">
        <ImageInicialPage />
      </View>
      <View className="absolute top-96 mt-56  font-semibold z-50 ">
        <Text
          style={{
            color: "white",
            fontFamily: "Poppins",
            fontWeight: "ultralight",
            fontSize: 25,
            width: 325,
          }}
        >Organize seus eventos de forma fácil e eficiente. Vamos começar!
        </Text>
      </View>
      <View className="z-50 absolute top-96 mt-56 items-center right-32 ">
        <ButaoRegistro />
        <ButaoLogin />
      </View>
      <View className="right-1 bottom-10">
        <FundoDaTela />
      </View>
    </View>
  );
}
