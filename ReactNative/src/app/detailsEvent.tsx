import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  LogBox,
} from "react-native";
import MapView from "react-native-maps/lib/MapView";
import type { EventType } from "./(tabs)/calendarPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventsServices } from "../service/EventsServices";
import { EventsRepository } from "../repository/EventsRepository";
import { router } from "expo-router";


LogBox.ignoreLogs([]);

export default function DetailsEvent() {
  const [event, setEvent] = useState<EventType | null>(null);
  const eventResposity = new EventsRepository();
  const eventServices = new EventsServices(eventResposity);

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
      backgroundColor: "black",
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

  const onPressEvent = async (evento: EventType) => {
    try {
      await AsyncStorage.setItem("idEventBuyList", evento.id);
      console.log("Evento armazenado com sucesso:", evento.id);
      router.push("/buyList");
    } catch (error) {
      console.error("Erro ao armazenar o evento:", error);
    }
  };
  const onPressEvents = async (evento: EventType) => {
    try {
      await AsyncStorage.setItem("idEventBugdet", evento.id);
      console.log("Evento armazenado com sucesso:", evento.id);
      router.push("/bugdetPage");
    } catch (error) {
      console.error("Erro ao armazenar o evento:", error);
    }
  };

  const data = new Date(event.initial_date);

  const formatDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(data);

  const shortDate = new Intl.DateTimeFormat("pt-BR").format(data);
  
  return (
    <ScrollView>
      <View>
        <View className="flex justify-end items-center">
          <Image
            className="w-[395] h-[302]"
            source={require("../../assets/download (1) 1.png")}
          />
          <View className="absolute bottom-6 left-4 w-[200]">
            <Text style={style.nomeEvento}>{event.name}</Text>
            <View className="flex flex-row items-center gap-2">
              <Image
                className="w-[21] h=[21]"
                source={require("../../assets/date.png")}
              />
              <Text style={style.data}>{`${formatDate}`}</Text>
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
          <View className="flex flex-col justify-center items-center mt-10 gap-4">
            <View>
              <TouchableOpacity
                onPress={() => onPressEvents(event)}
                style={style.VisualizarConvidados}
              >
                <Text style={style.textoConvidado}>Visualizar Convidados</Text>
              </TouchableOpacity>
            </View>
            <View></View>
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
