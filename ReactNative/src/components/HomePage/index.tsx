import {
  _View,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Svg from "react-native-svg";
import { Carossel1, Compras, Hand, IconPeople, ImagemWelcomeEventEasy, Music } from "../Svgs";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import PagerView from "react-native-pager-view";
import { useFonts } from "expo-font";
export default function WelcomeEventEasy() {
  const [loaded] = useFonts({
    Poppins: require("../../../assets/fonts/Poppins-Bold.ttf"),
  });
  return (
    <View
      style={{
        marginTop: 35,
        width: 350,
        height: 110,
        borderRadius: 20,
        backgroundColor: "#E8E8E8",
        justifyContent: "center",
      }}
    >
      <View className="flex  mt-14 ml-3 ">
        <Text
          className="text-3xl relative top-32  text-black"
          style={{
            fontFamily: "Poppins",
            fontWeight: "medium",
            letterSpacing: 1.1,
          }}
        >
          Bem-vindo
        </Text>
        <Text
          className="text-4xl relative top-32  text-black"
          style={{
            fontFamily: "Poppins",
            fontWeight: "700",
            letterSpacing: 1.1,
          }}
        >
          a EventEasy
        </Text>
      </View>
      <View className="items-end relative left-11 mb-24 bottom-2">
        <ImagemWelcomeEventEasy />
      </View>
    </View>
  );
}

export function BarraDePesquisa() {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#909090" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Procurar"
        placeholderTextColor="#909090"
      />
    </View>
  );
}
const data = [
  {
    key: "1",
    text: "Primera Aba",
    image: require("../../../assets/image5.png"),
  },
  {
    key: "2",
    text: "Segunda Aba",
    image: require("../../../assets/image6.png"),
  },
];

const { width } = Dimensions.get("window");

export function CarosselImages() {
  return (
    <View className="h-56">
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View className="items-center" style={[styles.page, { width }]}>
            <Image source={item.image} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
}

export function Invites() {
  return (
    <View className="items-center">
      <View
        className="w-20 h-20 items-center justify-center"
        style={{ backgroundColor: "#F0F0F0", borderRadius: 20 }}
      >
        <IconPeople />
      </View>
      <Text
        style={{ fontFamily: "Poppins", fontWeight: "bold", color: "#BFBFBF", letterSpacing:0.5, marginTop:5 }}
      >
        Convidados
      </Text>
    </View>
  );
}
export function Comprinhas() {
  return (
    <View className="items-center">
      <View
        className="w-20 h-20 items-center justify-center"
        style={{ backgroundColor: "#F0F0F0", borderRadius: 20 }}
      >
        <Compras/>
      </View>
      <Text
        style={{ fontFamily: "Poppins", fontWeight: "bold", color: "#BFBFBF", letterSpacing:0.5, marginTop:5 }}
      >
        Compras
      </Text>
    </View>
  );
}
export function Payment() {
  return (
    <View className="items-center">
      <View
        className="w-20 h-20 items-center justify-center"
        style={{ backgroundColor: "#F0F0F0", borderRadius: 20 }}
      >
        <Hand/>
      </View>
      <Text
        style={{ fontFamily: "Poppins", fontWeight: "bold", color: "#BFBFBF", letterSpacing:0.5, marginTop:5 }}
      >
        Orçamento
      </Text>
    </View>
  );
}
export function Playlist() {
  return (
    <View className="items-center">
      <View
        className="w-20 h-20 items-center justify-center"
        style={{ backgroundColor: "#F0F0F0", borderRadius: 20 }}
      >
        <Music/>
      </View>
      <Text
        style={{ fontFamily: "Poppins", fontWeight: "bold", color: "#BFBFBF", letterSpacing:0.5, marginTop:5 }}
      >
        Playlist
      </Text>
    </View>
  );
}


export function Viagens(){
  return(
    <View>
      <Image source={require("../../../assets/image7.png")}/>
      <Text className="text-center text-lg" style={{fontFamily:"Poppins", fontWeight:"bold"}}>Viagens</Text>
    </View>
  )
}
export function HappyHour(){
  return(
    <View>
      <Image source={require("../../../assets/image8.png")}/>
      <Text className="text-center text-lg" style={{fontFamily:"Poppins", fontWeight:"bold" }}>Happy Hour</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 333,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#F0F0F0",
    textAlign: "left",
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "bold",
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
    marginLeft: 20,
  },
  input: {
    borderRadius: 30,
    backgroundColor: "#F0F0F0",
    textAlign: "left",
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },

  page: {},
  image: {
    width: "90%",
    height: 180,
    borderRadius: 10,
  },
});
