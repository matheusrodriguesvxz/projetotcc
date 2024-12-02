import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  LogBox,
  Pressable,
  Share,
} from "react-native";
import type { GuestType } from "./guestsPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CompanionRepository } from "../repository/CompanionRepository";
import { CompanionServices } from "../service/CompanionsServices";

LogBox.ignoreLogs([]);

type Companions = {
  id: string;
  name: string;
  age: number;
  contact: string;
  sexy: string;
  id_guest: string;
};

export default function DetailsGuests() {
  const [guests, setGuests] = useState<GuestType>();
  const companionsRepository = new CompanionRepository();
  const companionsServices = new CompanionServices(companionsRepository);
  const [companions, setCompanions] = useState<Companions[]>([]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchGuests = async () => {
      const guestsData = await AsyncStorage.getItem("selectedGuests");
      if (guestsData) {
        setGuests(JSON.parse(guestsData));
      }
    };

    fetchGuests();
  }, []); 

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchCompanions = async () => {
      if (!guests) return; 
      const companionss = await companionsServices.getById(guests.id_guests);
      const companionsWithNumberAge = companionss.map((companion) => ({
        ...companion,
        age: Number(companion.age),
      }));
      console.log(companionsWithNumberAge);
      setCompanions(companionsWithNumberAge);
    };

    fetchCompanions();
  }, [guests]);

  return (
    <View>
      <View className="flex justify-start items-center">
        <Image
          className="w-[395] h-[302]"
          source={require("../../assets/download (1) 1.png")}
        />
        <View className=" bg-white w-full h-full rounded-[21px] bottom-52">
          <View>
            <Text
              className="text-center mt-4"
              style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                fontSize: 28,
                color: "black",
              }}
            >
              Convidado
            </Text>
          </View>

          <View className="flex  items-center">
            <View
              className="w-[345] h-[81] "
              style={{
                backgroundColor: "#F1F1F1",
                borderRadius: 15,
                marginTop: 20,
                justifyContent: "center",
              }}
            >
              <View className="flex justify-center items-center">
                <Text
                  className="text-center"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 18,
                    marginBottom: 10,
                  }}
                >
                  {guests?.nameGuest}
                </Text>
              </View>
              <View className="flex flex-row gap-4 justify-center  ">
                <View className="flex flex-row items-center gap-1	">
                  <Image source={require("../../assets/whats.png")} />
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                      color: "#909090",
                      fontSize: 18,
                    }}
                  >
                    {guests?.contact}
                  </Text>
                </View>
                <View className="flex flex-row items-center justify-center gap-1">
                  <Text
                    className=""
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 18,
                    }}
                  >
                    Idade:
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                      color: "#909090",
                      fontSize: 18,
                    }}
                  >
                    {guests?.age}
                  </Text>
                </View>
                <View className="flex flex-row items-center gap-1">
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 18,
                    }}
                  >
                    Sexo:
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                      color: "#909090",
                      fontSize: 18,
                    }}
                  >
                    {guests?.sexy}
                  </Text>
                </View>
              </View>
            </View>
          </View>
            <View className="flex justify-center items-center">
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 22,
                  marginTop: 20,
                  textAlign: "center",
                }}
                >
                Acompanhantes
              </Text>

                <ScrollView>
              {companions.length === 0 ? (
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "#909090",
                    fontSize: 18,
                    textAlign: "center",
                    marginTop: 10,
                  }}
                >
                  Nenhum acompanhante encontrado.
                </Text>
              ) : (
                companions.map((companion) => (
                  <View
                    key={companion.id}
                    className="w-[345] h-[81]"
                    style={{
                      backgroundColor: "#F1F1F1",
                      borderRadius: 15,
                      marginTop: 20,
                      justifyContent: "center",
                    }}
                  >
                    <View className="flex justify-center items-center">
                      <Text
                        className="text-center"
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                          color: "black",
                          fontSize: 18,
                          marginBottom: 10,
                        }}
                      >
                        {companion.name}
                      </Text>
                    </View>
                    <View className="flex flex-row gap-4 justify-center">
                      <View className="flex flex-row items-center gap-1">
                        <Image source={require("../../assets/whats.png")} />
                        <Text
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            color: "#909090",
                            fontSize: 18,
                          }}
                        >
                          {companion.contact}
                        </Text>
                      </View>
                      <View className="flex flex-row items-center justify-center gap-1">
                        <Text
                          className=""
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            color: "black",
                            fontSize: 18,
                          }}
                        >
                          Idade:
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            color: "#909090",
                            fontSize: 18,
                          }}
                        >
                          {companion.age}
                        </Text>
                      </View>
                      <View className="flex flex-row items-center gap-1">
                        <Text
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            color: "black",
                            fontSize: 18,
                          }}
                        >
                          Sexo:
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            color: "#909090",
                            fontSize: 18,
                          }}
                        >
                          {companion.sexy}
                        </Text>
                      </View>
                    </View>
                  </View>
                )) 
              )}
          </ScrollView>
            </View>
        </View>
      </View>
    </View>
  );
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
