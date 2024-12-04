import { View, Text } from "react-native";
import { GreyAiPage } from "../Svgs";

export function GreyContainerAiPage(){
    return(
    
        <View
            style={{
                marginLeft: "10",
                marginTop: 35,
                width: 189,
                height: 100,
                borderRadius: 28,
                backgroundColor: "#505050",
            }}>
            <Text
            className=""
                style={{
                    paddingTop: "16",
                    marginLeft: "18",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    letterSpacing: 1.1,
                    color: "#ffffff",
                    fontSize: 12
                }}>
            I.A
            </Text>
            <Text
                style={{
                    paddingTop: "3",
                    marginLeft: "18",
                    fontFamily: "Poppins",
                    fontWeight: "medium",
                    color: "#969696",
                    fontSize: 12
                }}>
            Crie uma lista de compras com sitema integrado com I.A
            </Text>
        </View>
           
    );
}
export function GreyContainerAiPage2(){
    return(
    
        <View
            style={{
                marginTop: 35,
                width: 166,
                height: 100,
                borderRadius: 28,
                backgroundColor: "#505050",
            }}>
            <Text
            className=""
                style={{
                    paddingTop: "16",
                    marginLeft: "18",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    letterSpacing: 1.1,
                    color: "#ffffff",
                    fontSize: 12
                }}>
            Preços
            </Text>
            <Text
                style={{
                    paddingTop: "3",
                    marginLeft: "18",
                    fontFamily: "Poppins",
                    fontWeight: "medium",
                    color: "#969696",
                    fontSize: 12
                }}>
            Quantias e preços atualizados via I.A
            </Text>
        </View>
           
    );
}