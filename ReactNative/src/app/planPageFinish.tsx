import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LogoWithoutName } from "../components/Svgs";
import { router } from "expo-router";
import { ResetInputs } from "../components/RegisterPage/RegisterPageComp";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useEffect, useState } from "react";
import { Events } from "../entity/Event";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { UseTypesEvents } from "@/hooks/useTypesEvents";
import { EventsRepository } from "../repository/EventsRepository";
import { EventsServices } from "../service/EventsServices";
import EventConfirmationModal from "./modalSucesso";
import EventErro from "./modalErro";
import RNDateTimePicker, { DateTimePickerAndroid, type DateTimePickerEvent } from '@react-native-community/datetimepicker';


type NewRegisterFormData = {
  name: string;
  description: string;
};

export default function PlanPageFinish() {
  const [selected, setSelected] = useState("");
  const [userIDs, setUserIDs] = useState<string>("");
  const [addressID, setAddressID] = useState<string>("");
  const [typeEvent, setTypeEvent] = useState<string>("");
  const eventRepository = new EventsRepository();
  const [hours, setHours] = useState("");
  const eventServices = new EventsServices(eventRepository);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleErro, setIsModalVisibleErro] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleModalErro = () => {
    setIsModalVisibleErro(!isModalVisibleErro);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRegisterFormData>();

  useEffect(() => {
    const fetchUserID = async () => {
      const storedUserID = await AsyncStorage.getItem("user");
      setUserIDs(storedUserID ?? "");
      console.log("UserID recuperado:", storedUserID);
    };
    fetchUserID();
    const fetchType = async () => {
      const storedType = await AsyncStorage.getItem("index");
      setTypeEvent(storedType ?? "");
    };
    fetchType();
    const fetchAddress = async () => {
      const storedAddress = await AsyncStorage.getItem("address_id");
      console.log("Endereço recuperado:", storedAddress);
      setAddressID(storedAddress ?? "");
    }
    fetchAddress();
  }, []);

  async function createEvent(data: NewRegisterFormData) {
    const selectedDate = new Date(selected);

    if (selected == null || selected === undefined || selected === "") {
      setIsModalVisibleErro(true);
      return;
    }
    // biome-ignore lint/style/noUselessElse: <explanation>
    else if(selectedDate != null  ){
      setIsModalVisible(true);
    }
    const setDate = (event: DateTimePickerEvent, date: Date) => {
      const {
        type,
        nativeEvent: {timestamp, utcOffset},
      } = event;
    };
    const event = new Events({
      userID: userIDs,
      name: data.name,
      description: data.description,
      initial_date: selectedDate,
      final_date: selectedDate,
      type: typeEvent,
      budget: "0",
      pix: "0",
      olderOfAge: false,
      id_adress: addressID,
    });
    console.log(event);
    try {
      const response = await eventServices.create(event);
      AsyncStorage.setItem("eventID", response.id);
    } catch (error) {
      console.error("Erro ao criar o evento:", error);
    }
  }
  const onSubmit: SubmitHandler<NewRegisterFormData> = (data) => {
    createEvent(data);
  };

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
      "Jan.",
      "Fev.",
      "Mar.",
      "Abr.",
      "Mai.",
      "Jun.",
      "Jul.",
      "Ago.",
      "Set.",
      "Out.",
      "Nov.",
      "Dez.",
    ],
    dayNames: [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ],
    dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."],
    today: "Hoje",
  };
  LocaleConfig.defaultLocale = "pt";
  return (
    <ScrollView
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
        paddingBottom: 50,
      }}
    >
      <Image source={require("../../assets/purplewallpapers2.png")} />
      <View style={{ flex: 1 }} className=" absolute h-full w-full">
        <LogoWithoutName />
        <View className="mt-[210] mb-10 ml-[24]">
          <Text style={style.Texto}>Ultimos passos... </Text>
        </View>
        <View className="w-full rounded-[45] bg-white h-[800] items-center">
          <View className="flex  items-center justify-center mt-8 mb-8">
            <View className="flex justify-center">
              <Controller
                control={control}
                name="name"
                rules={{
                  required: "Nome do Evento é obrigatório",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ResetInputs
                    placeholder="Nome do Evento"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.name && (
                <Text style={style.error}>{errors.name.message}</Text>
              )}

              <Controller
                control={control}
                name="description"
                rules={{
                  required: "a Descricao do Evento é obrigatória",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ResetInputs
                    placeholder="Descrição"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.description && (
                <Text style={style.error}>{errors.description.message}</Text>
              )}
            </View>

            <View className="flex justify-center items-center mt-10 ">
              <Text
                style={{
                  fontFamily: "Poppins",
                  color: "#760BFF",
                  fontWeight: "900",
                  fontSize: 18,
                  letterSpacing: 1,
                }}
              >
                Escolha a data de seu evento
              </Text>
              <Calendar
                style={style.calendario}
                theme={{
                  LocaleConfig: "pt",
                  backgroundColor: "#ffffff",
                  calendarBackground: "#ffffff",
                  textSectionTitleColor: "#b6c1cd",
                  selectedDayBackgroundColor: "#760BFF",
                  selectedDayTextColor: "#ffffff",
                  todayTextColor: "#760BFF",
                  dayTextColor: "#2d4150",
                  textDisabledColor: "gray",
                  arrowColor: "#760BFF",
                }}
                onDayPress={(day: {
                  dateString: React.SetStateAction<string>;
                }) => {
                  setSelected(day.dateString);
                }}
                markedDates={{
                  [selected]: { selected: true, disableTouchEvent: true },
                }}
              />
            </View>
            <View>
              
            </View>
          </View>

          <TouchableOpacity
            className="flex justify-center items-center pb-8"
            onPress={handleSubmit(onSubmit)}
            style={style.NextButton}
          >
            <Text style={style.NextButtonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <EventConfirmationModal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
      />
      <EventErro isVisibleErro={isModalVisibleErro} toggleModalErro={toggleModalErro} />
    </ScrollView>
  );
}
const style = StyleSheet.create({
  Texto: {
    fontFamily: "Poppins",
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 27,
    letterSpacing: 1,
  },
  Texto2: {
    fontFamily: "Poppins",
    color: "#ffffff",
    fontSize: 27,
    letterSpacing: 1,
  },

  NextButton: {
    justifyContent: "center",
    width: 233,
    height: 56,
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "black",
    paddingHorizontal: 3,
    borderRadius: 20,
    marginBottom: 90,
    bottom: 40,
  },
  NextButtonText: {
    fontFamily: "Poppins",
    color: "#ffffff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  categorias: {
    fontFamily: "Poppins",
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 17,
    marginLeft: 10,
    letterSpacing: 1,
  },
  calendario: {
    borderColor: "#D1D5DB",
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
  error: {
    color: "red",
    marginBottom: 8,
    fontFamily: "Poppins",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
