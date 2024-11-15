import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { IconDrawer, IconMessage } from "../components/Svgs";
import TextBuyList from "../components/BuyList";
import { CheckBox } from "@rneui/base";
import { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";

export default function BuyList() {
  const [checked, setChecked] = useState(Boolean);
  return (
    <SafeAreaView style={styles.areaRoxo}>
      <View style={styles.title}>
        <TextBuyList />
      </View>
      <View style={styles.areaBranca}>
        <View className="mt-5 ml-5 ">
          <CheckBox
            title="Leite"
            checked={checked}
            checkedColor="#760FFF"
            onPress={() => setChecked(!checked)}
          />
        </View>
        <View style={styles.ViewBotao}>
          <View style={styles.Botao}>
            <Text style={styles.TextBotao}>+</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaRoxo: {
    backgroundColor: "#760BFF",
    height: "100%",
  },
  title: {
    marginTop: 40,
  },
  areaBranca: {
    backgroundColor: "white",
    height: "95%",
    marginTop: 50,
    borderRadius: 35,
  },

  ViewBotao: {
    display: "flex",
    alignItems: "flex-end",
  },
  Botao: {
    backgroundColor: "#760BFF",
    width: 55,
    borderRadius: 100,
    height: 55,
    display: "flex",
    justifyContent: "center",
    marginRight: 30,
    position: "relative",
    top: "850%",
  },

  TextBotao: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    marginBottom: 2,
  },
});
