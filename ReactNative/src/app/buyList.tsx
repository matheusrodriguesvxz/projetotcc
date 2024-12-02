import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BuyListServices } from "../service/BuyListServices";
import TextBuyList from "../components/BuyList";
import { CheckBox, Tab } from "@rneui/base";
import { BuyListRepository } from "../repository/BuyListRepository";
import Checkbox from "./checkbox";
import { BuyLists } from "../entity/BuyList";
import { LayoutAnimation, UIManager, Platform } from "react-native";

export type BuyListType = {
  id: string;
  name: string;
  status: string;
  id_events: string;
  quantity: string;
  totalPrice: string;
};
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function BuyList() {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [buyList, setBuyList] = useState<BuyListType[]>([]);
  const [eventID, setEventID] = useState<string>("");
  const buyListRepository = new BuyListRepository();
  const buyListService = new BuyListServices(buyListRepository);
  const [index, setIndex] = useState(0);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const totalCost = buyList
      .filter((item) => item.status === "pending")
      .reduce((sum, item) => sum + Number.parseFloat(item.totalPrice || 0), 0)
      .toFixed(2);

    const saveTotalCostToStorage = async () => {
      try {
        await AsyncStorage.setItem("totalCost", totalCost);
        console.log("Total Cost saved successfully");
      } catch (error) {
        console.error("Error saving total cost to AsyncStorage:", error);
      }
    };

    saveTotalCostToStorage();
  }, [buyList]);

  useEffect(() => {
    const fetchIdEvent = async () => {
      try {
        const storedEvent = await AsyncStorage.getItem("idEventBuyList");
        console.log("Evento recuperado:", storedEvent);
        if (storedEvent !== null) {
          setEventID(storedEvent);
        } else {
          console.log("Nenhum evento encontrado no AsyncStorage");
        }
      } catch (error) {
        console.error("Erro ao recuperar evento:", error);
      }
    };

    fetchIdEvent();
    fetchBuyList();

    const fetchUserID = async () => {
      try {
        const storedUserID = await AsyncStorage.getItem("user");
        if (storedUserID !== null) {
          setUserID(storedUserID);
        } else {
          console.log("Nenhum usuário encontrado no AsyncStorage");
        }
      } catch (error) {
        console.error("Erro ao recuperar usuário:", error);
      }
    };
    fetchUserID();
  }, [eventID]);

  const fetchBuyList = async () => {
    try {
      const fetchedBuyList = await buyListService.getByEventID(eventID);
      setBuyList(fetchedBuyList);

      const initialCheckedItems = fetchedBuyList.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item.status === "buyed",
        }),
        {}
      );
      setCheckedItems(initialCheckedItems);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  const handleCheckboxChange = async (
    list: BuyListType,
    isChecked: boolean
  ) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setCheckedItems((prevState) => ({
      ...prevState,
      [list.id]: !isChecked,
    }));

    const updatedBuyList = new BuyLists({
      name: list.name,
      status: isChecked ? "pending" : "buyed",
      id_events: list.id_events,
      quantity: list.quantity,
      userID: userID,
      totalPrice: list.totalPrice,
    });

    try {
      await buyListService.update(updatedBuyList, list.id);
      setBuyList((prevList) =>
        prevList.map((item) =>
          item.id === list.id
            ? { ...item, status: updatedBuyList.status }
            : item
        )
      );
      if (updatedBuyList.status === "buyed") {
        setIndex(1);
      }
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };
  const capitalize = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const filteredList = buyList.filter((item) => {
    console.log("Status do item:", item.status);
    return index === 0 ? item.status === "pending" : item.status === "buyed";
  });
  return (
    <ScrollView>
      <SafeAreaView style={styles.areaRoxo}>
        <View style={styles.title}>
          <TextBuyList />
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "white",
              letterSpacing: 0.5,
              marginTop: 5,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Items {buyList.filter((item) => item.status === "buyed").length} /{" "}
            {buyList.length}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "white",
              letterSpacing: 0.5,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Total: R${" "}
            {buyList
              .filter((item) => item.status === "pending")
              .reduce(
                (sum, item) => sum + Number.parseFloat(item.totalPrice),
                0
              )
              .toFixed(2)}{" "}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "white",
              letterSpacing: 0.5,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Comprado: R${" "}
            {buyList
              .filter((item) => item.status === "buyed")
              .reduce(
                (sum, item) => sum + Number.parseFloat(item.totalPrice || 0),
                0
              )
              .toFixed(2)}{" "}
          </Text>
        </View>
        <View style={styles.areaBranca}>
          <Tab
            value={index}
            onChange={setIndex}
            scrollable
            style={{ padding: 10 }}
            containerStyle={{
              borderRadius: 10,
              marginLeft: 20,
            }}
            disableIndicator
          >
            <Tab.Item
              buttonStyle={{
                backgroundColor: index === 0 ? "black" : "#EAEAEA",
                borderRadius: 10,
                padding: 0,
                margin: 0,
              }}
              titleStyle={{
                color: index === 0 ? "white" : "black",
                fontWeight: "bold",
                fontFamily: "Poppins",
                textAlign: "center",
              }}
            >
              Pendentes
            </Tab.Item>
            <Tab.Item
              buttonStyle={{
                backgroundColor: index === 1 ? "black" : "#EAEAEA",
                borderRadius: 10,
                padding: 0,
                margin: 0,
              }}
              titleStyle={{
                color: index === 1 ? "white" : "black",
                fontWeight: "bold",
                fontFamily: "Poppins",
                textAlign: "center",
              }}
            >
              Comprados
            </Tab.Item>
          </Tab>
          {buyList
            .filter((list) => {
              console.log("Filtrando:", list.status);
              return index === 0
                ? list.status === "pending"
                : list.status === "buyed";
            })
            .map((list) => {
              const isChecked = checkedItems[list.id] || false;
              return (
                <View
                  style={{ marginLeft: 16, marginVertical: 8 }}
                  key={list.id}
                >
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <Checkbox
                      text={`${capitalize(list.name)} - ${list.quantity}`}
                      isChecked={isChecked}
                      onPress={() => handleCheckboxChange(list, isChecked)}
                      containerStyle={{ marginVertical: 10 }}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Poppins",
                        textAlign: "center",
                        fontSize: 15,
                        marginRight: 10,
                        color: "#808080",
                      }}
                    >
                      R${list.totalPrice}
                    </Text>
                  </View>
                </View>
              );
            })}
          <View style={styles.Botao}>
            <Text style={styles.TextBotao}>+</Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
