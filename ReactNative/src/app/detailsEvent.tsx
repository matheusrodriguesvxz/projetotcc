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

export default function DetailsEvent() {
  const [event, setEvent] = useState<EventType | null>(null);
  const eventResposity = new EventsRepository();
  const eventServices = new EventsServices(eventResposity);
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

  useEffect(() => {
    const fetchEvent = async () => {
      const storedEvent = await AsyncStorage.getItem("selectedEvent");
      if (!storedEvent) {
        console.error("Evento não encontrado");
        return;
      }
      setEvent(JSON.parse(storedEvent));
    };
    fetchEvent();
  }, []);

  if (!event) {
    return;
  }
  const style = StyleSheet.create({
    nomeEvento: {
      fontFamily: "Poppins",
      color:
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        // biome-ignore lint/correctness/noConstantCondition: <explanation>
        event!.type === "Casamento" || "Viagem" || "Role / Festas"
          ? "white"
          : "black",
      fontWeight: "bold",
      fontSize: 18,
      width: 300,
      letterSpacing: 1,
    },
    data: {
      fontFamily: "Poppins",
      color:
        // biome-ignore lint/correctness/noConstantCondition: <explanation>
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        event!.type === "Casamento" || "Viagem" || "Role / Festas"
          ? "white"
          : "black",
      fontWeight: "bold",
      width: 300,
      letterSpacing: 1,
    },

    descricaoEvento: {
      fontFamily: "Poppins",
      color: "black",
      fontWeight: "bold",
      width: 300,
      letterSpacing: 1,
      fontSize: 24,
      marginLeft: 20,
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
  });

  return (
    <ScrollView>
      <View>
        <View className="flex justify-end items-center">
          <Image
            className="w-[395] h-[302]"
            source={getImageSource(event.type)}
          />
          <View className="absolute bottom-6 left-4 w-[200]">
            <Text style={style.nomeEvento}>{event.name}</Text>
            <View className="flex flex-row items-center gap-2">
              <Image
                className="w-[21] h=[21]"
                source={require("../../assets/date.png")}
              />
              <Text style={style.data}>{event.initial_date}</Text>
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
        <View className=" bg-white w-full h-full rounded-3xl bottom-4">
          <View className="flex flex-col">
            <Text style={style.descricaoEvento}>Descrição do evento</Text>
            <Text style={style.descricao}>{event.description}</Text>
          </View>

          <View className="flex flex-col ">
            <View>
              <Text style={style.localizacao}>Localização</Text>
              <Text style={style.local}>
                {`${event.street}, ${event.number} - ${event.city}, ${event.state}`}
              </Text>
              <View className="flex justify-center items-center">
                <MapView
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  toolbarEnabled={true}
                  style={style.mapa}
                  initialRegion={{
                    latitude: -23.6748946,
                    longitude: -46.6057103,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
              </View>
            </View>
          </View>
          <View className="flex flex-col justify-center items-center mt-10 gap-8">
            <View>
              <TouchableOpacity style={style.VisualizarConvidados}>
                <Text style={style.textoConvidado}>Visualizar Convidados</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  console.log("Tentando deletar o evento com ID:", event.id);
                  try {
                    eventServices.delete(event.id);
                    router.push("/calendarPage");
                  } catch (error) {
                    console.error("Erro ao deletar o evento:", error);
                    alert("Erro ao cancelar evento");
                  }
                }}
                style={style.cancelarEvento}
              >
                <Text style={style.textoCancelar}>Cancelar Evento</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
