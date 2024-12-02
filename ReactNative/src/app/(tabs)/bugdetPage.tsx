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
} from "react-native";
import type { EventType } from "./calendarPage";
import { VictoryPie } from "victory-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

LogBox.ignoreLogs([]);

export default function BudgetPage() {
  const [totalCosts, setTotalCost] = useState<number>(0);
  const [event, setEvent] = useState<EventType | null>(null);
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
    const fetchEvent = async () => {
      const storedEvent = await AsyncStorage.getItem("selectedEvent");
      if (!storedEvent) {
        console.error("Evento não encontrado");
        return;
      }
      const parsedEvent = JSON.parse(storedEvent);
      setEvent(parsedEvent);
    };

    fetchEvent();

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
  const pieWidth = 250;
  const pieHeight = 250;
  return (
    <View>
      <View className="flex justify-start items-center">
        <Image
          style={{
            width: 395,
            height: 290,
          }}
          source={require("../../../assets/Purple Wallpaper2.png")}
        />
        <View className=" bg-white w-full h-full rounded-[21px] bottom-52">
          <View className="justify-center ">
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                fontSize: 24,
                color: "#7E7E7E",
                marginLeft: 30,
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              Orçamento Previsto
            </Text>
          </View>
          <View className="flex justify-center items-center">
            <View className="flex flex-row justify-center">
              <View
                className=" flex justify-center items-center"
                style={{
                  width: 175,
                  height: 195,
                  zIndex: 9,
                  backgroundColor: "#46009F",
                  borderRadius: 25,
                  left: 20,
                  position: "relative",
                }}
              >
                <View className="flex justify-center items-center">
                  <VictoryPie
                    key={totalCost}
                    colorScale={["#4D3FD1", "#24D3BD", "#35E5CC", "#3F2ABC"]}
                    data={pieData}
                    width={pieWidth}
                    height={pieHeight}
                    style={{
                      labels: {
                        display: "none",
                        fill: "#808080",
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                      },
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  width: 210,
                  height: 154,
                  position: "relative",
                  zIndex: 8,
                  right: 25,
                  backgroundColor: "#46009F",
                  borderRadius: 25,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 1,
                  elevation: 5,
                }}
              >
                <View className="flex flex-col">
                  <Text
                    className="z-10"
                    style={{
                      ...style.nomeEvento,
                      position: "absolute",
                      fontSize: 14,
                      fontWeight: "light",
                      top: 20,
                      left: 60,
                    }}
                  >
                    Meta
                  </Text>
                  <Text
                    className="z-10"
                    style={{
                      ...style.nomeEvento,
                      position: "absolute",
                      top: 40,

                      left: 60,
                    }}
                  >
                    R$ {totalCost}
                  </Text>
                </View>

                <View className="flex flex-col ">
                  <Text
                    className="z-10"
                    style={{
                      ...style.nomeEvento,
                      position: "absolute",
                      fontSize: 14,
                      color: "#909090",
                      top: 80,
                      fontWeight: "light",
                      left: 60,
                    }}
                  >
                    Total arrecadado
                  </Text>
                  <Text
                    className="z-10"
                    style={{
                      ...style.nomeEvento,
                      position: "absolute",

                      top: 100,
                      color: "#8F8F8F",
                      left: 60,
                    }}
                  >
                    R$ 4.721,00
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/contribuitionPage")}
            className="py-6"
            style={{
              width: 150,
              position: "relative",
              left: 200,
              bottom: 36,
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
              backgroundColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Poppins",
                fontWeight: "bold",
              }}
            >
              Contribuintes
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row gap-4 ml-4">
            <View className="flex-row justify-center items-center gap-3">
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
              <View
                className="flex flex-row"
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: "#4D3FD1",
                }}
              ></View>
              <Text
                style={{
                  color: "black",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                }}
              >
                Serviços
              </Text>
            </View>
            <View className="flex-row justify-center items-center gap-3">
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
              <View
                className="flex flex-row "
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: "#24D3BD",
                }}
              ></View>
              <Text
                style={{
                  color: "black",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                }}
              >
                Locaçao
              </Text>
            </View>
            <View className="flex-row justify-center items-center gap-3">
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
              <View
                className="flex flex-row "
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: "#35E5CC",
                }}
              ></View>
              <Text
                style={{
                  color: "black",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                }}
              >
                Outros
              </Text>
            </View>
            <View className="flex-row justify-center items-center gap-3">
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
              <View
                className="flex flex-row "
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: "#3F2ABC",
                }}
              ></View>
              <Text
                style={{
                  color: "black",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                }}
              >
                Alimentação
              </Text>
            </View>
          </View>

          <View className="flex flex-col mt-4">
            <View className="flex flex-row items-center justify-between">
              <Image
                style={{
                  marginLeft: 20,
                }}
                source={require("../../../assets/alimentacao.png")}
              />
              <View className="flex flex-col">
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Poppins",
                    fontWeight: "regular",
                    fontSize: 18,
                    marginLeft: 10,
                  }}
                >
                  Alimentaçao e Bebidas
                </Text>
                <Text
                  style={{
                    color: "#909090",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    fontSize: 14,
                    marginLeft: 10,
                  }}
                >
                  20 items
                </Text>
              </View>
              <Text
                style={{
                  color: "#909090",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginLeft: 10,
                  marginRight: 20,
                }}
              >
                R${totalCosts.toFixed(0) || 4721}
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between mt-8">
              <Image
                style={{
                  marginLeft: 20,
                }}
                source={require("../../../assets/chaves.png")}
              />
              <View className="flex flex-col">
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Poppins",
                    fontWeight: "regular",
                    fontSize: 18,
                    marginLeft: 10,
                    marginRight: 120,
                  }}
                >
                  Locaçao
                </Text>
                <Text
                  style={{
                    color: "#909090",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    fontSize: 14,
                    marginLeft: 10,
                  }}
                >
                  2 items
                </Text>
              </View>
              <Text
                style={{
                  color: "#909090",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                R${selectedData.Locacao || 915}
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between mt-8">
              <Image
                style={{
                  marginLeft: 20,
                }}
                source={require("../../../assets/mao.png")}
              />
              <View className="flex flex-col">
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Poppins",
                    fontWeight: "regular",
                    fontSize: 18,
                    marginLeft: 10,
                    marginRight: 120,
                  }}
                >
                  Serviços
                </Text>
                <Text
                  style={{
                    color: "#909090",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    fontSize: 14,
                    marginLeft: 10,
                  }}
                >
                  3 items
                </Text>
              </View>
              <Text
                style={{
                  color: "#909090",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                R${selectedData.Servicos || 750}
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between mt-8">
              <Image
                style={{
                  marginLeft: 20,
                }}
                source={require("../../../assets/custos.png")}
              />
              <View className="flex flex-col">
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Poppins",
                    fontWeight: "regular",
                    fontSize: 18,
                    marginLeft: 5,
                    marginRight: 70,
                  }}
                >
                  Outros Custos
                </Text>
                <Text
                  style={{
                    color: "#909090",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    fontSize: 14,
                    marginLeft: 5,
                  }}
                >
                  3 items
                </Text>
              </View>
              <Text
                style={{
                  color: "#909090",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginLeft: 10,
                  marginRight: 20,
                }}
              >
                R${selectedData.Outros || 335}
              </Text>
            </View>

            <View className="flex justify-center items-center">
              <TouchableOpacity
                onPress={refreshPage}
                className="w-[334] h-[55]"
                style={{
                  backgroundColor: "#760BFF",
                  borderRadius: 25,
                  marginTop: 20,
                  width: 300,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontFamily: "Poppins",
                    fontWeight: "regular",
                    fontSize: 16,
                  }}
                >
                  Recalcular Orçamento
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
