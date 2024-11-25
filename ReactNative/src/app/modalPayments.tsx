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

  const handleCreatePixPayment = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://192.168.0.4:3333/payment/pix", {
        transaction_amount: value,
        description: "Pagamento via PIX",
        payment_method_id: "pix",
        payer: "Joao Diamon",
        email: "gamerjv947@gmail.com",
        type: "CPF",
        number: "54056457883",
      });

      const { qr_code, qr_code_base64 } = response.data;
      setPixData({ qrCode: qr_code, qrCodeBase64: qr_code_base64 });
      setPixModalVisible(true);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao criar pagamento PIX:", error);
      Alert.alert("Erro", "Não foi possível criar o pagamento via PIX.");
      setLoading(false);
    }
  };

  const handleCreatePaymentPreference = async () => {
    if (!selectedPayment) {
      Alert.alert("Erro", "Selecione uma forma de pagamento.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://192.168.0.4:3333/payment/preference",
        {
          title: "Vaquinha Event Easy",
          quantity: 1,
          unit_price: value,
          currency_id: "BRL",
          first_name: "Joao",
          last_name: "Diamon",
        }
      );

      const { url } = response.data;

      if (url) {
        Linking.openURL(url);
      } else {
        Alert.alert("Erro", "Não foi possível gerar a URL de pagamento.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Erro ao criar preferência de pagamento:", error);
      Alert.alert("Erro", "Não foi possível criar a preferência de pagamento.");
      setLoading(false);
    }
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

      <Modal
        isVisible={pixModalVisible}
        onBackdropPress={() => setPixModalVisible(false)}
        onBackButtonPress={() => setPixModalVisible(false)}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropOpacity={0.4}
      >
        <View style={styles.pixModalContent}>
          <Text style={styles.pixModalTitle}>Pagamento via PIX</Text>
          {pixData && (
            <View style={styles.pixContent}>
              <Image
                source={{
                  uri: pixData.qrCodeBase64
                    ? `data:image/png;base64,${pixData.qrCodeBase64}`
                    : pixData.qrCode,
                }}
                style={styles.qrCode}
              />
              <Text style={styles.pixCode}>{pixData.qrCode}</Text>
              <Text style={styles.pixInstruction}>
                Use o código acima para copiar e colar no seu app bancário.
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.advanceButton}
            onPress={() => setPixModalVisible(false)}
          >
            <Text style={styles.advanceButtonText}>Fechar</Text>
          </TouchableOpacity>
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
