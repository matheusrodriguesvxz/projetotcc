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
import type { BarDetailsType } from "./(tabs)";

LogBox.ignoreLogs([]);

export default function DetailsBar() {
  const [bar, setBar] = useState<BarDetailsType | null>(null);

  useEffect(() => {
    const fetchBar = async () => {
      const storedBar = await AsyncStorage.getItem("selectedBar");
      if (!storedBar) {
        console.error("Bar não encontrado");
        return;
      }
      setBar(JSON.parse(storedBar));
    };

    fetchBar();
    console.log("Bar:", bar);
  }, []);

  if (!bar) {
    return null;
  }

  console.log(bar.website); 

  const style = StyleSheet.create({
    nomeBar: {
      fontFamily: "Poppins",
      color: "white",
      fontWeight: "bold",
      fontSize: 18,
      width: 300,
      letterSpacing: 1,
    },
    horario: {
      fontFamily: "Poppins",
      color: "white",
      fontWeight: "bold",
      width: 300,
      letterSpacing: 1,
    },
    descricaoBar: {
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
    visualizarMenu: {
      width: 343,
      height: 56,
      paddingVertical: 12,
      backgroundColor: "#760BFF",
      paddingHorizontal: 3,
      borderRadius: 20,
      justifyContent: "center",
    },
    textoMenu: {
      textAlign: "center",
      fontFamily: "Poppins",
      fontWeight: "bold",
      color: "white",
      fontSize: 16,
    },
    cancelarBar: {
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
    hoursTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 20,
      fontFamily: "Poppins",
    },
    hoursGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      fontFamily: "Poppins",
      gap: 10,
      marginTop: 10,
    },
    hourItem: {
      width: "45%", 
      fontSize: 14,
      fontFamily: "Poppins",
      color: "#555",
    },
  });

  const renderOperatingHours = (hours) => {
    return Object.entries(hours).map(([day, hoursRange]) => (
      <Text key={day} style={style.hours}>
        {day}: {hoursRange}
      </Text>
    ));
  };

  return (
    <ScrollView>
      <View>
        <View className="flex justify-end items-center">
          <Image
            className="w-[395] h-[302]"
            source={{ uri: bar.thumbnail }}
          />
          <View className="absolute bottom-6 left-4 w-[200]">
            <Text style={style.nomeBar}>{bar.title}</Text>
          </View>
        </View>
        <View className="bg-white w-full h-full rounded-3xl bottom-4">
          <View className="flex flex-col">
            <Text style={style.descricaoBar}>Descrição do Bar</Text>
            <Text style={style.descricao}>{bar.description}</Text>
          </View>

          <View className="flex flex-col">
            <Text style={style.localizacao}>Localização</Text>
            <Text style={style.local}>{bar.address}</Text>
            <View className="flex justify-center items-center">
              <MapView
                showsUserLocation={true}
                showsMyLocationButton={true}
                toolbarEnabled={true}
                style={style.mapa}
                initialRegion={{
                  latitude: bar.latitude,
                  longitude: bar.longitude,
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
                  const url = bar.website;
                  Linking.openURL(url);
                }}
                style={style.visualizarMenu}
              >
                <Text style={style.textoMenu}>Ver Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
