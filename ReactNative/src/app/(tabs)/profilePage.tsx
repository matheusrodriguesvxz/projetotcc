import { SafeAreaView, Text, Image, View } from "react-native";
import EditButton, { ImageInicialPage } from "../../components/Svgs";
import { Icon } from "@rneui/base";
import { auth, db } from "@/src/services/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  name: string;
  email: string;
  userID: string;
};

const fetchDataFromFirestore = async () => {
  try {
    const userID = await AsyncStorage.getItem("user");
    
    if (!userID) {
      console.log("Id do Usuario nao encontrado");
      return;
    }
    const queryName = query(collection(db, "Usuários"), where("uid", "==", userID));
    const response = await getDocs(queryName);

    const userData = response.docs.map((doc) => doc.data().nome);

    return userData.toString();
  } catch (error) {
    console.log(error);
  }

};



export default function Perfil() {
  const [name, setName] = useState("");
  

  useEffect(() => {
    fetchDataFromFirestore().then((nome) => {
      if (nome) {
        setName(nome);
      }
    });
  }, []);
  return (

    <View className="mb-10">
      <Image
        className="w-full  bottom-32 rounded-[45px]"
        source={require("../../../assets/purplebg.png")}
      />
      <Text
        style={{
          fontFamily: "Poppins",
          fontWeight: "bold",
          color: "white",
          letterSpacing: 0.5,
          position: "absolute",
          marginTop: 88,
          marginLeft: 35,
          fontSize: 24,
        }}
      >
        Perfil
      </Text>

      <View className="grid grid-rows-4 items-center justify-center">
        <View
          className=" w-[342px] h-[105px] absolute bottom-[70px] rounded-[30px] justify-center"
          style={{
            backgroundColor: "#D9D9D9",
          }}
        >
          <View className="flex">
            <View className="ml-4 flex flex-row gap-20">
              <Image style={{
                position: "absolute",
              }} source={require("../../../assets/image 23.png")} />
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "black",
                    letterSpacing: 0.7,
                    marginLeft: 80,
                    fontSize: 20,
                    position: "relative",
                    width: 140,
                    maxWidth: 140,
                  }}
                >
                  {`Ola, ${name}`}
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "#909090",
                    letterSpacing: 0.5,
                    marginLeft: 80,
                    fontSize: 14,
                  }}
                >
                  Contribuinte
                </Text>
              </View>

              <View className="  justify-center  max-w-72">
                <EditButton />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="relative bottom-4">
        <Text
          style={{
            fontFamily: "Poppins",
            fontWeight: "bold",
            color: "black",
            letterSpacing: 0.5,
            marginLeft: 40,
            position: "relative",
            bottom: 30,
            fontSize: 24,
          }}
        >
          Conta
        </Text>

        <View className="items-center">
          <View
            className="w-96 "
            style={{
              backgroundColor: "#D9D9D9",
              height: 30,
              borderRadius: 35,
              position: "relative",
              bottom: 20,
              marginBottom: 15,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                color: "gray",
                letterSpacing: 0.5,
                marginLeft: 32,
                fontSize: 16,
              }}
              className="pb-3"
            >
              Detalhes da Conta
            </Text>
          </View>

          <View
            className="w-96 "
            style={{
              backgroundColor: "#D9D9D9",
              height: 30,
              borderRadius: 35,
              position: "relative",
              bottom: 20,
              marginBottom: 15,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                color: "gray",
                letterSpacing: 0.5,
                marginLeft: 32,
                fontSize: 16,
              }}
              className="pb-3"
            ></Text>
          </View>
          <View
            className="w-96 "
            style={{
              backgroundColor: "#D9D9D9",
              height: 30,
              borderRadius: 35,
              position: "relative",
              bottom: 20,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                color: "gray",
                letterSpacing: 0.5,
                marginLeft: 32,
                fontSize: 16,
              }}
              className="pb-3"
            ></Text>
          </View>
        </View>

        <View>
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "black",
              letterSpacing: 0.5,
              marginLeft: 40,
              position: "relative",
              top: 5,
              fontSize: 24,
            }}
          >
            Notificações
          </Text>
          <View className="items-center mt-10">
            <View
              className="w-96 "
              style={{
                backgroundColor: "#D9D9D9",
                height: 30,
                borderRadius: 35,
                position: "relative",
                bottom: 20,
                marginBottom: 15,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  color: "gray",
                  letterSpacing: 0.5,
                  marginLeft: 32,
                  fontSize: 16,
                }}
                className="pb-3"
              ></Text>
            </View>
            <View
              className="w-96 "
              style={{
                backgroundColor: "#D9D9D9",
                height: 30,
                borderRadius: 35,
                position: "relative",
                bottom: 20,
                marginBottom: 15,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  color: "gray",
                  letterSpacing: 0.5,
                  marginLeft: 32,
                  fontSize: 16,
                }}
                className="pb-3"
              ></Text>
            </View>
            <View
              className="w-96 "
              style={{
                backgroundColor: "#D9D9D9",
                height: 30,
                borderRadius: 35,
                position: "relative",
                bottom: 20,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  color: "gray",
                  letterSpacing: 0.5,
                  marginLeft: 32,
                  fontSize: 16,
                }}
                className="pb-3"
              ></Text>
            </View>
          </View>
        </View>

        <View>
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "black",
              letterSpacing: 0.5,
              marginLeft: 40,
              position: "relative",
              top: 5,
              fontSize: 24,
            }}
          >
            Outros
          </Text>
          <View className="items-center mt-10">
            <View
              className="w-96 "
              style={{
                backgroundColor: "#D9D9D9",
                height: 30,
                borderRadius: 35,
                position: "relative",
                bottom: 20,
                marginBottom: 15,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  color: "gray",
                  letterSpacing: 0.5,
                  marginLeft: 32,
                  fontSize: 16,
                }}
                className="pb-3"
              ></Text>
            </View>
            <View
              className="w-96 "
              style={{
                backgroundColor: "#D9D9D9",
                height: 30,
                borderRadius: 35,
                position: "relative",
                bottom: 20,
                marginBottom: 15,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  color: "gray",
                  letterSpacing: 0.5,
                  marginLeft: 32,
                  fontSize: 16,
                }}
                className="pb-3"
              ></Text>
            </View>
            <View
              className="w-96 "
              style={{
                backgroundColor: "#D9D9D9",
                height: 30,
                borderRadius: 35,
                position: "relative",
                bottom: 20,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  color: "gray",
                  letterSpacing: 0.5,
                  marginLeft: 32,
                  fontSize: 16,
                }}
                className="pb-3"
              ></Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
