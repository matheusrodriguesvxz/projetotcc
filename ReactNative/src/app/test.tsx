import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputMoney from "./InputMoney";
import { Button } from "@rneui/base";
import PaymentOptions from "./modalPayments";

const MoneyScreen = () => {
  const [value, setValue] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleModalErro = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => setIsModalVisible(true)}>Clique aqui</Button>
      :
      <PaymentOptions  isVisible={isModalVisible} toggleModal={toggleModal}/>
      <Text style={styles.title}>Digite um valor:</Text>
      <InputMoney
        value={value}
        onChange={(newValue: number) => setValue(newValue)}
        placeholder="0,00"
        addonBefore="R$"
        editable
        className="mt-8 border-1 border-b-4  py-2 w-[315]  ml-6 border-purple-800"
        placeholderTextColor="#909090"
        style={{
          fontFamily: "Poppins",
          fontWeight: "bold",
          color: "#000000",
          letterSpacing: 0.5,
          marginTop: 25,
          fontSize: 16,
          borderColor: "#760BFF",
        }}
      />
      <Text style={styles.result}>
        Valor Atual: R$ {value.toFixed(2).replace(".", ",")}
      </Text>
    </View>
  );
};

export default MoneyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: "bold",
    color: "#333",
  },
  result: {
    marginTop: 24,
    fontSize: 18,
    color: "#555",
  },
});
