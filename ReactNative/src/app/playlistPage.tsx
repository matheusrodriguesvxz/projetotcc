import { SafeAreaView, View, Text } from "react-native";
import { BarraDePesquisa, CarosselImages } from "../components/HomePage";
import { useFonts } from "expo-font";
import { IconDrawer } from "../components/Svgs";

export default function playlistPage() {
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  return (
    <SafeAreaView style={{ backgroundColor: "#760BFF", height: "100%" }}>
      <View className="mt-10 flex ">
        <IconDrawer />
      </View>
      <View
        className="items-center"
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          borderRadius: 25,
        }}
      >
        <View style={{ marginTop: 30 }}>
          <CarosselImages />
        </View>

        <View>
          <BarraDePesquisa placeholder="Pesquisar músicas" />
        </View>

        <View>
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              marginTop: 20,
              fontSize: 25,
              textAlign: "center",
            }}
          >
            Em Alta
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontSize: 17,
              letterSpacing: 0.3,
              color: "black",
            }}
          >
            Confira as músicas em alta:
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
