import { useFonts } from "expo-font";
import * as Svg from "react-native-svg";
import {
	View,
	Image,
	StyleSheet,
	Pressable,
	Text,
	TouchableOpacity,
	TextInput,
} from "react-native";
import { router, type Href, type Router } from "expo-router";
import { BackgroundPurple } from "../Svgs";

export default function FundoDaTela() {
	const [loaded, arial] = useFonts({
		PoppinsBold: require("../../../assets/fonts/Poppins-Bold.ttf"),
	});
	return (
		<View style={{ backgroundColor: "white" }}>
			<BackgroundPurple />
		</View>
	);
}
interface RouterRequest {
	rota: Href;
}

export function ButaoRegistro() {
	return (
		<TouchableOpacity style={style.butaoRegistro}>
			<Text style={style.TextobutaoRegistro}>Cadastrar-Se</Text>
		</TouchableOpacity>
	);
}

const style = StyleSheet.create({
	butao: {
		justifyContent: "center",
		position: "relative",
		top: 130,
		left: 20,
		width: 218,
		paddingVertical: 12,
		backgroundColor: "black",
		paddingHorizontal: 3,
		borderRadius: 20,
	},
	butaoRegistro: {
		justifyContent: "center",
		position: "relative",
		top: 320,
		left: 80,
		width: 218,
		paddingVertical: 12,
		backgroundColor: "#760bFF",
		paddingHorizontal: 3,
		borderRadius: 20,
		marginBottom: 30,
	},
	TextobutaoRegistro: {
		fontFamily: "Poppins",
		color: "white",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
		letterSpacing: 1,
	},
});

// export function TextsInput() {
//   return <TextInput
//   className="mt-8 border-1 border-b-4 py-2 w-[315] border-purple-800"
//   onChangeText={setName}
//   value={name}
//   placeholder="Nome completo"
//   placeholderTextColor="#909090"
//   style={{
//     fontFamily: 'Poppins',
//     fontWeight: 'bold',
//     color: '#000000',
//     letterSpacing: 0.5,
//     marginTop: 25,
//     fontSize: 16,
//     borderColor: '#760bFF',
//   }}
// />
// }
