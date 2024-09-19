import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import WelcomeEventEasy, {
  BarraDePesquisa,
  CarosselImages,
  Comprinhas,
  HappyHour,
  Invites,
  Payment,
  Playlist,
  Viagens,
} from "../components/HomePage";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import * as Svg from "react-native-svg";
import { IconDrawer, IconMessage, IconPeople } from "../components/Svgs";
import PagerView from "react-native-pager-view";

export default function HomePage() {
  return (
    <SafeAreaView style={{ backgroundColor: "#760BFF", height: "100%" }}>
      <View className="mt-3 ml-3 flex ">
        <View className="flex ">
          <IconDrawer />
        </View>
        <View className=" items-end  right-4 bottom-4 ">
          <IconMessage />
        </View>
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
        <WelcomeEventEasy />
        <View className="items-center" style={{ marginBottom: 20 }}>
          <BarraDePesquisa placeholder="Procurar" />
        </View>
        <View className="items-center justify-center">
          <CarosselImages />
        </View>

        <View className="flex flex-row gap-6 mt-1">
          <Invites />
          <Comprinhas />
          <Payment />
          <Playlist />
        </View>

        <Text
          style={{
            fontFamily: "Poppins",
            fontWeight: "bold",
            letterSpacing: 1,
          }}
          className="text-2xl mt-1 mr-72"
        >
          Populares
        </Text>
        <View className="flex flex-row gap-14 mt-2">
          <Viagens />
          <HappyHour />
        </View>
      </View>
    </SafeAreaView>
  );
}
