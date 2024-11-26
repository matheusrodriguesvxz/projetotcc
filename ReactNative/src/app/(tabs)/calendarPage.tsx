import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import dayjs from "dayjs";
import EditButton from "@/src/components/Svgs";
import { EventsRepository } from "@/src/repository/EventsRepository";
import { EventsServices } from "@/src/service/EventsServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import Carousel from "react-native-snap-carousel";
import { TouchableOpacity } from "react-native";

export type EventType = {
  id: string;
  name: string;
  description: string;
  pix: string;
  type: string;
  initial_date: string;
  final_date: string;
  budget: string;
  userID: string;
  olderOfAge: boolean;
  goal: string | null;
  descriptions: string | null;
  cep: string;
  street: string;
  number: number;
  city: string;
  state: string;
  complement: string;
  neighborhood: string;
  country: string;
};

const data = [
  {
    title: "Aniversário",
    subtitle: "Diamon",
    address: "Rua Engenheiro João Goulart, 1377, São Paulo",
    countdown: "Faltam 3 dias.",
  },
  {
    title: "Casamento",
    subtitle: "Guigas",
    address: "Rua Engenheiro João Goulart, 1377, São Paulo",
    countdown: "Faltam 3 dias.",
  },
  // Adicione mais eventos aqui
];

export default function CalendarPage() {
  const [selected, setSelected] = useState("");
  const [userIDs, setUserIDs] = useState<string>("");
  const [events, setEvents] = useState<EventType[]>([]);
  const eventRepository = new EventsRepository();
  const eventService = new EventsServices(eventRepository);
  const [activeIndex, setActiveIndex] = useState(0);
  const { width: screenWidth } = Dimensions.get("window");
  const [loading, setLoading] = useState(true);
  // biome-ignore lint/complexity/useLiteralKeys: <explanation>
  LocaleConfig.locales["pt"] = {
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    dayNames: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    today: "Hoje",
  };
  LocaleConfig.defaultLocale = "pt";
  useEffect(() => {
    const fetchUserID = async () => {
      const storedUserID = await AsyncStorage.getItem("user");
      setUserIDs(storedUserID ?? "");
    };
    fetchUserID();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchEvents = async () => {
      if (userIDs) {
        try {
          const fetchedEvents = await eventService.findByUserId(userIDs);
          setEvents(fetchedEvents);
        } catch (error) {
          console.error("Erro ao buscar eventos:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchEvents();
  }, [userIDs]);

  const calculateDaysLeft = (eventDate: string): number => {
    const eventDateObj = new Date(eventDate);
    const currentDate = new Date();
    const difference = eventDateObj.getTime() - currentDate.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  };

  const today = dayjs().locale("pt-br");
  today.format("dddd, DD/MM/YYYY");
  const dayName =
    today.format("dddd").localeCompare("Sunday") === 0
      ? "Domingo"
      : today.format("dddd").localeCompare("Monday") === 0
      ? "Segunda-feira"
      : today.format("dddd").localeCompare("Tuesday") === 0
      ? "Terça-feira"
      : today.format("dddd").localeCompare("Wednesday") === 0
      ? "Quarta-feira"
      : today.format("dddd").localeCompare("Thursday") === 0
      ? "Quinta-feira"
      : today.format("dddd").localeCompare("Friday") === 0
      ? "Sexta-feira"
      : "Sábado";
  const date = today.format("DD/MM");
  const markedDates = events.reduce((acc, event) => {
    const startDate = new Date(event.initial_date);
    const endDate = new Date(event.final_date);

    let currentDate = startDate;
    while (currentDate <= endDate) {
      const formattedDate = currentDate.toISOString().split("T")[0];
      acc[formattedDate] = { selected: true, dotColor: "#00b0ff" };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return acc;
  }, {} as { [key: string]: { marked: boolean; dotColor: string } });

  const onPressEvent = async (evento: EventType) => {
    try {
      if (!evento) {
        console.error("Evento não encontrado");
        return;
      }
      await AsyncStorage.setItem("selectedEvent", JSON.stringify(evento));
      router.push("/detailsEvent");
    } catch (error) {
      console.error("Erro ao armazenar o evento:", error);
    }
  };
  const onDayPress = (day: { dateString: string }) => {
    setSelected(day.dateString);
  };

  const renderItem = ({ item }: { item: EventType }) => {
    const daysLeft = calculateDaysLeft(item.initial_date);

    return (
      <View style={style.card}>
        <Text style={style.title}>{item.type}</Text>
        <Text style={style.subtitle}>{item.name}</Text>
        <Text
          style={style.address}
        >{`${item.street}, ${item.number}, ${item.city}`}</Text>{" "}
        <View className="flex flex-row gap-24 justify-center items-center">
          <Text style={style.countdown}>{`Faltam ${daysLeft} dias.`}</Text>{" "}
          <TouchableOpacity
            style={style.button}
            onPress={() => onPressEvent(item)}
          >
            <Text style={style.buttonText}>➤</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <ScrollView>
      <SafeAreaView style={style.areaRoxa}>
        <View style={style.areaBranca}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#760BFF",
              textAlign: "left",
              marginTop: 20,
            }}
          >{`${dayName}, ${date}`}</Text>
          <Calendar
            style={style.calendario}
            theme={{
              LocaleConfig: "pt",
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#760BFF",
              selectedDayBackgroundColor: "#760BFF",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#760BFF",
              dayTextColor: "#2d4150",
              textDisabledColor: "gray",
              arrowColor: "#760BFF",
            }}
            onDayPress={onDayPress}
            markedDates={markedDates}
          />
          <View>
            <View
              className="flex flex-row gap-2 justify-center items-center"
              style={{ marginTop: 20 }}
            >
              <Text
                style={{
                  fontSize: 22,
                  textAlign: "left",
                  marginBottom: 20,
                  fontFamily: "Poppins",
                }}
              >
                Gerencie seus
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  textAlign: "left",
                  marginBottom: 20,
                  color: "#760BFF",
                  fontFamily: "Poppins",
                }}
              >
                eventos
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  textAlign: "center",
                  marginBottom: 20,
                  fontFamily: "Poppins",
                }}
              >
                aqui!
              </Text>
            </View>
            {loading ? (
              <ActivityIndicator size="large" color="#760BFF" />
            ) : (
              <Carousel
                data={events}
                renderItem={renderItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth * 0.7}
                onSnapToItem={(index) => setActiveIndex(index)}
                inactiveSlideOpacity={0.5}
                inactiveSlideScale={0.9}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  calendario: {
    borderColor: "#760BFF",
    borderWidth: 1,
    borderRadius: 10,
    width: 330,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
    height: 350,
  },

  areaRoxa: {
    backgroundColor: "#760BFF",
    height: "100%",
  },

  areaBranca: {
    backgroundColor: "white",
    height: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#4A00A9",
    borderRadius: 16,
    padding: 20,
    gap: 30,
    justifyContent: "space-between",
    height: 315,
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Poppins",
  },
  subtitle: {
    fontSize: 22,
    fontFamily: "Poppins",
    color: "#fff",
    marginBottom: 15,
  },
  address: {
    fontSize: 18,
    color: "#fff",
    width: 200,
    fontFamily: "Poppins",
  },
  countdown: {
    fontSize: 14,
    color: "#fff",
    position: "relative",
    fontFamily: "Poppins",
  },
  button: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    position: "relative",
  },
  buttonText: {
    fontSize: 18,
    color: "#4A0072",
    fontWeight: "bold",
  },
});
