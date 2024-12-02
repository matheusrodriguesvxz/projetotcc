import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Linking,
} from "react-native";
import Modal from "react-native-modal";
import InputMoney from "./InputMoney";
import axios from "axios"; // Para fazer a requisição à API

const PaymentOptions = ({ isVisible, toggleModal }) => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [value, setValue] = useState<number>(0);
  const [pixData, setPixData] = useState<{
    qrCode: string;
    qrCodeBase64: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pixModalVisible, setPixModalVisible] = useState<boolean>(false);

  const handleSelectPayment = (method: string) => {
    setSelectedPayment(method);
  };



  

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropOpacity={0.4}
      >
        <View style={styles.modalContent}>
          <Text style={styles.title}>Insira o valor desejado!</Text>
          <InputMoney
            value={value}
            onChange={(newValue: number) => setValue(newValue)}
            placeholder="0,00"
            addonBefore="R$"
            className="mt-8 border-1 border-b-4  py-2 w-[315]  ml-6 border-[#760BFF]"
            editable
            style={styles.inputMoney}
          />
          <Text style={styles.paymentText}>Forma de Pagamento</Text>
          <View style={styles.paymentOptions}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPayment === "Pix" && styles.selectedOption,
              ]}
              onPress={() => handleSelectPayment("Pix")}
            >
              <View style={styles.optionContent}>
                <Image
                  style={styles.paymentIcon}
                  source={require("../../assets/pix.png")}
                />
                <Text style={styles.optionText}>Pix</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPayment === "Boleto" && styles.selectedOption,
              ]}
              onPress={() => handleSelectPayment("Boleto")}
            >
              <View style={styles.optionContent}>
                <Image
                  style={styles.paymentIcon}
                  source={require("../../assets/boleto-logo.png")}
                />
                <Text style={styles.optionText}>Boleto</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPayment === "Cartão" && styles.selectedOption,
              ]}
              onPress={() => handleSelectPayment("Cartão")}
            >
              <View style={styles.optionContent}>
                <Image
                  style={styles.paymentIcon}
                  source={require("../../assets/cartao.png")}
                />
                <Text style={styles.optionText}>Cartão</Text>
              </View>
            </TouchableOpacity>

            <View className="flex justify-center items-center">
              <TouchableOpacity
                style={styles.advanceButton}
                onPress={() => {
                  if (selectedPayment === "Pix") {
                    handleCreatePixPayment();
                  } else {
                    handleCreatePaymentPreference();
                  }
                }}
                disabled={loading}
              >
                <Text style={styles.advanceButtonText}>
                  {loading ? "Carregando..." : "Avançar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    width: 360,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#760BFF",
  },
  inputMoney: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#760BFF",
    marginTop: 25,
    fontSize: 16,
    borderColor: "#760BFF",
  },
  paymentText: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#909090",
    marginTop: 25,
    fontSize: 16,
  },
  paymentOptions: {
    marginTop: 20,
  },
  paymentOption: {
    marginTop: 20,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedOption: {
    borderColor: "#760BFF",
    borderWidth: 2,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  advanceButton: {
    backgroundColor: "black",
    marginTop: 40,
    width: 220,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
  advanceButtonText: {
    color: "white",
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  pixModalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    width: 360,
  },
  pixModalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#760BFF",
  },
  pixContent: {
    alignItems: "center",
    marginTop: 20,
  },
  qrCode: {
    width: 200,
    height: 200,
  },
  pixCode: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  pixInstruction: {
    marginTop: 10,
    fontSize: 14,
    color: "#909090",
    textAlign: "center",
  },
});

export default PaymentOptions;
