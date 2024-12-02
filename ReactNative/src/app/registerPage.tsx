import { Image, View, Text, StyleSheet, Alert } from "react-native";
import { useFonts } from "expo-font";
import { CheckBox } from "@rneui/themed";
import { useState } from "react";
import {
  ButaoRegistro,
  ResetInputs,
  TitleRegister,
} from "../components/RegisterPage/RegisterPageComp";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { Logo } from "../components/Svgs";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { router } from "expo-router";

type NewRegisterFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export default function RegisterPage() {
  const [loaded] = useFonts({
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewRegisterFormData>();
  const [checked, setChecked] = useState(false);

  const password = watch("password");

  const submitDataToFirestore = async (data: NewRegisterFormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      console.log("Usuário registrado com sucesso:", user);

      await addDoc(collection(db, "Usuários"), {
        uid: user.uid,
        nome: data.name,
        email: data.email,
      });

      console.log("Usuário adicionado com sucesso!");
      console.log("Usuário:", user.uid);
      router.replace("/login");
    } catch (error) {
      Alert.alert(
        "Erro ao registrar usuário",
        "Verifique os dados e tente novamente"
      );
      console.error("Erro ao registrar usuário:", error);
    }
  };

  const onSubmit: SubmitHandler<NewRegisterFormData> = (data) => {
    if (!checked) {
      Alert.alert("Aceite os termos para continuar");
    } else {
      submitDataToFirestore(data);
    }
  };
  return (
    <View className="h-full bg-white flex-1">
      <Image
        source={require("../../assets/purplebg.png")}
        className="h-100 w-[450] z-index -1 right-[7] bottom-1"
      />
      <View className="w-full h-52 absolute items-center mt-28">
        <Logo />
      </View>
      <View className="bg-white rounded-[80] h-[80] top-[-50] w-full p-9">
        <View className="absolute left-11 top-14">
          <TitleRegister />
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Nome é obrigatório",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ResetInputs
                placeholder="Nome completo"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name && (
            <Text style={styles.error}>{errors.name.message}</Text>
          )}

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
              <ResetInputs
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
                value: 8,
                message: "A senha deve ter no mínimo 8 caracteres",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ResetInputs
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

          <Controller
            control={control}
            name="passwordConfirmation"
            rules={{
              required: "Confirme sua senha",
              validate: (value) =>
                value === password || "As senhas não coincidem",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ResetInputs
                placeholder="Confirme sua senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />
          {errors.passwordConfirmation && (
            <Text style={styles.error}>
              {errors.passwordConfirmation.message}
            </Text>
          )}

          <CheckBox
            className="w-96 right-5"
            title="Eu li e Aceito os Termos de Serviços e a Politica de Privacidade"
            checked={checked}
            checkedColor="#760FFF"
            onPress={() => setChecked(!checked)}
          />
        </View>
      </View>
      <ButaoRegistro onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginBottom: 8,
    fontFamily: "Poppins",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
