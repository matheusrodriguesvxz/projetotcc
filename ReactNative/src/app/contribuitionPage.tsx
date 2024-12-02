import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  LogBox,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from "react-native";
import EditButton, { Correct, Failed } from "../components/Svgs";
import * as Progress from "react-native-progress";
import { BarraDePesquisaContribuintes } from "../components/HomePage";
import axios from "axios";
import Modal from "react-native-modal";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

LogBox.ignoreLogs([]);

export default function ContribuitionPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [pixModalVisible, setPixModalVisible] = useState<boolean>(false);
  const [pixData, setPixData] = useState<{
    qrCode: string;
    qrCodeBase64: string;
  } | null>(null);
  const [totalCosts, setTotalCost] = useState<number>(0);
  const [refresh, setRefresh] = useState(0);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [selectedData, setSelectedData] = useState<any>({});

  const refreshPage = useCallback(() => {
    setRefresh((prev) => prev + 1);
  }, []);

  useEffect(() => {
    console.log("Página atualizada!", refresh);
  }, [refresh]);

  useEffect(() => {
    const fetchTotalCost = async () => {
      const totalCost = await AsyncStorage.getItem("totalCost");
      setTotalCost(Number(totalCost));
    };
    fetchTotalCost();
  }, []);

  const style = StyleSheet.create({
    nomeEvento: {
      fontFamily: "Poppins",
      color: "white",
      fontWeight: "bold",
      fontSize: 18,
      width: 300,
      letterSpacing: 1,
    },
  });

  const pieData = [
    { y: totalCosts || 0 },
    { y: selectedData.Locacao || 915 },
    { y: selectedData.Servicos || 750 },
    { y: selectedData.Outros || 335 },
  ];
  const totalCost =
    (totalCosts || 0) +
    (selectedData.Locacao || 915) +
    (selectedData.Servicos || 750) +
    (selectedData.Outros || 335);

  const [qrCodeValue, setQrCodeValue] = useState("");
  const generateRandomQRCode = () => {
    const randomString = Math.random().toString(36).substring(7);
    setQrCodeValue(randomString);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    generateRandomQRCode();
  }, []);

  const handleCreatePaymentPreference = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://192.168.0.4:3333/payment/preference",
        {
          title: "Vaquinha Event Easy",
          quantity: 1,
          unit_price: 100,
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

  const handleCreatePixPayment = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://192.168.0.4:3333/payment/pix", {
        transaction_amount: 120,
        description: "Pagamento via PIX",
        payment_method_id: "pix",
        payer: "Joao Diamon",
        email: "gamerjv947@gmail.com",
        type: "CPF",
        number: "54056457883",
      });

      const { qr_code, qr_code_base64 } = response.data;
      console.log("QR Code Base64:", qr_code_base64);
      setPixData({ qrCode: qr_code, qrCodeBase64: qr_code_base64 });
      setPixModalVisible(true);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao criar pagamento PIX:", error);
      alert("Erro Não foi possível criar o pagamento via PIX.");
      setLoading(false);
    }
  };
  return (
    <View className="flex justify-start items-center ">
      <Image
        style={{
          width: 395,
          height: 290,
        }}
        source={require("../../assets/Purple Wallpaper2.png")}
      />
      <View className=" bg-white w-full h-full rounded-[21px] bottom-52">
        <View>
          <Text
            style={{
              color: "#7E7E7E",
              fontSize: 24,
              fontFamily: "Poppins",
              fontWeight: "bold",
              marginTop: 20,
              marginLeft: 40,
              marginRight: 20,
            }}
          >
            Contribuintes
          </Text>
        </View>

        <View>
          <Text
            style={{
              color: "#000000",
              fontSize: 24,
              fontFamily: "Poppins",
              marginTop: 20,
              marginLeft: 40,
            }}
          >
            Meta
          </Text>
          <View className="flex flex-row justify-between ">
            <Text
              style={{
                color: "#000000",
                fontSize: 24,
                fontFamily: "Poppins",
                fontWeight: "bold",
                marginLeft: 40,
                marginRight: 20,
              }}
            >
              R$ {totalCost}
            </Text>
            <View className="mr-4">
              <EditButton />
            </View>
          </View>
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
                  {qrCodeValue ? (
                    <QRCode value={qrCodeValue} size={200} /> 
                  ) : (
                    <Text>Aguardando...</Text>
                  )}
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
          <Progress.Bar
            progress={0.2}
            width={329}
            height={12}
            color="#760BFF"
            style={{
              marginLeft: 40,
              marginTop: 10,
              backgroundColor: "#D9D9D9",
              borderColor: "#D9D9D9",
              borderRadius: 0,
            }}
          />
          <View className="flex justify-center items-center mt-4">
            <BarraDePesquisaContribuintes />
          </View>

          <View className="flex justify-center items-center">
            <View
              style={{
                width: 345,
                height: 81,
                backgroundColor: "#340077",
                marginTop: 20,
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View className="justify-center">
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 24,
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    marginLeft: 20,
                    marginTop: 10,
                  }}
                >
                  Shingi Kagawa
                </Text>
                <View className="flex flex-row justify-between">
                  <Text
                    style={{
                      color: "#989898",
                      fontSize: 14,
                      marginLeft: 20,

                      fontFamily: "Poppins",
                    }}
                  >
                    Valor: 50,00
                  </Text>
                  <View className="mr-4">
                    <Correct />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                width: 345,
                height: 81,
                backgroundColor: "#340077",
                marginTop: 20,
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View className="justify-center">
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 24,
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    marginLeft: 20,
                    marginTop: 10,
                  }}
                >
                  Joselito Vaca
                </Text>
                <View className="flex flex-row justify-between">
                  <Text
                    style={{
                      color: "#989898",
                      fontSize: 14,
                      marginLeft: 20,

                      fontFamily: "Poppins",
                    }}
                  >
                    Valor: 400,00
                  </Text>
                  <View className="mr-4">
                    <Correct />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                width: 345,
                height: 81,
                backgroundColor: "#340077",
                marginTop: 20,
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <View className="justify-center">
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 24,
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    marginLeft: 20,
                    marginTop: 10,
                  }}
                >
                  Van der Saia
                </Text>
                <View className="flex flex-row justify-between">
                  <Text
                    style={{
                      color: "#989898",
                      fontSize: 14,
                      marginLeft: 20,

                      fontFamily: "Poppins",
                    }}
                  >
                    Valor: 50,00
                  </Text>
                  <View className="mr-4">
                    <Failed />
                  </View>
                </View>
              </View>
            </View>

            <View>
              <TouchableOpacity
                onPress={handleCreatePaymentPreference}
                style={{
                  backgroundColor: "#000000",
                  width: 334,
                  height: 55,
                  marginTop: 20,
                  borderRadius: 25,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 3.84,
                  elevation: 5,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 20,
                    textAlign: "center",
                    fontFamily: "Poppins",
                  }}
                >
                  Cartão de Crédito/Débito
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#760BFF",
                  width: 334,
                  height: 55,
                  marginTop: 10,
                  borderRadius: 25,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 3.84,
                  elevation: 5,
                  justifyContent: "center",
                }}
                onPress={() => handleCreatePixPayment()}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 20,
                    textAlign: "center",
                    fontFamily: "Poppins",
                  }}
                >
                  Gerar código Pix
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

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
    width: 250,
    height: 250,
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
