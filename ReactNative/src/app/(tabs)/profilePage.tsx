import {
  SafeAreaView,
  Text,
  Image,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import EditButton from "../../components/Svgs";
import { db } from "@/src/services/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ApplicationProvider,
  Button,
  Card,
  Modal,
  ModalService,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { UpdateInputs } from "@/src/components/RegisterPage/RegisterPageComp";
import { notify,createNotifications, useNotificationController } from 'react-native-notificated'  
ModalService.setShouldUseTopInsets = true;

const fetchDataFromFirestore = async () => {
  try {
    const userID = await AsyncStorage.getItem("user");
    if (!userID) {
      console.log("Id do Usuario nao encontrado");
      return null;
    }

    const queryName = query(
      collection(db, "Usuários"),
      where("uid", "==", userID)
    );
    const response = await getDocs(queryName);

    const userData = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return userData[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateDataInFirestore = async (
  docId: string,
  updatedData: { nome: string; email: string }
) => {
  try {
    const userRef = doc(db, "Usuários", docId);
    await updateDoc(userRef, updatedData);
    console.log("Dados atualizados com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar os dados:", error);
  }
};
const { useNotifications, NotificationsProvider } = createNotifications({
  isNotch: true,
})
export default function Perfil() {
  const [user, setUser] = useState<{ nome: string; email: string; id: string }>(
    {
      nome: "",
      email: "",
      id: "",
    }
  );
  const [userID, setUserID] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const { notify } = useNotifications()

  useEffect(() => {
    fetchDataFromFirestore().then((data) => {
      if (data) {
        setUser({
          nome: data.nome,
          email: data.email,
          id: data.id,
        });
      }

      console.log(data?.id);
    });
  }, []);

  useEffect(() => {
    fetchDataFromFirestore().then((data) => {
      if (data) {
        console.log(data.id);
        setUser({ nome: data.nome, email: data.email, id: data.id });
      }
    });
  }, []);

  const handleUpdate = () => {
    try {
      const { id, ...updatedData } = user;
      updateDataInFirestore(id, updatedData);
      notify('success', {
        params: {
          description: 'This is where the toast text goes',
          title: 'Success',
        },
      })
      setVisible(false);
    } catch (error) {
      console.log("ID do usuário não encontrado para atualização.");
    }
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
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
                <Image
                  style={{
                    position: "absolute",
                  }}
                  source={require("../../../assets/image 23.png")}
                />
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
                    {`Ola, ${user.nome}`}
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
                  <Pressable onPress={() => setVisible(true)}>
                    <EditButton />
                  </Pressable>
                  <Modal
                    visible={visible}
                    backdropStyle={styles.backdrop}
                    onBackdropPress={() => setVisible(false)}
                  >
                    <Card
                      disabled={true}
                      style={{
                        borderRadius: 20,
                        padding: 20,
                        width: 300,
                        height: 400,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                          color: "#760BFF",
                          letterSpacing: 0.5,
                          fontSize: 24,
                          textAlign: "center",
                          marginBottom: 20,
                        }}
                      >
                        Detalhes do seu Perfil
                      </Text>
                      <View className="flex flex-col gap-5 items-center w-[200] justify-center">
                        <UpdateInputs
                          value={user.nome}
                          placeholder="Nome"
                          keyboardType="default"
                          onChangeText={(nome) =>
                            setUser((prev) => ({ ...prev, nome }))
                          }
                        />
                        <UpdateInputs
                          value={user.email}
                          placeholder="Email"
                          keyboardType="default"
                          onChangeText={(email) =>
                            setUser((prev) => ({ ...prev, email }))
                          }
                        />
                      </View>
                      <View className="flex flex-row justify-center mt-10 ">
                        <Button
                          onPress={handleUpdate}
                          style={styles.button}
                          status="success"
                        >
                          Atualizar
                        </Button>
                        <Button
                          style={styles.button}
                          onPress={() => setVisible(false)}
                          status="danger"
                        >
                          Cancelar
                        </Button>
                      </View>
                    </Card>
                  </Modal>
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
              >
                Segurança
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
              >
                Preferências
              </Text>
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
                >
                  Notificações
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
                >
                  Emails de Notificação
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
                >
                  Notificações de SMS
                </Text>
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
                >
                  Termos e Condições
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
                >
                  Política de Privacidade
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
                  Sair
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  button: {
    margin: 2,
  },
});
