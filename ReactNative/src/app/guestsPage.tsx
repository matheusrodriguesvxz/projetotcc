import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import MapView from "react-native-maps/lib/MapView";
import type { EventType } from "./(tabs)/calendarPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventsServices } from "../service/EventsServices";
import { EventsRepository } from "../repository/EventsRepository";
import { router } from "expo-router";
import { color } from "@rneui/base";
import { EventAndGuestsRepository } from "../repository/EventsAndGuestsRepository";
import { EventAndGuestsServices } from "../service/eventsAndGuestsServices";
import { CompanionRepository } from "../repository/CompanionRepository";
import { CompanionServices } from "../service/CompanionsServices";

type GuestType = {
  id: string;
  name: string;
  description: string;
  pix: string;
  type: string;
  initial_date: string;
  final_date: string;
  budget: string;
  olderOfAge: boolean;
  cep: string;
  street: string;
  number: number;
  city: string;
  state: string;
  complement: string;
  neighborhood: string;
  country: string;
  nameGuest: string;
  age: number;
  contact: string;
  sexy: string;
  id_guests: string;
  companionsCount?: number;
};
export default function GuestsPage() {
  const [guests, setGuests] = useState<GuestType[]>([]);
  const [idEvent, setIdEvent] = useState<string>("v2q2yosrjo7ielyktwgqwbvr");
  const [event, setEvent] = useState<EventType | null>(null);
  const eventsAndGuestsRepository = new EventAndGuestsRepository();
  const eventsAndGuestsServices = new EventAndGuestsServices(
    eventsAndGuestsRepository
  );
  const companionsRepository = new CompanionRepository();
  const companionsServices = new CompanionServices(companionsRepository);


  useEffect(() => {
    const fetchIdAndGuests = async () => {
      try {
        const storedIdEvent = await AsyncStorage.getItem("idEventBuyList");
        if (!storedIdEvent) {
          console.error("Evento não encontrado");
          return;
        }
        setIdEvent(storedIdEvent);
        console.log("Id do evento", storedIdEvent);

        const guestsData = await eventsAndGuestsServices.getById(storedIdEvent);

        const guestsWithCompanions = await Promise.all(
          guestsData.map(async (guest) => {
            const companionsCount = await companionsServices.getCountByGuest(
              guest.id_guests
            );
            return { ...guest, companionsCount };
          })
        );

        setGuests(guestsWithCompanions);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchIdAndGuests();
  }, []);

  const onPressGuests = async (guests: GuestType) => {
    try {
      if (!guests) {
        console.error("guests não encontrado");
        return;
      }
      await AsyncStorage.setItem("selectedGuests", JSON.stringify(guests));
      router.push("/detailsGuests");
    } catch (error) {
      console.error("Erro ao armazenar o evento:", error);
    }
  };

  const style = StyleSheet.create({
    nomeEvento: {
      fontFamily: "Poppins",
      color: "white",
      fontWeight: "bold",
      fontSize: 18,
      width: 300,
      letterSpacing: 1,
    },
    data: {
      fontFamily: "Poppins",
      color: "white",
      fontWeight: "bold",
      width: 300,
      letterSpacing: 1,
    },

    convidadosConfirmados: {
      fontFamily: "Poppins",
      color: "#760BFF",
      fontWeight: "bold",
      width: 300,
      letterSpacing: 1,
      fontSize: 22,
      textAlign: "center",
      marginLeft: 55,
      marginTop: 20,
    },

    descricao: {
      fontFamily: "Poppins",
      fontWeight: "bold",
      color: "#909090",
      width: 350,
      fontSize: 14,
      marginLeft: 20,
      marginTop: 10,
    },

    localizacao: {
      fontFamily: "Poppins",
      color: "black",
      fontWeight: "bold",
      width: 300,
      letterSpacing: 1,
      fontSize: 24,
      marginLeft: 20,
      marginTop: 20,
    },

    local: {
      fontFamily: "Poppins",
      fontWeight: "bold",
      color: "#909090",
      width: 350,
      fontSize: 16,
      marginLeft: 20,
    },

    mapa: {
      height: 166,
      width: 349,
      borderRadius: 10,
    },

    VisualizarConvidados: {
      width: 343,
      height: 56,
      paddingVertical: 12,
      backgroundColor: "#760BFF",
      paddingHorizontal: 3,
      borderRadius: 20,
      justifyContent: "center",
    },

    textoConvidado: {
      textAlign: "center",
      fontFamily: "Poppins",
      fontWeight: "bold",
      color: "white",
      fontSize: 16,
    },

    cancelarEvento: {
      width: 343,
      height: 56,
      paddingVertical: 12,
      backgroundColor: "#FF0B0B",
      paddingHorizontal: 3,
      borderRadius: 20,
      justifyContent: "center",
    },

    textoCancelar: {
      textAlign: "center",
      fontFamily: "Poppins",
      fontWeight: "bold",
      color: "white",
      fontSize: 16,
    },

    nomeConvidado: {
      color: "black",
      fontWeight: "bold",
      fontFamily: "Poppins",
      marginLeft: 15,
      paddingVertical: 10,
      fontSize: 18,
      textAlign: "center",
    },

    subConvidado: {
      color: "#818181",
      fontWeight: "bold",
      fontFamily: "Poppins",
      fontSize: 14,
      marginTop: 15,
      marginLeft: 8,
    },
  });

  return (
    <ScrollView>
      <View>
        <View className="flex justify-end items-center">
          <Image
            className="w-[415] h-[302]"
            source={require("../../assets/download (1) 1.png")}
          />
          <View className="absolute bottom-6 left-4 w-[200]">
            <Text style={style.nomeEvento}>Casamento</Text>
            <View className="flex flex-row items-center gap-2">
              <Image
                className="w-[21] h=[21]"
                source={require("../../assets/date.png")}
              />
              <Text style={style.data}>14 de Dezembro</Text>
            </View>
            <View className="flex flex-row items-center mt-1 gap-2">
              <Image
                className="w-[21] h=[21]"
                source={require("../../assets/hours.png")}
              />
              <Text style={style.data}>21h as 23h</Text>
            </View>
          </View>
        </View>
        <View className=" bg-white w-full h-full rounded-[21px] bottom-4">
          <Text style={style.convidadosConfirmados}>
            Convidados Confirmados
          </Text>
        {guests.map((guest, index) => {
            return (
              <View 
              key={index}
              className="bg-gray-200 mt-10 h-[36px] ml-4 mr-4 rounded-[20px] flex flex-row items-center w-[336] gap-24">
                <View className="flex flex-row justify-center items-center">
                  <Text style={style.nomeConvidado}>{guest.nameGuest}</Text>
                </View>
                <View className=" flex flex-row justify-center items-center gap-3">
                  <View className="flex flex-row justify-center items-center">
    
                  <Text style={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "#909090",
                    fontSize: 18,
                  }}>+{guest.companionsCount}</Text>
                  <Image style={{
                    width: 16,
                    height: 20,
                  }} source={require("../../assets/guerss.png")} />
                  </View>
                  <Image source={require("../../assets/trash.png")} />
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
