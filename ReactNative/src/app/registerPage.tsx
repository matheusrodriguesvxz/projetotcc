import React from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import { CheckBox } from "@rneui/themed";
import { Controller, useForm,type SubmitHandler } from "react-hook-form";
import { Logo } from "../components/Svgs";
import { ButaoRegistro } from "../components/RegisterPage/RegisterPageComp";

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  terms: boolean;
};

export default function RegisterPage() {
  const [loaded] = useFonts({
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitted },
    getValues,
    register,
  } = useForm<FormData>();

  // Função chamada ao submeter o formulário
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Validação da confirmação da senha
    if (data.password !== data.passwordConfirmation) {
      setError("passwordConfirmation", {
        type: "manual",
        message: "As senhas não coincidem.",
      });
      return;
    }

    // Validação dos termos de serviço
    if (!data.terms) {
      setError("terms", {
        type: "manual",
        message: "Você deve aceitar os termos.",
      });
      return;
    }

    // Se não houver erros, exibe os dados no console
    console.log("Formulário enviado:", data);
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
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              color: "#760FFF",
              letterSpacing: 0.5,
              marginTop: 5,
              fontSize: 23,
            }}
          >
            Criar Conta
          </Text>

          {/* Campo Nome */}
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Nome obrigatório.",
              pattern: {
                value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                message: "Nome inválido",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  className="mt-8 border-1 border-b-4 py-2 w-[315] border-purple-800"
                  onChangeText={onChange}
                  value={value}
                  placeholder="Nome completo"
                  placeholderTextColor="#909090"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "#000000",
                    letterSpacing: 0.5,
                    marginTop: 25,
                    fontSize: 16,
                    borderColor: "#760bFF",
                  }}
                />
                {/* Exibir erro apenas após o envio */}
                {isSubmitted && errors.name && (
                  <Text style={{
                    color: "red",
                    marginTop: 3,
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    letterSpacing: 0.7,
                    fontSize: 14,
                  }}>
                    {errors.name.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Campo E-mail */}
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email obrigatório.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email inválido",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  className="mt-8 border-1 border-b-4 py-2 w-[315] border-purple-800"
                  onChangeText={onChange}
                  value={value}
                  placeholder="E-mail"
                  placeholderTextColor="#909090"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "#000000",
                    letterSpacing: 0.5,
                    marginTop: 25,
                    fontSize: 16,
                    borderColor: "#760bFF",
                  }}
                />
                {/* Exibir erro apenas após o envio */}
                {isSubmitted && errors.email && (
                  <Text style={{
                    color: "red",
                    marginTop: 3,
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    letterSpacing: 0.7,
                    fontSize: 14,
                  }}>
                    {errors.email.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Campo Senha */}
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Senha obrigatória.",
              minLength: {
                value: 8,
                message: "A senha deve ter pelo menos 8 caracteres.",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  className="mt-8 border-1 border-b-4 py-2 w-[315] border-purple-800"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  placeholder="Senha"
                  placeholderTextColor="#909090"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "#000000",
                    letterSpacing: 0.5,
                    marginTop: 25,
                    fontSize: 16,
                    borderColor: "#760bFF",
                  }}
                />
                {/* Exibir erro apenas após o envio */}
                {isSubmitted && errors.password && (
                  <Text style={{
                    color: "red",
                    marginTop: 3,
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    letterSpacing: 0.7,
                    fontSize: 14,
                  }}>
                    {errors.password.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Confirmação de Senha */}
          <Controller
            control={control}
            name="passwordConfirmation"
            rules={{
              required: "Confirme sua senha.",
            }}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  className="mt-8 border-1 border-b-4 py-2 w-[315] border-purple-800"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  placeholder="Confirme sua senha"
                  placeholderTextColor="#909090"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "#000000",
                    letterSpacing: 0.5,
                    marginTop: 25,
                    fontSize: 16,
                    borderColor: "#760bFF",
                  }}
                />
                {/* Exibir erro apenas após o envio */}
                {isSubmitted && errors.passwordConfirmation && (
                  <Text style={{
                    color: "red",
                    marginTop: 3,
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    letterSpacing: 0.7,
                    fontSize: 14,
                  }}>
                    {errors.passwordConfirmation.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Checkbox de Termos */}
          <CheckBox
            className="w-96 right-5"
            title="Eu li e Aceito os Termos de Serviços e a Politica de Privacidade"
            {...register("terms", { required: "Você deve aceitar os termos." })}
            checked={getValues("terms")}
            checkedColor="#760FFF"
          />
          {/* Exibir erro apenas após o envio */}
          {isSubmitted && errors.terms && (
            <Text style={{
              color: "red",
              marginTop: 3,
              fontFamily: "Poppins",
              fontWeight: "bold",
              letterSpacing: 0.7,
              fontSize: 14,
            }}>
              {errors.terms.message}
            </Text>
          )}
        </View>
      </View>

      <Pressable onPress={handleSubmit(onSubmit)}>
        <ButaoRegistro />
      </Pressable>
    </View>
  );
}
