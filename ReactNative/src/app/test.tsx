import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import InputMoney from "./InputMoney";
import { Button } from "@rneui/base";
import PaymentOptions from "./modalPayments";
import Carousel from "react-native-snap-carousel";


const MoneyScreen = () => {
  const [value, setValue] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleModalErro = () => {
    setIsModalVisible(!isModalVisible);
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const { width: screenWidth } = Dimensions.get("window");

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
      <Text style={styles.address}>{item.address}</Text>
      <Text style={styles.countdown}>{item.countdown}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>➤</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Carousel
          data={data}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * 0.7}
          onSnapToItem={(index) => setActiveIndex(index)}
          inactiveSlideOpacity={0.5}
          inactiveSlideScale={0.9}
          autoplay={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default MoneyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#4A00A9",
    borderRadius: 16,
    padding: 20,
    justifyContent: "space-between",
    height: 237,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Poppins",
  },
  subtitle: {
    fontSize: 22,
    fontFamily: "Poppins",
    color: "#fff",
  },
  address: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Poppins",
  },
  countdown: {
    fontSize: 14,
    color: "#fff",
    marginTop: 10,
    fontFamily: 'Poppins',

  },
  button: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  buttonText: {
    fontSize: 18,
    color: "#4A0072",
    fontWeight: "bold",
  },
});
