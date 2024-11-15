import { View, Text, StyleSheet } from "react-native";
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
import { useState } from "react";

export const Header = () => null;

export default function HomePage() {
  const [index, setIndex] = useState(0);
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
            <Viagens />
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
});
