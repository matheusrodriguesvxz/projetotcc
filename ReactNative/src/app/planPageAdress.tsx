import React, { useState } from "react";
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
import { router } from "expo-router";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRegisterFormData>();

  const onSubmit: SubmitHandler<NewRegisterFormData> = (data) => {
    getAdress(data);
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

              <TouchableOpacity
                style={styles.NextButton}
                onPressIn={() => {
                  try {
                    handleSubmit(onSubmit);
                    router.push("/planPageFinish");
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                <Text style={styles.NextButtonText}>Próximo</Text>
              </TouchableOpacity>
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
              latitudeDelta: 0.195,
              longitudeDelta: 0.1921,
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
  box: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    height: 80,
    padding: 10,
    alignContent: "center",
    backgroundColor: "#115e54",
    justifyContent: "space-between",
    borderTopColor: "#FFF",
    borderTopWidth: 1,
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontFamily: "Poppins",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
