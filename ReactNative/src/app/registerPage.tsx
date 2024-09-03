import { ImageBackground, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logo} from "../components/Svgs";

export default function RegisterPage(){
    return (
        <SafeAreaView>
            <View>
                <Image source={require("../../assets/purplebg ")} className="h-100 w-100"/>
                <View className="mt-40 items-center flex">
                    <Logo/>
                </View>
            </View>
            
        </SafeAreaView>
    );
}