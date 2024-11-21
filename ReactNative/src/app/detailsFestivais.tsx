import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  LogBox,
  Linking,
} from "react-native";
import MapView from "react-native-maps/lib/MapView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import type { EventsFestivais, EventsSearchResult } from "./(tabs)"; 

LogBox.ignoreLogs([]); 

export default function FestivalDetails() {
  const [event, setEvent] = useState<EventsFestivais | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const storedEvent = await AsyncStorage.getItem("selectedFestivais");
      if (!storedEvent) {
        console.error("Festival não encontrado");
        return;
      }
      setEvent(JSON.parse(storedEvent));
    };
    fetchEvent();
  }, []);

  if (!event) {
    return null;
  }

  console.log(event.ticket_info[0].link); 
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
          <Image className="w-[395] h-[302]" source={{ uri: event.image }} />
          <View className="absolute bottom-6 left-4 w-[200]">
            <Text style={style.nomeEvento}>{event.title}</Text>
            <View className="flex flex-row items-center gap-2">
              <Image
                className="w-[21] h=[21]"
                source={require("../../assets/date.png")}
              />
              <Text style={style.data}>{`${event.date.start_date}`}</Text>
            </View>
            <View className="flex flex-row items-center mt-1 gap-2">
              <Image
                className="w-[21] h=[21]"
                source={require("../../assets/hours.png")}
              />
              <Text style={style.data}>{event.date.when}</Text>
            </View>
          </View>
        </View>
        <View className="bg-white w-full h-full rounded-3xl bottom-4">
          <View className="flex flex-col">
            <Text style={style.descricaoEvento}>Descrição do Festival</Text>
            <Text style={style.descricao}>{event.description}</Text>
          </View>

          <View className="flex flex-col">
            <Text style={style.localizacao}>Localização</Text>
            <Text style={style.local}>
              {event.address.join(",  ")} {/* Exibe o endereço completo */}
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
          <View className="flex flex-col justify-center items-center mt-10 gap-8">
            <View>
              <TouchableOpacity
                onPress={() => {
                  const url = event.ticket_info[0].link; 
                  Linking.openURL(url);
                }}
                style={style.VisualizarConvidados}
              >
                <Text style={style.textoConvidado}>Comprar Ingressos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
