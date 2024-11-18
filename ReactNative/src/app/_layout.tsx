import { Stack } from "expo-router";
import "../style/global.css";
import { GuestsServices } from "../service/GuestsServices";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="registerPage" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="playlistPage" options={{ headerShown: false }} />
        <Stack.Screen name="buyList" options={{ headerShown: false }} />
        <Stack.Screen name="resetPasswordEmail" options={{ headerShown: false }}/>
        <Stack.Screen name="planPageType" options={{ headerShown: false }}/>
        <Stack.Screen name="planPageMarried" options={{ headerShown: false }}/>
        <Stack.Screen name="planPageGuests" options={{ headerShown: false }}/>
        <Stack.Screen name="planPageAdress" options={{ headerShown: false }}/>
        <Stack.Screen name="planPageFinish" options={{ headerShown: false }}/>
        <Stack.Screen name="detailsEvent" options={{ headerShown: false }}/>
      </Stack>
    </>
  );
}
