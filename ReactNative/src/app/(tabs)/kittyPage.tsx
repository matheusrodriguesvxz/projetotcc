import { SafeAreaView, View, Text, Pressable, Image } from "react-native";
import * as Progress from "react-native-progress";
import { ProfileImage } from "../../components/Svgs";
import { useState } from "react";
import PaymentOptions from "../modalPayments";

export const Header = () => null;

export default function KittyPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleModalErro = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: "#760BFF",
          height: "30%",
          borderRadius: 50,
          marginBottom: 4,
          position: "relative",
          bottom: 10,
        }}
      >
        <View>
          <Progress.Bar
            progress={0.8}
            width={250}
            height={12}
            color="white"
            style={{ marginLeft: 20, marginTop: 20 }}
          />
        </View>

        <View>
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              marginTop: 20,
              fontSize: 20,
              marginLeft: 20,
              color: "white",
            }}
          >
            R$0 / 500,00
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              marginTop: 20,
              fontSize: 16,
              letterSpacing: 0.7,
              marginLeft: 20,
              color: "white",
            }}
          >
            Exibir Histórico
          </Text>
        </View>
      </SafeAreaView>
      <View>
        <View className="flex justify-center items-center ">
          <Pressable
            onPress={() => setIsModalVisible(true)}
            className="w-96 bg-black h-14 rounded-3xl justify-center"
          >
            <Text
              className="text-white text-center "
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 16,
                color: "white",
              }}
            >
              Contribuir
            </Text>
          </Pressable>
          <PaymentOptions
            isVisible={isModalVisible}
            toggleModal={toggleModal}
          />
        </View>

        <View className="flex flex-row mt-10 gap-24  items-center ">
          <View
            className="bg-"
            style={{
              backgroundColor: "#760BFF",
              width: 40,
              justifyContent: "center",
              borderRadius: 80,
              height: 40,
              alignItems: "center",
              marginLeft: 30,
            }}
          >
            <Text className="text-center justify-center items-center text-white text-3xl">
              +
            </Text>
          </View>

          <View className="">
            <Text
              style={{
                color: "#760BFF",
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Participantes
            </Text>
          </View>
        </View>

        <View className="flex flex-row justify-center items-center gap-20 mt-10">
          <View>
            <Image source={require("./Frame 43.jpg")} />
          </View>

          <View>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Jucelino Ronaldo
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              R$0
            </Text>
          </View>
        </View>

        <View className="flex flex-row justify-center items-center gap-20 mt-10">
          <View>
            <Image source={require("./Frame 43.jpg")} />
          </View>

          <View>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Jucelino Ronaldo
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              R$0
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
