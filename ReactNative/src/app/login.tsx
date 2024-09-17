import { SafeAreaView } from 'react-native-safe-area-context'
import { Logo, RoxoLogin } from '../components/Svgs'
import { View, Text, TextInput } from 'react-native'
import { useFonts } from 'expo-font'

export default function LoginPage() {
  const [loaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Bold.ttf'),
  })
  return (
    <View className="bg-white ">
      <View className="bg-black">
        <RoxoLogin />
      </View>
      <View className="h-[50%] w-full justify-center items-center mt-3">
        <Logo />
      </View>
      <View className="flex relative w-[300] mt-9 ml-6">
        <Text
          className=""
          style={{
            fontSize: 25,
            fontFamily: 'Poppins',
            fontWeight: 'bold',
            color: '#000000',
            letterSpacing: 0.5,
            marginTop: 5,
          }}
        >
          Vamos Começar!
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'Poppins',
            fontWeight: 'bold',
            color: '#B0B0B0',
            letterSpacing: 0.5,
            marginTop: 5,
          }}
        >
          {' '}
          Entre em sua conta para continuar
        </Text>
      </View>

      <TextInput
        className="mt-8 border-1 border-b-4  py-2 w-[315]  ml-6 border-purple-800"
        placeholder="Usuario"
        placeholderTextColor="#909090"
        style={{
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          color: '#760BFF',
          letterSpacing: 0.5,
          marginTop: 25,
          fontSize: 16,
          borderColor: '#760BFF',
        }}
      />
    </View>
  )
}
