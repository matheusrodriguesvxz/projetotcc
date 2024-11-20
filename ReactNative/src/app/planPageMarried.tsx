import { router } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LogoWithoutName } from "../components/Svgs";
import { CheckBox } from "@rneui/base";
import { UseFoods } from "@/hooks/useFoods";
import { BuyListRepository } from "../repository/BuyListRepository";
import { BuyListServices } from "../service/BuyListServices";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BuyLists } from "../entity/BuyList";
import { MarriedFoods } from "../data/Married/adultsFoodMarried";
import { ChildMarriedFood } from "../data/Married/childFoodMarried";

export default function PlanPageMarried() {
  const { checkedItems, setCheckedItems } = UseFoods();
  const buyListRespository = new BuyListRepository();
  const buyListService = new BuyListServices(buyListRespository);
  const [childs, setChilds] = useState(0);
  const [adults, setAdults] = useState(0);
  const [eventID, setEventID] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const fetchChilds = async () => {
      const childs = await AsyncStorage.getItem("childs");
      if (childs) {
        setChilds(Number(childs));
      }
    };
    fetchChilds();

    const fetchAdults = async () => {
      const adults = await AsyncStorage.getItem("adults");
      if (adults) {
        setAdults(Number(adults));
      }
    };
    fetchAdults();

    const fetchEventID = async () => {
      const eventID = await AsyncStorage.getItem("eventID");
      setEventID(eventID ?? "");
    };

    fetchEventID();

    const fetchUserID = async () => {
      const userID = await AsyncStorage.getItem("user");
      setUserID(userID ?? "");
    };

    fetchUserID();
  }, []);

  const toggleCheckbox = (item: keyof typeof checkedItems) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const getCheckedItems = () => {
    return Object.keys(checkedItems)
      .filter((item) => checkedItems[item])
      .map((item) => item);
  };

  const sendToDatabaseOneByOne = async () => {
    const itemsToSend = getCheckedItems();
    const categories = {
      L: ["agua", "cerveja", "refrigerante", "suco", "drinks"],
      KG: [
        "arroz",
        "bolo",
        "carnes",
        "farofa",
        "peixes",
        "frango",
        "crustaceo",
        "bolo",
      ],
      unidades: ["colheres", "copos", "pratos", "faca", "guardanapo"],
      g: [ "sorvete", "saladas", "mousses", "fracionados"],
    };

    try {
      const foodMap = MarriedFoods.reduce((map, food) => {
        map[food.name.toLocaleLowerCase()] = food.quantity;
        return map;
      }, {});
      const foodMapChilds = ChildMarriedFood.reduce((map, food) => {
        map[food.name.toLocaleLowerCase()] = food.quantity;
        return map;
      }, {});

      for (const name of itemsToSend) {
        const quantityPerPersonAdults = foodMap[name.toLocaleLowerCase()] || 0;
        const quantityPerPersonChilds =
          foodMapChilds[name.toLocaleLowerCase()] || 0;
        let totalForItemAdults = quantityPerPersonAdults * adults;
        let totalForItemChilds = quantityPerPersonChilds * childs;
        let totalForItem = totalForItemAdults + totalForItemChilds;
        let unit = "";
        if (categories.L.includes(name)) {
          unit = "L";
        } else if (categories.KG.includes(name)) {
          unit = "KG";
        } else if (categories.unidades.includes(name)) {
          unit = "unidades";
        } else if (categories.g.includes(name)) {
          unit = "g";
          if (totalForItem < 1) {
            totalForItem *= 1000;
            unit = "g";
          } else if (totalForItem >= 1000) {
            totalForItem /= 1000;
            unit = "KG";
          }
        }
        const quantityWithUnit = `${totalForItem.toFixed(2)}${unit}`;
        const buyList = new BuyLists({
          name: name,
          status: "pending",
          userID: userID,
          id_events: eventID,
          quantity: quantityWithUnit,
        });

        await buyListService.create(buyList);
        router.push("/(tabs)");
      }
    } catch (error) {
      console.error("Erro ao enviar os itens:", error);
    }
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
          <View className="bottom-2">
            <Text style={styles.categorias}>Doces</Text>
            <View className="flex flex-col  ">
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
            <TouchableOpacity
              style={styles.NextButton}
              onPressIn={() => {
                try {
                  sendToDatabaseOneByOne();
                } catch (error) {
                  console.error("Erro ao enviar os itens:", error);
                }
              }}
            >
              <Text style={styles.NextButtonText}>Próximo</Text>
            </TouchableOpacity>
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

  NextButton: {
    justifyContent: "center",
    width: 233,
    height: 56,
    position: "absolute",
    marginTop: 20,
    right: 65,
    top: 160,
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
});
