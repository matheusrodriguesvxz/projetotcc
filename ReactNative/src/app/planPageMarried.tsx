import { router } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { NextButton } from "../components/PlanPageWelcomeComponent/planPageWelcomeComponent";
import { LogoWithoutName } from "../components/Svgs";
import { CheckBox } from "@rneui/base";
import { useState } from "react";

export default function PlanPageMarried() {
  const [checkedItems, setCheckedItems] = useState({
    agua: false,
    cerveja: false,
    refrigerante: false,
    suco: false,
    drinks: false,
    arroz: false,
    carnes: false,
    saladas: false,
    farofa: false,
    peixes: false,
    frango: false,
    crustaceo: false,
    colheres: false,
    copos: false,
    pratos: false,
    faca: false,
    guardanapo: false,
    bolo: false,
    sorvete: false,
    mousses: false,
    fracionados: false,
  });

  const toggleCheckbox = (item: keyof typeof checkedItems) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };
  return (
    <>
      <View className="flex justify-center items-center">
        <Image source={require("../../assets/image.png")} />
        <LogoWithoutName />
      </View>
      <View className="w-full rounded-[45] bg-white h-[800] items-center top-72 absolute">
        <View className="flex flex-row  mt-8">
          <View className="w-1/2 justify-left flex items-center">
            <Text style={styles.categorias}>Bebidas</Text>

            <View className="flex flex-col">
              <CheckBox
                title="Agua"
                checked={checkedItems.agua}
                checkedColor="#760FFF"
                onPress={() => toggleCheckbox("agua")}
              />
              <CheckBox
                className="bottom-6"
                title="Cerveja"
                checked={checkedItems.cerveja}
                checkedColor="#760FFF"
                onPress={() => toggleCheckbox("cerveja")}
              />
              <CheckBox
                className="bottom-12"
                title="Refrigerante"
                checked={checkedItems.refrigerante}
                checkedColor="#760FFF"
                onPress={() => toggleCheckbox("refrigerante")}
              />
              <CheckBox
                className="bottom-[65]"
                title="Suco"
                checked={checkedItems.suco}
                checkedColor="#760FFF"
                onPress={() => toggleCheckbox("suco")}
              />
              <CheckBox
                className="bottom-24"
                title="Drinks"
                checked={checkedItems.drinks}
                checkedColor="#760FFF"
                onPress={() => toggleCheckbox("drinks")}
              />
            </View>
          </View>
          <View className="">
            <Text style={styles.categorias}>Comidas</Text>
            <View className="flex flex-col">
              <CheckBox
                title="Arroz"
                checked={checkedItems.arroz}
                checkedColor="#760FFF"
                onPress={() => toggleCheckbox("arroz")}
              />
              <CheckBox
                className="bottom-6"
                title="Carnes"
                checked={checkedItems.carnes}
                checkedColor="#760FFF"
                onPress={() => toggleCheckbox("carnes")}
              />
              <CheckBox
                className="bottom-12"
                title="Saladas"
                checked={checkedItems.saladas}
                checkedColor="#760FFF"
                onPress={() => toggleCheckbox("saladas")}
              />
              <CheckBox
                className="bottom-[65]"
                title="Farofa"
                checked={checkedItems.farofa}
                checkedColor="#760FFF"
                onPress={() => toggleCheckbox("farofa")}
              />
              <CheckBox
                className="bottom-24"
                title="Peixes"
                checked={checkedItems.peixes}
                checkedColor="#760FFF"
                onPress={() => toggleCheckbox("peixes")}
              />
              <CheckBox
                className="bottom-28"
                title="Frango"
                checked={checkedItems.frango}
                checkedColor="#760FFF"
                onPress={() => toggleCheckbox("frango")}
              />
              <CheckBox
                className="bottom-32"
                title="Crustaceo"
                checked={checkedItems.crustaceo}
                checkedColor="#760FFF"
                onPress={() => toggleCheckbox("crustaceo")}
              />
            </View>
          </View>
        </View>
        <View className="flex flex-row bottom-32 ">
          <View className="w-[210] left-6 justify-left flex items-center">
            <View className="bottom-24">
              <Text style={styles.categorias}>Descartavel</Text>

              <View className="flex flex-col">
                <CheckBox
                  title="Colheres"
                  checked={checkedItems.colheres}
                  checkedColor="#760FFF"
                  onPress={() => toggleCheckbox("colheres")}
                />
                <CheckBox
                  className="bottom-6"
                  title="Copos"
                  checked={checkedItems.copos}
                  checkedColor="#760FFF"
                  onPress={() => toggleCheckbox("copos")}
                />
                <CheckBox
                  className="bottom-12"
                  title="Pratos"
                  checked={checkedItems.pratos}
                  checkedColor="#760FFF"
                  onPress={() => toggleCheckbox("pratos")}
                />
                <CheckBox
                  className="bottom-[65]"
                  title="Faca"
                  checked={checkedItems.faca}
                  checkedColor="#760FFF"
                  onPress={() => toggleCheckbox("faca")}
                />
                <CheckBox
                  className="bottom-24"
                  title="Guardanapo"
                  checked={checkedItems.guardanapo}
                  checkedColor="#760FFF"
                  onPress={() => toggleCheckbox("guardanapo")}
                />
              </View>
            </View>
          </View>
          <View className="">
            <Text style={styles.categorias}>Doces</Text>
            <View className="flex flex-col">
              <CheckBox
                title="Bolo"
                checked={checkedItems.bolo}
                checkedColor="#760FFF"
                onPress={() => toggleCheckbox("bolo")}
              />
              <CheckBox
                className="bottom-6"
                title="Sorvete"
                checked={checkedItems.sorvete}
                checkedColor="#760FFF"
                onPress={() => toggleCheckbox("sorvete")}
              />
              <CheckBox
                className="bottom-12"
                title="Mousses"
                checked={checkedItems.mousses}
                checkedColor="#760FFF"
                onPress={() => toggleCheckbox("mousses")}
              />
              <CheckBox
                className="bottom-[65]"
                title="Fracionados"
                checked={checkedItems.fracionados}
                checkedColor="#760FFF"
                onPress={() => toggleCheckbox("fracionados")}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  categorias: {
    fontFamily: "Poppins",
    color: "#760BFF",
    marginRight: 40,
    fontWeight: "900",
    fontSize: 24,
    marginLeft: 10,
    letterSpacing: 1,
  },
});
