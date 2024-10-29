import { SafeAreaView, Text, Image, View } from "react-native";
import EditButton, { ImageInicialPage } from "../components/Svgs";
import { Icon } from "@rneui/base";



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

                    <View className="">

                        <View className="ml-4 flex flex-row ">
                            <Image source={require('../../assets/image 23.png')} />
                            <View>
                                <Text style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "bold",
                                    color: "black",
                                    letterSpacing: 0.7,
                                    marginLeft: 10,
                                    fontSize: 22
                                }}>
                                    Olá User!
                                </Text>
                                <Text style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "bold",
                                    color: "#909090",
                                    letterSpacing: 0.5,
                                    marginLeft: 12,
                                    fontSize: 14
                                }}>
                                    Contribuinte
                                </Text>
                            </View>

                            <View className="ml-28 justify-center mb-4">
                                <EditButton />
                            </View>
                        </View>

                    </View>
                </View>
            </View>
            <View className="relative bottom-4">
                <Text style={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "black",
                    letterSpacing: 0.5,
                    marginLeft: 40,
                    position: 'relative',
                    bottom: 30,
                    fontSize: 24
                }}>Conta</Text>

                <View className="items-center">

                    <View className="w-96 " style={{
                        backgroundColor: "#D9D9D9",
                        height: 30,
                        borderRadius: 35,
                        position: 'relative',
                        bottom: 20,
                        marginBottom:15,
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            color: "gray",
                            letterSpacing: 0.5,
                            marginLeft: 32,
                            fontSize: 16
                        }} className="pb-3">Detalhes da Conta</Text>
                    </View>

                    <View className="w-96 " style={{
                        backgroundColor: "#D9D9D9",
                        height: 30,
                        borderRadius: 35,
                        position: 'relative',
                        bottom: 20,
                        marginBottom:15,
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            color: "gray",
                            letterSpacing: 0.5,
                            marginLeft: 32,
                            fontSize: 16
                        }} className="pb-3"></Text>
                    </View>
                    <View className="w-96 " style={{
                        backgroundColor: "#D9D9D9",
                        height: 30,
                        borderRadius: 35,
                        position: 'relative',
                        bottom: 20,
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            color: "gray",
                            letterSpacing: 0.5,
                            marginLeft: 32,
                            fontSize: 16
                        }} className="pb-3"></Text>
                    </View>
                </View>

                <View>

                <Text style={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "black",
                    letterSpacing: 0.5,
                    marginLeft: 40,
                    position: 'relative',
                    top: 5,
                    fontSize: 24
                }}>Notificações</Text>
                <View className="items-center mt-10">
                <View className="w-96 " style={{
                        backgroundColor: "#D9D9D9",
                        height: 30,
                        borderRadius: 35,
                        position: 'relative',
                        bottom: 20,
                        marginBottom:15,
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            color: "gray",
                            letterSpacing: 0.5,
                            marginLeft: 32,
                            fontSize: 16
                        }} className="pb-3"></Text>
                    </View>
                <View className="w-96 " style={{
                        backgroundColor: "#D9D9D9",
                        height: 30,
                        borderRadius: 35,
                        position: 'relative',
                        bottom: 20,
                        marginBottom:15,
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            color: "gray",
                            letterSpacing: 0.5,
                            marginLeft: 32,
                            fontSize: 16
                        }} className="pb-3"></Text>
                    </View>
                <View className="w-96 " style={{
                        backgroundColor: "#D9D9D9",
                        height: 30,
                        borderRadius: 35,
                        position: 'relative',
                        bottom: 20,
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            color: "gray",
                            letterSpacing: 0.5,
                            marginLeft: 32,
                            fontSize: 16
                        }} className="pb-3"></Text>
                    </View>
                </View>
                </View>

                <View>

                <Text style={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "black",
                    letterSpacing: 0.5,
                    marginLeft: 40,
                    position: 'relative',
                    top: 5,
                    fontSize: 24
                }}>Outros</Text>
                <View className="items-center mt-10">
                <View className="w-96 " style={{
                        backgroundColor: "#D9D9D9",
                        height: 30,
                        borderRadius: 35,
                        position: 'relative',
                        bottom: 20,
                        marginBottom:15,
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            color: "gray",
                            letterSpacing: 0.5,
                            marginLeft: 32,
                            fontSize: 16
                        }} className="pb-3"></Text>
                    </View>
                <View className="w-96 " style={{
                        backgroundColor: "#D9D9D9",
                        height: 30,
                        borderRadius: 35,
                        position: 'relative',
                        bottom: 20,
                        marginBottom:15,
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            color: "gray",
                            letterSpacing: 0.5,
                            marginLeft: 32,
                            fontSize: 16
                        }} className="pb-3"></Text>
                    </View>
                <View className="w-96 " style={{
                        backgroundColor: "#D9D9D9",
                        height: 30,
                        borderRadius: 35,
                        position: 'relative',
                        bottom: 20,
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            color: "gray",
                            letterSpacing: 0.5,
                            marginLeft: 32,
                            fontSize: 16
                        }} className="pb-3"></Text>
                    </View>
                </View>
                </View>
            </View>
        </View >


    );
}