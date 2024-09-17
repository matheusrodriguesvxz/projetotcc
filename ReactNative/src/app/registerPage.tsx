import { Image, View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { CheckBox } from "@rneui/themed";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  ButaoRegistro,
  RegisterInputs,
  TitleRegister,
} from "../components/RegisterPage/RegisterPageComp";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { Logo } from "../components/Svgs";
import { db } from "../services/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

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

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const password = watch("password");

  const submitDataToFirestore = async (data: NewRegisterFormData) => {
    try {
      const docRef = await addDoc(collection(db, "Usuários"), {
        nome: data.name,
        email: data.email,
        senha: data.password,
      });
      console.log("Documento: ", docRef.id);
    } catch (e) {
      console.error("Erro:", e);
    }
  };

  const onSubmit: SubmitHandler<NewRegisterFormData> = (data) => {
    submitDataToFirestore(data); 
  };
  return (
    <View className="h-full bg-white">
      <Image
        source={require("../../assets/purplebg.png")}
        className="h-100 w-100 z-index -1 right-[7] bottom-1"
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
            rules={{ required: "Nome é obrigatório" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <RegisterInputs
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
              <RegisterInputs
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
                message: "A senha deve ter no mínimo 6 caracteres",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <RegisterInputs
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
              <RegisterInputs
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
      <ButaoRegistro onPress={() => handleSubmit(onSubmit)()} />
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
