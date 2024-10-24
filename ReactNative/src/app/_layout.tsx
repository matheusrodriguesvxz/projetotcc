import { Stack } from "expo-router";
import "../style/global.css"
import { GuestsServices } from "../service/GuestsServices";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"  options={{headerShown:false}}/>
      <Stack.Screen name="homePage" options={{headerShown:false}}/>
      <Stack.Screen name="registerPage" options={{headerShown:false}}/>
      <Stack.Screen name="login" options={{headerShown:false}}/>
      <Stack.Screen name="playlistPage" options={{headerShown:false}}/>
      <Stack.Screen name="buyList" options={{headerShown:false}}/>
      <Stack.Screen name="resetPasswordPage" options={{headerShown:false}}/>
      <Stack.Screen name="profilePage" options={{headerShown: false}}/>
    </Stack>
  );

}
