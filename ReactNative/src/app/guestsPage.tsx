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

export default function GuestsPage() {
 
  const style = StyleSheet.create({
    nomeEvento: {
      fontFamily: "Poppins",
      color:
        "white",
      fontWeight: "bold",
      fontSize: 18,
      width: 300,
      letterSpacing: 1,
    },
    data: {
      fontFamily: "Poppins",
      color:
      "white",
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
      marginTop: 15,
      marginLeft: 15,
      fontSize: 18
    },
    
    subConvidado: {
      color: "black",
      fontWeight: "bold",
      marginTop: 4,
      marginLeft: 30,
      fontSize: 13,
    
    }


  });

  return (
    <ScrollView>
      <View>
        <View className="flex justify-end items-center">
          <Image
            className="w-[415] h-[302]"
            source={require("../../assets/Group 2.png")}
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
          <Text style={style.convidadosConfirmados}>Convidados Confirmados</Text>
          <View className="bg-gray-200 mt-10 h-[80px] w-50 ml-4 mr-4 rounded-[20px] flex flex-col">
            <Text
            style={style.nomeConvidado}> Joao Vitor Diamon</Text>
            
            <Text style={style.subConvidado}>- Lana</Text>
            <Text style={style.subConvidado}>- Neymar</Text>
          </View>

          <View className="bg-gray-200 mt-10 h-[80px] w-50 ml-4 mr-4 rounded-[20px] flex flex-col">
            <Text
            style={style.nomeConvidado}> Eduarda Barbosa</Text>

            <Text style={style.subConvidado}>- Henrique</Text>
            <Text style={style.subConvidado}>- Heloisa</Text>
          </View>

          <View className="bg-gray-200 mt-10 h-[80px] w-50 ml-4 mr-4 rounded-[20px] flex flex-col">
            <Text
            style={style.nomeConvidado}> Gabriel Falavena</Text>

            <Text style={style.subConvidado}>- Iam Pedrin</Text>
            <Text style={style.subConvidado}>- Cristiano Ronaldo</Text>
          </View>

          <View className="bg-gray-200 mt-10 h-[80px] w-50 ml-4 mr-4 rounded-[20px] flex flex-col">
            <Text
            style={style.nomeConvidado}> Gabriella Maris </Text>

            <Text style={style.subConvidado}>- Olívia</Text>
            <Text style={style.subConvidado}>- Maitê</Text>
          </View>
          
          
        </View>
      </View>
    </ScrollView>
  );
}
