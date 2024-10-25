import { SafeAreaView, Text, Image, View } from "react-native";
import { ImageInicialPage } from "../components/Svgs";



export default function Perfil() {
    return (
        <View className="mb-10" >
            <Image className="w-full  bottom-32 rounded-[45px]" source={require("../../assets/purplebg.png")} />
            <Text style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                color: "white",
                letterSpacing: 0.5,
                position: 'absolute',
                marginTop: 88,
                marginLeft: 35,
                fontSize: 24,
            }}>Perfil</Text>

            <View className="grid grid-rows-4 items-center justify-center">

                <View className=" w-[342px] h-[105px] absolute bottom-[70px] rounded-[30px] justify-center"
                    style={{
                        backgroundColor: "#D9D9D9"

                    }}>

                    <View className="grid grid-row-3">

                        <View className="ml-4 flex flex-row ">
                            <Image source={require('../../assets/image 23.png')} />
                            <View>
                                <Text style={{
                                     fontFamily: "Poppins",
                                     fontWeight: "bold",
                                     color: "black",
                                     letterSpacing: 0.7,
                                     marginLeft:10,
                                     fontSize: 22
                                }}>
                                    Olá User!
                                </Text>
                                <Text style={{
                                      fontFamily: "Poppins",
                                      fontWeight: "bold",
                                      color: "#909090",
                                      letterSpacing: 0.5,
                                      marginLeft:12,
                                      fontSize:14
                                }}>
                                    Contribuinte
                                </Text>
                            </View>

                            <View>

                            </View>
                        </View>

                    </View>
                </View>
            </View>
        </View >


    );
}