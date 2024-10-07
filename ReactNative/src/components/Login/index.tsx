import {
  Image,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

export function ButaoLogar({ ...rest }) {
  return (
    <TouchableOpacity {...rest} style={style.butaoLogar}>
      <Text style={style.TextobutaoLogar}>Entrar</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  butaoLogar: {
    justifyContent: "center",
    position: "relative",
    top: 0,
    left: 0,
    width: 218,
    paddingVertical: 12,
    backgroundColor: "#000000",
    paddingHorizontal: 3,
    borderRadius: 20,
    marginBottom: 30,
  },
  TextobutaoLogar: {
    fontFamily: "Poppins",
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export function VamosComecarText({ ...rest }) {
  return (
    <Text
      {...rest}
      className=""
      style={{
        fontSize: 25,
        fontFamily: "Poppins",
        fontWeight: "bold",
        color: "#000000",
        letterSpacing: 0.5,
        marginTop: -30,
      }}
    >
      Vamos Começar!
    </Text>
  );
}

export function EntreNaSuaConta({ ...rest }) {
  return (
    <Text
      {...rest}
      style={{
        fontSize: 15,
        fontFamily: "Poppins",
        fontWeight: "bold",
        color: "#B0B0B0",
        letterSpacing: 0.5,
        marginTop: 10,
      }}
    >
      {" "}
      Entre em sua conta para continuar
    </Text>
  );
}

export function LoginInputs({ ...rest }) {
  return (
    <TextInput
      {...rest}
      className="mt-8 border-1 border-b-4  py-2 w-[315]  ml-6 border-purple-800"
      placeholderTextColor="#909090"
      style={{
        fontFamily: "Poppins",
        fontWeight: "bold",
        color: "#000000",
        letterSpacing: 0.5,
        marginTop: 25,
        fontSize: 16,
        borderColor: "#760BFF",
      }}
    />
  );
}

export function ForgotPassword({ ...rest }) {
  return (
    <Pressable>
      <Text
        className=""
        style={{
          fontFamily: "Poppins",
          color: "#B0B0B0",
          fontWeight: "bold",
        }}
      >
        Esqueceu sua Senha? Clique aqui para Redefinir
      </Text>
    </Pressable>
  );
}

export function AppleAccount({ ...rest }) {
  return (
    <Pressable {...rest}>
      <Image
        style={{ width: 50, height: 50 }}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/128/0/747.png",
        }}
      />
    </Pressable>
  );
}
export function GoogleAccount({ ...rest }) {
  return (
    <Pressable {...rest}>
      <Image
        style={{ width: 48, height: 48 }}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/128/2875/2875404.png",
        }}
      />
    </Pressable>
  );
}
export function FaceAccount({ ...rest }) {
  return (
    <Pressable {...rest}>
      <Image
        style={{ width: 48, height: 48 }}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/128/733/733547.png",
        }}
      />
    </Pressable>
  );
}
