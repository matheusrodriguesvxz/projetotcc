import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const EventConfirmationModal = ({ isVisible, toggleModal }) => {

const [typeEvent, setTypeEvent] = useState<string>("");

  const getPlanTyoe = (eventType: string) => {
    switch (eventType) {
      case "Casamento":
        return router.push("/planPageMarried");
      case "Aniversário":
        return router.push("/planPageBirthday");
      case "Viagem":
        return require("../../assets/Group 4.png");
      case "Role / Festas":
        return router.push("/planPageParty");
      default:
        return null;
    }
  };



  function closeModal() {
    setTimeout(() => {
      getPlanTyoe(typeEvent);
    }, 300);
  }

  useEffect(() => {
    const fetchUserID = async () => {
      const typeEvent = await AsyncStorage.getItem("index");
      setTypeEvent(typeEvent ?? "");
    };
    fetchUserID();
  }, []);
  return (
    <View className='flex justify-center items-center'>

    <Modal
      isVisible={isVisible}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.4}
      >
      <View style={styles.modalContent}>
        <Image
          source={{ uri: 'https://static-00.iconduck.com/assets.00/alert-success-icon-1024x1024-aobtkid4.png' }} 
          style={styles.icon}
          />
        <Text style={styles.title}>Evento criado com sucesso!</Text>
        <Text style={styles.message}>Seu evento foi criado com sucesso! Agora Escolha seu Cardapio!</Text>
        
        <TouchableOpacity style={styles.closeButton} onPress={toggleModal} onPressIn={closeModal}>
          <Text style={styles.closeButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
 </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    display: 'flex',
    borderRadius: 15,
    alignItems: 'center',
    width: 360,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#760BFF',
    fontFamily: 'Poppins',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#760BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EventConfirmationModal;
