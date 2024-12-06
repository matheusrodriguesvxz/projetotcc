import { SafeAreaView, View, Text, StyleSheet, ScrollView, TextInput, Button, Pressable } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BuyListServices } from "../service/BuyListServices";
import TextBuyList from "../components/BuyList";
import { CheckBox, Tab } from "@rneui/base";
import { BuyListRepository } from "../repository/BuyListRepository";
import Checkbox from "./checkbox";
import { BuyLists } from "../entity/BuyList";
import { LayoutAnimation, UIManager, Platform } from "react-native";
import Carousel from 'react-native-snap-carousel'; 
import { ResetInputs } from "../components/RegisterPage/RegisterPageComp";

export type BuyListType = {
  id: string;
  name: string;
  status: string;
  id_events: string;
  quantity: string;
  totalPrice: string;
  category: string;
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
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  
  const [customItem, setCustomItem] = useState<string>("");
  const [customPrice, setCustomPrice] = useState<string>("");
  const [customQuantity, setCustomQuantity] = useState<string>("");

  const categories = [
    'Doces',
    'Carnes',
    'Refrigerantes',
    'Descartaveis',
    'Outros'
  ]; 

  useEffect(() => {
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
      category: list.category,
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
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };

  
  const addCustomItem = () => {
    const newItem = {
      id: Math.random().toString(),
      name: customItem,
      status: "pending",
      id_events: eventID,
      quantity: customQuantity,
      totalPrice: customPrice,
      category: selectedCategory, 
    };

    setBuyList((prevList) => [...prevList, newItem]);

    
    setCustomItem("");
    setCustomPrice("");
    setCustomQuantity("");
  };

  const renderCarouselItem = ({ item }: any) => {
    
    const categoryItems = buyList.filter((list) => list.category === item);
    return (
      <View style={styles.carouselItem}>
        <Text style={styles.categoryTitle}>{item}</Text>
        {categoryItems.map((list) => (
          <View
            key={list.id}
            style={styles.itemCard}
          >
            <Text style={styles.itemText}>{list.name} - {list.quantity}</Text>
            <Text style={styles.itemPrice}>R${list.totalPrice}</Text>
            <Checkbox
              text="Comprar"
              isChecked={checkedItems[list.id] || false}
              onPress={() => handleCheckboxChange(list, checkedItems[list.id])}
            />
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <SafeAreaView style={styles.areaRoxo}>
        <View style={styles.title}>
          <TextBuyList />
          <Text style={styles.itemsCount}>
            Items {buyList.filter((item) => item.status === "buyed").length} / {buyList.length}
          </Text>
        </View>

        {/* Carrossel de Categorias */}
        <Carousel
          data={categories}
          renderItem={renderCarouselItem}
          sliderWidth={350}
          itemWidth={350}
          onSnapToItem={(index) => setSelectedCategory(categories[index])}
        />

        {/* Adicionar Item Personalizado */}
        <View style={styles.addCustomItemContainer}>
          <ResetInputs
            style={styles.input}
            placeholder="Nome do item"
            placeholderTextColor={"#760BFF"}

            value={customItem}
            onChangeText={setCustomItem}
          />
          <ResetInputs
            placeholder="Preço"
            keyboardType="numeric"
            placeholderTextColor={"#760BFF"}

            value={customPrice}
            onChangeText={setCustomPrice}
          />
          <ResetInputs   placeholder="Quantidade"
            keyboardType="numeric"
            placeholderTextColor={"#760BFF"}
            value={customQuantity}
            onChangeText={setCustomQuantity}/>
          
          <Pressable className="justify-center items-center" style={{
backgroundColor: "#760BFF", 
borderRadius: 10,
paddingVertical: 12, 
marginTop: 15,

          }}  onPress={addCustomItem}  >
            <Text style={{
              color:"white",
              fontFamily:"Poppins",
              fontWeight: 'bold'
            }}>Adicionar Produto</Text>
            </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,

  },
  areaRoxo: {
    backgroundColor: "#760BFF",
    height: "100%",
    paddingTop: 40,
  },
  title: {
    alignItems: "center",
    marginBottom: 20,
  },
  itemsCount: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "white",
    letterSpacing: 0.5,
    fontSize: 20,
    textAlign: "center",
  },
  carouselItem: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "white",
    marginLeft:20,
    fontFamily: "Poppins",

  },
  itemCard: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 10,
    marginLeft:20,

    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  itemText: {
    fontSize: 16,
    fontFamily: "Poppins",

    fontWeight: "bold",
  },
  itemPrice: {
    color: "#808080",
    fontSize: 14,
    fontFamily: "Poppins",

  },
  addCustomItemContainer: {
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 15, 
    marginHorizontal: 20,
    marginTop: 30,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 8, 
    elevation: 5, 
    overflow: 'hidden', 
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
});