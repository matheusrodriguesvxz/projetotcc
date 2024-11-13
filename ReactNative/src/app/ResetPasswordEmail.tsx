import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { RoxoPasswordReset, VoltarButton } from "../components/Svgs";
import { Image, Text } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { ResetInputs } from "../components/RegisterPage/RegisterPageComp";
import { ButaoRedefinirSenhaEmail } from "../components/ResetPasswordEmailComp/ResetPasswordEmailCompIndex";
import { router } from "expo-router";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

type NewRegisterFormData = {
  email: string;
};


   async function submitEmailToResetPassword(data: NewRegisterFormData) {
        const email = data.email;
        await sendPasswordResetEmail(auth, email).then(() => {
         // biome-ignore lint/style/useTemplate: <explanation>
         alert("Email de redefinição de senha enviado para" + email);
         router.replace('/login')
        }).catch((error) => {
            // biome-ignore lint/style/useTemplate: <explanation>
            alert("Erro ao enviar email de redefinição de senha" + error);
        });

    }
    const onSubmit: SubmitHandler<NewRegisterFormData> = (data) => {
        submitEmailToResetPassword(data);
        }
export default function ResetPasswordEmail() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRegisterFormData>();
  const [checked, setChecked] = useState(false);

  return (
    <View>
      <Image
        className="mt-[-30]  absolute w-[500] "
        source={require("../../assets/purplebg.png")}
      />
      <RoxoPasswordReset />
      <View className="absolute mt-[290]">
        <TouchableOpacity
          onPress={() => {
            router.push("../index");
          }}
        >
          <EvilIcons name="chevron-left" color={"black"} size={70} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={style.Textobutao}>Redefinir senha</Text>
      </View>
      <View className="items-center mt-[20]">
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Nome é obrigatório",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <ResetInputs
              placeholder="Insira um email para reuperação"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text style={style.error}>{errors.email.message}</Text>
        )}
      </View>
      <View className="items-center mt-[160] mr-[50]">
        <ButaoRedefinirSenhaEmail onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  Textobutao: {
    fontFamily: "Poppins",
    color: "#760bff",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 305,
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontFamily: "Poppins",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
