import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { GreyAiPage, WhiteAiPage } from '../components/Svgs';
import { GreyContainerAiPage, GreyContainerAiPage2  } from '../components/AiPage';
export default function aiPage() {
  return (
    <View className='w-100% h-auto' style={{
        backgroundColor: "White"
    }}>
        <Image style={{
            height: "620"
        }} source={require("../../assets/BackAiPage.png")}/>      
        <View style={{
            height: "400",
            display: "flex",
            flexDirection: "row",
            gap: "12",
            marginTop: "350",
            position: "absolute"
        }}>
            <GreyContainerAiPage/>
            <GreyContainerAiPage2/>
        </View>
            <View style={{
                position: "absolute",
                zIndex: "1",
                top: "580",
                marginLeft: "20"
            }}>
                <Text style={{
                    fontFamily: "Poppins",
                    fontSize: 18,
                    fontWeight: "regular",
                    paddingBottom: "20"
                }}>Insira o nome do produto que nós fazemos todo o trabalho!</Text>

                <TextInput style={{
                    height: "56",
                    width: "350",
                    backgroundColor: "#EAEAEA",
                    fontFamily: "Poppins",
                    fontWeight: "medium"

                }}
                    placeholder="Mensagem"
                    placeholderTextColor="#AAA"
                    className="bg-white rounded-full px-4 py-3 text-black text-base"
                />
            </View>
          
        </View>


    
);
       
}
