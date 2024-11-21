import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  LogBox,
} from "react-native";
import {
  BadgesFood,
  BadgesLocation,
  BadgesOuthers,
  BadgesServices,
} from "../components/Bagde";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Svg, Text as SvgText } from "react-native-svg";
import type { EventType } from "./(tabs)/calendarPage";
import Pie, { VictoryContainer, VictoryPie } from "victory-native";

LogBox.ignoreLogs([]);

export default function BudgetPage() {
  const [event, setEvent] = useState<EventType | null>(null);
  const [totalCosts, setTotalCost] = useState<number>(0);
  const [selectedData, setSelectedData] = useState<any>({});

  const getImageSource = (eventType: string) => {
    switch (eventType) {
      case "Casamento":
        return require("../../assets/Group 2.png");
      case "Aniversário":
        return require("../../assets/Group 3.png");
      case "Viagem":
        return require("../../assets/Group 4.png");
      case "Role / Festas":
        return require("../../assets/porra.jpg");
      default:
        return null;
    }
  };

  
  const eventData = {
    Casamento: {
      Alimentacao: 12000,
      Locacao: 10233,
      Servicos: 1500,
      Outros: 700,
    },
    "Role / Festas": {
      Alimentacao: 5000,
      Locacao: 1366.67,
      Servicos: 600,
      Outros: 250,
    },
    Aniversário: {
      Alimentacao: 3000,
      Locacao: 873.33,
      Servicos: 400,
      Outros: 130,
    },
    Viagem: {
      Alimentacao: 8000,
      Locacao: 1373,
      Servicos: 300,
      Outros: 80,
    },
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const storedEvent = await AsyncStorage.getItem("selectedEvent");
      if (!storedEvent) {
        console.error("Evento não encontrado");
        return;
      }
      const parsedEvent = JSON.parse(storedEvent);
      setEvent(parsedEvent);

      
      const eventType = parsedEvent?.type || "Casamento";
      setSelectedData(eventData[eventType] || {});
    };

    fetchEvent();

      const fetchTotalCost = async () => {
        const totalCost = await AsyncStorage.getItem("totalCost");
        setTotalCost(Number(totalCost));
      }
      fetchTotalCost()
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
    { x: "Alimentação", y: totalCosts || 0 },
    { x: "Locação", y: selectedData.Locacao || 0 },
    { x: "Serviços", y: selectedData.Servicos || 0 },
    { x: "Outros", y: selectedData.Outros || 0 },
  ];
  const pieWidth = 360;
  const pieHeight = 300;
  const totalCost =
    (totalCosts || 0) +
    (selectedData.Locacao || 0) +
    (selectedData.Servicos || 0) +
    (selectedData.Outros || 0);

  return (
    <ScrollView>
      <View>
        <View className="flex justify-end items-center">
          <Image
            className="w-[415] h-[302]"
            source={getImageSource(event?.type)}
          />
        </View>
        <View className=" bg-white w-full h-full rounded-[21px] bottom-4">
          <View>
            <Text
              style={{
                fontFamily: "Poppins",
                color: "black",
                fontWeight: "bold",
                marginTop: 15,
                fontSize: 24,
                textAlign: "center",
              }}
            >
              Orçamento Previsto
            </Text>
            <View className="flex items-center">
              <VictoryPie
                key={totalCost}
                colorScale={["#E40C0C", "#0004FF", "#350482", "#7B61FF"]}
                innerRadius={70}
                data={pieData}
                width={pieWidth}
                height={pieHeight}
                style={{
                  labels: {
                    fill: "#808080",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                  },
                }}
              />

              <Svg
                width={pieWidth}
                height={pieHeight}
                style={{ position: "absolute", top: 0, left: 0 }}
                viewBox={`0 0 ${pieWidth} ${pieHeight}`}
              >
                <SvgText
                  x="55%"
                  y="48%"
                  textAnchor="middle"
                  fontSize="17"
                  fontFamily="Poppins"
                  fontWeight="bold"
                  fill="black"
                >
                  Total:
                </SvgText>
                <SvgText
                  x="48%"
                  y="54%" 
                  textAnchor="middle"
                  fontSize="17"
                  fontFamily="Poppins"
                  fontWeight="bold"
                  fill="black"
                >
                 R$:   {totalCost.toFixed(0)}
                </SvgText>
              </Svg>
            </View>
          </View>
          <View className="flex flex-col gap-3 items-center ">
            <BadgesFood
              title="Alimentação e Bebidas"
              itemsCount={10}
              amount={totalCosts}
            />
            <BadgesLocation
              title="Locação"
              itemsCount={10}
              amount={selectedData.Locacao || 0}
            />
            <BadgesServices
              title="Serviços"
              itemsCount={10}
              amount={selectedData.Servicos || 0}
            />
            <BadgesOuthers
              title="Outros Gastos"
              itemsCount={10}
              amount={selectedData.Outros || 0}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
