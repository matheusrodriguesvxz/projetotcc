import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Modal from "react-native-modal";

const EventErro = ({ isVisibleErro, toggleModalErro }) => {
  const [typeEvent, setTypeEvent] = useState<string>("");

  return (
    <View className="flex justify-center items-center">
      <Modal
        isVisible={isVisibleErro}
        onBackdropPress={toggleModalErro}
        onBackButtonPress={toggleModalErro}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropOpacity={0.4}
      >
        <View style={styles.modalContent}>
          <Image
            source={{
              uri: "https://www.freeiconspng.com/thumbs/error-icon/error-icon-4.png",
            }}
            style={styles.icon}
          />
          <Text style={styles.title}>Erro ao Criar Evento</Text>
          <Text style={styles.message}>
            Por Favor insira uma data valida para o evento!
          </Text>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={toggleModalErro}
          >
            <Text style={styles.closeButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    display: "flex",
    borderRadius: 15,
    alignItems: "center",
    width: 360,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF0000",
    fontFamily: "Poppins",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "black",
    fontFamily: "Poppins",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EventErro;
