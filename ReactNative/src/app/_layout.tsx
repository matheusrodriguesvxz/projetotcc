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
        <Tabs.Screen name="playlistPage" options={{ headerShown: false }} />
        <Tabs.Screen name="buyList" options={{ headerShown: false }} />
        <Tabs.Screen name="resetPasswordEmail" options={{ headerShown: false }}/>
        <Tabs.Screen name="planPageType" options={{ headerShown: false }}/>
        <Tabs.Screen name="planPageMarried" options={{ headerShown: false }}/>
      </Stack>
    </>
  );
}
