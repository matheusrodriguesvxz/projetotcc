import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { AdressRepository } from "../repository/AdressRepository";
import { AdressServices } from "../service/AdressServices";
import { Adress } from "../entity/Adress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type NewRegisterFormData = {
  adress: string;
};

export function getAdress(data: NewRegisterFormData) {
  const adress = data.adress;
  console.log(adress);
  return adress;
}

export default function PlanPageAdress() {
  const [latitude, setLatitude] = useState(-20.398259);
  const [longitude, setLongitude] = useState(-43.507726);
  const [error, setError] = useState<string | null>(null);
  const [userIDs, setUserIDs] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const adressRepository = new AdressRepository();
  const adressService = new AdressServices(adressRepository);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRegisterFormData>();

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const storedUserID = await AsyncStorage.getItem("user");
        setUserIDs(storedUserID); 
        setLoading(false); 
        console.log("UserID recuperado:", storedUserID);
      } catch (error) {
        console.error("Erro ao recuperar UserID:", error);
        setLoading(false); 
      }
    };
    fetchUserID();
  }, []);

  const extractCepFromAddress = (address: string): string | null => {
    const cepPattern = /\d{5}-\d{3}/;
    const match = address.match(cepPattern);
    return match ? match[0] : null;
  };


  const fetchAddressFromCep = async (cep: string) => {
    if (!userIDs) {
      console.log("UserID não disponível.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      console.log("Dados do CEP:", data);
      console.log("ID do usuário:", userIDs);
      const adress = new Adress({
        cep: data.cep,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
        country: "Brasil",
        complement: data.complemento,
        number: 1,
        userID: userIDs,
      });

      console.log("Endereço", adress);
      try {
        const createdAdress = await adressService.create(adress);
        console.log("Endereço criado com sucesso:", createdAdress);
        if (createdAdress?.id) {
          await AsyncStorage.setItem("address_id", createdAdress.id);
          console.log("ID do endereço salvo no AsyncStorage:", createdAdress.id);
         
        } else {
          console.log("O endereço foi criado, mas não tem um ID.");
        }
      } catch (error) {
        console.error("Erro ao criar endereço:", error);
      } finally {
        router.push("/planPageFinish");
      }
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    }
  };

  const fetchCoordinates = async (address: string) => {
    if (!userIDs) {
      console.log("UserID não disponível.");
      return; 
    }

    try {
      const response = await axios.get("https://serpapi.com/search.json", {
        params: {
          engine: "google_maps",
          q: address,
          api_key:
            "60c40e33cda82fcfecac69e23543f9b38d735e616fdfe83907c82d61f5298d5f",
        },
      });

      const location = response.data?.place_results?.gps_coordinates;
      const endereco = response.data?.place_results?.address;
      if (location) {
        setLatitude(location.latitude);
        setLongitude(location.longitude);
      } else {
        setError("Endereço não encontrado.");
      }
      if (endereco) {
        const cep = extractCepFromAddress(endereco);
        console.log("CEP encontrado:", cep);
        if (cep) {
          fetchAddressFromCep(cep);
        } else {
          console.log("CEP não encontrado.");
        }
      } else {
        setError("Endereço não encontrado.");
      }
    } catch (err) {
      console.log(err);
      setError("Erro ao buscar o endereço.");
    }
  };

  const onSubmit: SubmitHandler<NewRegisterFormData> = (data) => {
    const address = getAdress(data);
    fetchCoordinates(address);
    
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex flex-1 justify-end items-start">
          <Image
            className="z-40 absolute"
            source={require("../../assets/Purple Wallpapers 2.png")}
          />
          <View className="absolute z-50 ">
            <View className="flex justify-center items-center">
              <Text
                style={{
                  fontSize: 22,
                  width: 300,
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  bottom: 180,
                  left: 30,
                }}
              >
                Encontre o lugar ideal para seu evento:
              </Text>
              <Controller
                control={control}
                name="adress"
                rules={{
                  required: "Endereco é obrigatório",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="bg-white w-[335] h-[42] rounded-[8]"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={"#828282"}
                    style={{
                      fontFamily: "Poppins",
                      paddingLeft: 10,
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#828282",
                      bottom: 150,
                      left: 35,
                    }}
                    placeholder="Insira o endereço aqui"
                  />
                )}
              />
              {errors.adress && (
                <Text style={styles.error}>{errors.adress.message}</Text>
              )}
              {error && <Text style={styles.error}>{error}</Text>}
              {loading ? (
                <Text style={styles.loadingText}>Carregando...</Text>
              ) : (
                <TouchableOpacity
                  style={styles.NextButton}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={styles.NextButtonText}>Próximo</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <MapView
            showsUserLocation={true}
            showsMyLocationButton={false}
            toolbarEnabled={false}
            style={{
              height: "100%",
              width: "100%",
              zIndex: 10,
            }}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            region={{
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  NextButton: {
    justifyContent: "center",
    width: 233,
    height: 56,
    position: "absolute",
    zIndex: 50,
    marginTop: 20,
    paddingVertical: 12,
    left: 80,
    backgroundColor: "black",
    paddingHorizontal: 3,
    borderRadius: 20,
    marginBottom: 30,
    bottom: 20,
  },
  NextButtonText: {
    fontFamily: "Poppins",
    color: "#ffffff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontFamily: "Poppins",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  loadingText: {
    fontFamily: "Poppins",
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
