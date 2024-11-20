import { Text, View, Dimensions, StyleSheet } from "react-native";
import { ButaoLogin, ButaoRegistro } from "../components/index/indexComp";
import { useFonts } from "expo-font";
import FundoDaTela from "../components/index/indexComp";
import { ImageInicialPage } from "../components/Svgs";
import Animated, { FadeInDown, FadeInUp, BounceOut } from "react-native-reanimated";

export default function Index() {
  const { width, height } = Dimensions.get("window");
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
  });

  return (
    <Animated.View entering={FadeInDown.delay(300).duration(2000).springify()} className="bg-white w-full h-full items-center">
      <Animated.Text entering={FadeInUp.delay(400).duration(2000).springify()} className=" z-50 text-center mt-14 text-4xl" style={styles.title}>
        EventEasy
      </Animated.Text>
      <Animated.View entering={FadeInUp.delay(400).duration(2000).springify()}  className="absolute top-44 z-50">
        <ImageInicialPage />
      </Animated.View>
      <Animated.View entering={FadeInUp.delay(500).duration(2000).springify()} className="absolute top-96 mt-56  font-semibold z-50 ">
        <Text style={styles.Paragrafo}>
          Organize seus eventos de forma fácil e eficiente. Vamos começar!
        </Text>
      </Animated.View>
      <Animated.View entering={FadeInUp.delay(600).duration(2000).springify()} className="z-50 absolute top-96 mt-56 items-center right-32 ">
        <ButaoRegistro />
        <ButaoLogin />
      </Animated.View>
      <Animated.View entering={FadeInUp.delay(700).duration(2000).springify()} className="right-1 bottom-10">
        <FundoDaTela />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#760BFF",
    fontFamily: "Poppins",
    fontWeight: "bold",
  },

  Paragrafo: {
    color: "white",
    fontFamily: "Poppins",
    fontWeight: "ultralight",
    fontSize: 25,
    width: 325,
  },
});
