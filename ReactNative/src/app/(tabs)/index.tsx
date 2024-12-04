import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import WelcomeEventEasy, {
  BarraDePesquisa,
  CarosselImages,
  Comprinhas,
  Invites,
  Payment,
  Playlist,
} from "../../components/HomePage";
import { SafeAreaView } from "react-native-safe-area-context";
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
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [festivals, setFestivals] = useState<any[]>([]);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [hotels, setHotels] = useState<any[]>([]);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [bar, setBars] = useState<any[]>([]);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [restaurants, setRestaurants] = useState<any[]>([]);

  async function getRestaurantsInSaoPaulo() {
    const apiUrl = "https://serpapi.com/search.json";
    const params = {
      engine: "google_maps",
      type: "search",
      q: "restaurantes em São Paulo",
      hl: "pt",
      gl: "br",
      api_key:
        "60c40e33cda82fcfecac69e23543f9b38d735e616fdfe83907c82d61f5298d5f",
    };

    try {
      const response = await axios.get(apiUrl, { params });
      setRestaurants(response.data.local_results || []);
    } catch (error) {
      console.error("Erro ao buscar restaurantes:");
    }
  }

  async function getHotelsInSaoPaulo() {
    const apiUrl = "https://serpapi.com/search.json";
    const params = {
      engine: "google_hotels",
      q: "São Paulo Hotels",
      check_in_date: "2024-12-14",
      check_out_date: "2024-12-30",
      adults: 2,
      currency: "BRL",
      gl: "br",
      hl: "pt",
      api_key:
        "60c40e33cda82fcfecac69e23543f9b38d735e616fdfe83907c82d61f5298d5f",
    };

    try {
      const response = await axios.get(apiUrl, { params });
      setHotels(response.data.properties || []);
    } catch (error) {
      console.error("Erro ao buscar hotéis:");
    }
  }

  async function getBarsInSaoPaulo() {
    const apiUrl = "https://serpapi.com/search.json";
    const params = {
      engine: "google_maps",
      type: "search",
      q: "bares em São Paulo",
      hl: "pt",
      gl: "br",
      api_key:
        "60c40e33cda82fcfecac69e23543f9b38d735e616fdfe83907c82d61f5298d5f",
    };

    try {
      const response = await axios.get(apiUrl, { params });
      setBars(response.data.local_results || []);
    } catch (error) {
      console.error("Erro ao buscar bares:");
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
    getHotelsInSaoPaulo();
    getBarsInSaoPaulo();
    getRestaurantsInSaoPaulo();
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
            <Playlist/>
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
            {index === 0 && festivals.length > 0 && (
              <View>
                {festivals.map((festival, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <View key={index} style={style.festivalItem}>
                    <Pressable onPress={() => onPressEvent(festival)}>
                      <View className="flex flex-row gap-12">
                        <Image
                          style={{ width: 120, height: 100, borderRadius: 12 }}
                          source={{ uri: festival.thumbnail }}
                        />
                        <View>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 16,
                              maxWidth: 200,
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
            )}
          </View>
          {index === 3 && hotels.length > 0 && (
            <View>
              {hotels.map((house, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <View key={index} style={style.festivalItem}>
                  <Pressable
                    onPress={async () => {
                      try {
                        await AsyncStorage.setItem(
                          "selectedHotel",
                          JSON.stringify(house)
                        );
                        console.log("Hotel salvo com sucesso!");

                        router.push("/detailsHotel");
                      } catch (error) {
                        console.error("Erro ao salvar o hotel:", error);
                      }
                    }}
                  >
                    <View className="flex flex-row gap-12">
                      <Image
                        style={{ width: 120, height: 100, borderRadius: 12 }}
                        source={{ uri: house.images[0].thumbnail }}
                      />
                      <View>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            maxWidth: 200,
                            fontSize: 16,
                            fontWeight: "bold",
                            fontFamily: "Poppins",
                            color: "black",
                          }}
                        >
                          {house.name}
                        </Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            maxWidth: 200,
                            fontSize: 14,
                            color: "#888",
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                          }}
                        >
                          {house.description}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#888",
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                          }}
                        >
                          {house.rate_per_night.lowest}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              ))}
            </View>
          )}

          {index === 1 && bar.length > 0 ? (
            bar.map((barItem, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <View key={index} style={style.barItem}>
                <Pressable
                  onPress={async () => {
                    try {
                      await AsyncStorage.setItem(
                        "selectedBar",
                        JSON.stringify(barItem)
                      );
                      console.log("Bar salvo com sucesso!");
                      router.push("/detailsBar");
                    } catch (error) {
                      console.error("Erro ao salvar o bar:", error);
                    }
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Image
                      style={{ width: 120, height: 100, borderRadius: 12 }}
                      source={{
                        uri:
                          barItem.thumbnail ||
                          "https://via.placeholder.com/120x100",
                      }}
                    />
                    <View style={{ flexShrink: 1 }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          maxWidth: 200,
                          fontSize: 16,
                          fontWeight: "bold",
                          fontFamily: "Poppins",
                          color: "black",
                        }}
                      >
                        {barItem.title || "Nome indisponível"}
                      </Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          maxWidth: 200,
                          fontSize: 14,
                          color: "#888",
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                          marginTop: 5,
                        }}
                      >
                        {barItem.description || "Descrição não disponível ppp."}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            ))
          ) : (
            // biome-ignore lint/style/useSelfClosingElements: <explanation>
            <View></View>
          )}

          {index === 2 && restaurants.length > 0 ? (
            restaurants.map((restaurant, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <View key={index} style={style.barItem}>
                <Pressable
                  onPress={async () => {
                    try {
                      await AsyncStorage.setItem(
                        "selectedRestaurant",
                        JSON.stringify(restaurant)
                      );
                      console.log("Restaurante salvo com sucesso!");

                      router.push("/detailsRestaurant");
                    } catch (error) {
                      console.error("Erro ao salvar o restaurante:", error);
                    }
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Image
                      style={{ width: 120, height: 100, borderRadius: 12 }}
                      source={{
                        uri:
                          restaurant.thumbnail ||
                          "https://via.placeholder.com/120x100",
                      }}
                    />
                    <View style={{ flexShrink: 1 }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          maxWidth: 200,
                          fontSize: 16,
                          fontWeight: "bold",
                          fontFamily: "Poppins",
                          color: "black",
                        }}
                      >
                        {restaurant.title || "Nome indisponível"}
                      </Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          maxWidth: 200,
                          fontSize: 14,
                          color: "#888",
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                          marginTop: 5,
                        }}
                      >
                        {restaurant.description || "Descrição não disponível."}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            ))
          ) : (
            // biome-ignore lint/style/useSelfClosingElements: <explanation>
            <View></View>
          )}
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
  barItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
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
    flexWrap: "wrap",
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
