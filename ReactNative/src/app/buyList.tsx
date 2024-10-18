import { SafeAreaView, View, Text } from "react-native";
import { IconDrawer, IconMessage } from "../components/Svgs";
import TextBuyList from "../components/BuyList";
import { CheckBox } from "@rneui/base";
import { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";

export default function BuyList() {
    const [checked, setChecked] = useState(Boolean)
    return (
        <SafeAreaView style={{ backgroundColor: "#760BFF", height: "100%", }}>
            <View style={{
                marginTop: 40
            }}>
                <TextBuyList />
            </View>
            <View style={{
                backgroundColor: "white",
                height: "95%",
                marginTop: 50,
                borderRadius: 35
            }}>
                <View className="mt-5 ml-5 w-">
                    <CheckBox
                        title="Leite"
                        checked={checked}
                        checkedColor="#760FFF"
                        onPress={() => setChecked(!checked)}
                    />
                </View>
                <View style={{
                    display: "flex",
                    alignItems: "flex-end",
                }}>
                    <View style={{
                        backgroundColor: "#760BFF", width: 55, borderRadius: 100, height: 55, display: "flex", justifyContent: "center", marginRight: 30, position: "relative", top: "850%"
                    }} >
                        <Text style={{ color: "white", textAlign: "center", fontSize: 30, marginBottom: 2 }}>+</Text>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}