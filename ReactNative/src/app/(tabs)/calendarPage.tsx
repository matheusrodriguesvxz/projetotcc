import { StyleSheet, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import type React from "react";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import dayjs from "dayjs";
import EditButton from "@/src/components/Svgs";
import { EventsRepository } from "@/src/repository/EventsRepository";
import { EventsServices } from "@/src/service/EventsServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import { router } from "expo-router";

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

export default function CalendarPage() {
  const [selected, setSelected] = useState("");
  const [userIDs, setUserIDs] = useState<string>("");
  const [events, setEvents] = useState<EventType[]>([]);
  const eventRepository = new EventsRepository();
  const eventService = new EventsServices(eventRepository);

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
  const getImageSource = (eventType: string) => {
    switch (eventType) {
      case "Casamento":
        return require("../../../assets/Group 2.png");
      case "Aniversário":
        return require("../../../assets/Group 3.png");
      case "Viagem":
        return require("../../../assets/Group 4.png");
      case "Role / Festas":
        return require("../../../assets/Group 5.png");
    }
  };
  const onDayPress = (day: { dateString: string }) => {
    setSelected(day.dateString);
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
          (
          <View>
            {events.map((evento, index) => {
              const daysLeft = calculateDaysLeft(evento.final_date);
              return (
                <View key={evento.id}>
                  <View
                    className="mt-5 w-[350] h-[97] flex items-center flex-row"
                    style={{
                      backgroundColor: "rgba(105, 105, 105, 0.2)",
                      borderRadius: 20,
                    }}
                  >
                    <View>
                      <Image
                        style={{
                          width: 80,
                          height: 80,
                          marginLeft: 10,
                        }}
                        source={getImageSource(evento.type)}
                      />
                    </View>
                    <View className="flex justify-center items-center">
                      <Text
                        className="bottom-8 left-2"
                        style={{
                          fontSize: 15,
                          fontWeight: "bold",
                          color: "black",
                          fontFamily: "Poppins",
                          textAlign: "center",
                          marginTop: 25,
                          width: 220,
                          maxWidth: 220,
                          textAlignVertical: "center",
                        }}
                      >
                        {evento.name}
                      </Text>
                      <Text
                        className="bottom-8 left-2"
                        style={{
                          fontSize: 11,
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                          color: "#909090",
                          textAlign: "center",
                          width: 170,
                          textAlignVertical: "center",
                        }}
                      >
                        {daysLeft > 0
                          ? `Faltam ${daysLeft} ${
                              daysLeft === 1 ? "dia" : "dias"
                            } para o evento.`
                          : "O evento já ocorreu."}
                      </Text>

                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                          color: "#909090",
                          textAlign: "center",
                          width: 160,
                        }}
                      >
                        {`${evento.street}, ${evento.number} -  ${evento.state}`}
                      </Text>
                    </View>
                    <View className="mr-4">
                      <Pressable onPressIn={() => onPressEvent(evento)}>
                        <EditButton />
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            })}
            )
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
});
