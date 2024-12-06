import {
  View,
  Text,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useForm, Controller } from "react-hook-form";
import {
  AppleAccount,
  ButaoLogar,
  EntreNaSuaConta,
  FaceAccount,
  ForgotPassword,
  GoogleAccount,
  LoginInputs,
  VamosComecarText,
} from "../components/Login";
import { router } from "expo-router";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Logo, RoxoLogin } from "../components/Svgs";
import React from "react";

type NewLoginFormData = {
  email: string;
  password: string;
};

const onSubmit = async (data: NewLoginFormData) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;
    console.log("Usuário logado com sucesso:", user.uid);
    AsyncStorage.setItem("user", user.uid);
    router.push("/(tabs)");
    await AsyncStorage.setItem(
      "userLogin",
      JSON.stringify({
        uid: user.uid,
        email: user.email,
      })
    );
  } catch (error) {
    Alert.alert(
      "Erro ao logar",
      "Verifique se o e-mail e a senha estão corretos"
    );
  }
};

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewLoginFormData>();
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  return (
    <KeyboardAwareScrollView enableOnAndroid={true} style={{ flex: 1
    }}>

          <View style={{ }}>
            <View className="bg-white">
              <View className=" w-full">
                <RoxoLogin />
              </View>
              <View className="h-[50%] w-full justify-center items-center mt-3">
                <Logo />
              </View>
              <View className="flex w-[300] mt-16 ml-6">
                <VamosComecarText />
                <EntreNaSuaConta />
              </View>

              <Controller
                control={control}
                name="email"
                rules={{
                  required: "E-mail é obrigatório",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Digite um e-mail válido",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <LoginInputs
                    placeholder="E-mail"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.error}>{errors.email.message}</Text>
              )}

              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter no mínimo 8 caracteres",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <LoginInputs
                    placeholder="Senha"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
              )}
            </View>
            <View className="h-[50%] w-full items-center mt60]">
              <ButaoLogar onPress={handleSubmit(onSubmit)} />
              <ForgotPassword />
              <View className="justify-center items-center flex ">
                <Pressable className=" flex-row gap-20 mt-6 items-center">
                  <View>
                    <AppleAccount />
                  </View>
                  <View>
                    <GoogleAccount />
                  </View>
                  <View>
                    <FaceAccount />
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginBottom: 8,
    textAlign: "left",
    marginLeft: 20,
    fontFamily: "Poppins",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
