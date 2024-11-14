import {
  _View,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import {
  Compras,
  Hand,
  IconPeople,
  ImagemWelcomeEventEasy,
  Music,
} from "../Svgs";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import { Rating } from "@rneui/themed";
import React, { useState } from "react";
import StarRating from "react-native-star-rating-widget";

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

export function BarraDePesquisa({ ...rest }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#909090" style={styles.icon} />
      <TextInput
        {...rest}
        style={styles.input}
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
    </View>
  );
}
export function Comprinhas() {
  return (
    <Pressable>
      <View className="items-center">
        <View
          className="w-20 h-20 items-center justify-center"
          style={{ backgroundColor: "#F0F0F0", borderRadius: 20 }}
        >
          <Compras />
        </View>
      </View>
    </Pressable>
  );
}
export function Payment() {
  return (
    <View className="items-center">
      <View
        className="w-20 h-20 items-center justify-center"
        style={{ backgroundColor: "#F0F0F0", borderRadius: 20 }}
      >
        <Hand />
      </View>
    </View>
  );
}
export function Playlist() {
  return (
    <View className="items-center">
      <Pressable onPress={() => router.push("/playlistPage")}>
        <View
          className="w-20 h-20 items-center justify-center"
          style={{ backgroundColor: "#F0F0F0", borderRadius: 20 }}
        >
          <Music />
        </View>
      </Pressable>
    </View>
  );
}

export function Viagens() {
  const [rating, setRating] = useState(4);

  return (
    <View className="flex flex-row gap-5">
        <Image className="mt-3" source={require("../../../assets/image7.png")}  />
      <View >
        <View className="flex flex-row justify-center items-center gap-5 mt-2">

        <Text
          className="text-left text-lg"
          style={{ fontFamily: "Poppins", fontWeight: "bold" }}
          >
          Praia de Cambuco
        </Text>
          </View>
        <View className="items-center ">
          <StarRating rating={rating} onChange={(newRating) => setRating(Math.round(newRating))} starSize={20}  />
        </View>
        <Text
          className="text-center text-lg "
          style={{  fontWeight: "200" }}
        >
          Praia Gostosa,igual o Fontes
        </Text>
        <Text
          className="text-center text-lg m-2 "
          style={{ fontFamily: "Poppins", fontWeight: "bold" }}
        >
         Canhema, Diadema
        </Text>
        <View>
        </View>
      </View>
    </View>
  );
}

export function HappyHour() {
  return (
    <View>
      <Image source={require("../../../assets/image8.png")} />
      <Text
        className="text-center text-lg"
        style={{ fontFamily: "Poppins", fontWeight: "bold" }}
      >
        Happy Hour
      </Text>
    </View>
  );
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
