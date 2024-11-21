import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import WelcomeEventEasy, {
  BarraDePesquisa,
  CarosselImages,
  Comprinhas,
  HappyHour,
  Invites,
  Payment,
  Playlist,
  Viagens,
} from "../../components/HomePage";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconDrawer, IconMessage } from "../../components/Svgs";
import { ScrollView } from "react-native";
import { Tab } from "@rneui/base";
import { useEffect, useState } from "react";

import axios from "axios";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SearchInformation {
  events_results_state: string;
}

export interface TicketInfo {
  source: string;
  link: string;
  link_type: string;
}

interface Venue {
  name: string;
  rating: number;
  reviews: number;
  link: string;
}

export interface EventsFestivais {
  title: string;
  date: {
    start_date: string;
    when: string;
  };
  address: string[];
  link: string;
  description: string;
  ticket_info: TicketInfo[];
  venue: Venue;
  thumbnail: string;
  image: string;
}

export interface EventsSearchResult {
  search_information: SearchInformation;
  events_results: Event[];
}
export const Header = () => null;

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const [userIDs, setUserIDs] = useState<string>("");
  const [festivals, setFestivals] = useState<any[]>([]); 

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const response = await axios.get("https://serpapi.com/search.json", {
          params: {
            engine: "google_events",
            q: "Events in Brazil",
            hl: "pr",
            gl: "br",
            api_key:
              "60c40e33cda82fcfecac69e23543f9b38d735e616fdfe83907c82d61f5298d5f",
          },
        });

        const events = response.data?.events_results || [];
        setFestivals(events.slice(0, 10));
      } catch (error) {
        console.error("Error fetching festivals:", error);
      }
    };

    fetchFestivals();
  }, []);
  useEffect(() => {
    const fetchUserID = async () => {
      const storedUserID = await AsyncStorage.getItem("user");
      setUserIDs(storedUserID ?? ""); 
      console.log("UserID recuperado:", storedUserID); 
    };
    fetchUserID();
  }, []); 
  useEffect(() => {
    console.log("userIDs atualizado:", userIDs);
  }, [userIDs]); 

  const onPressEvent = async (evento: EventsFestivais) => {
    try {
      if (!evento) {
        console.error("Evento não encontrado");
        return;
      }
      await AsyncStorage.setItem("selectedFestivais", JSON.stringify(evento));
      router.push("/detailsFestivais");
    } catch (error) {
      console.error("Erro ao armazenar o evento:", error);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={style.areaRoxa}>
        <View className="items-center" style={style.areaBranca}>
          <WelcomeEventEasy />
          <View className="items-center" style={{ marginBottom: 20 }}>
            <BarraDePesquisa placeholder="Procurar" />
          </View>
          <View className="items-center justify-center">
            <CarosselImages />
          </View>
          <View className="flex flex-row gap-6 mt-1">
            <Invites />
            <Comprinhas />
            <Payment />
            <Playlist />
          </View>
          <View>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                letterSpacing: 1,
              }}
              className="text-2xl mt-6 ml-7 "
            >
              Destinos
            </Text>
            <Tab
              value={index}
              onChange={setIndex}
              scrollable
              style={{ padding: 10 }}
              containerStyle={{
                borderRadius: 10,
                marginLeft: 20,
              }}
              disableIndicator
            >
              <Tab.Item
                buttonStyle={{
                  backgroundColor: index === 0 ? "black" : "#EAEAEA",
                  borderRadius: 10,
                  padding: 0,
                  margin: 0,
                }}
                titleStyle={{
                  color: index === 0 ? "white" : "black",
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                  textAlign: "center",
                }}
              >
                Festivais
              </Tab.Item>
              <Tab.Item
                buttonStyle={{
                  backgroundColor: index === 1 ? "black" : "#EAEAEA",
                  borderRadius: 10,
                  padding: 0,
                  margin: 0,
                }}
                titleStyle={{
                  color: index === 1 ? "white" : "black",
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                  textAlign: "center",
                }}
              >
                Bares
              </Tab.Item>
              <Tab.Item
                buttonStyle={{
                  backgroundColor: index === 2 ? "black" : "#EAEAEA",
                  borderRadius: 10,
                  padding: 0,
                  margin: 0,
                }}
                titleStyle={{
                  color: index === 2 ? "white" : "black",
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                  textAlign: "center",
                }}
              >
                Restaurantes
              </Tab.Item>
              <Tab.Item
                buttonStyle={{
                  backgroundColor: index === 3 ? "black" : "#EAEAEA",
                  borderRadius: 10,
                  padding: 0,
                  margin: 0,
                }}
                titleStyle={{
                  color: index === 3 ? "white" : "black",
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                  textAlign: "center",
                }}
              >
                Casas
              </Tab.Item>
            </Tab>
          </View>
          <View className="flex flex-row gap-14 mt-2">
            <View>
              {festivals.length > 0 &&
                festivals.map((festival, index) => (
                  <View
                    key={index}
                    style={style.festivalItem}
                  >
                    <Pressable onPress={() => onPressEvent(festival)}>
                      <View className="flex flex-row gap-12">

                      <Image
                        style={{
                          width: 120,
                          height: 100,
                          borderRadius: 12,
                        }}
                        source={{ uri: festival.thumbnail }}
                      />
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            fontFamily: "Poppins",
                            color: "black",
                          }}
                        >
                          {festival.title}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#888",
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                          }}
                        >
                          {festival.date.start_date}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#888",
                            fontFamily: "Poppins",
                            width: 160,
                            fontWeight: "bold",
                          }}
                        >
                          {festival.date.when}
                        </Text>
                      </View>
                      </View>

                    </Pressable>
                  </View>
                ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  areaRoxa: {
    backgroundColor: "#760BFF",
    height: "100%",
  },

  areaBranca: {
    marginTop: 40,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },
  festivalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  festivalName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  festivalDate: {
    fontSize: 14,
    color: "#888",
  },
});
