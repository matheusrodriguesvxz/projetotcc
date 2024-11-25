import { Stack } from "expo-router";
import "../style/global.css";
import { GuestsServices } from "../service/GuestsServices";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false, animation:"fade_from_bottom"}}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            animation: "fade_from_bottom",
            animationMatchesGesture: true,
            animationDuration: 500,
          }}
        />
        <Stack.Screen
          name="registerPage"
          options={{
            headerShown: false,
            animation: "fade_from_bottom",
            animationMatchesGesture: true,
            animationDuration: 500,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            animation: "fade",
            animationMatchesGesture: true,
          }}
        />
        <Stack.Screen name="playlistPage" options={{ headerShown: false }} />
        <Stack.Screen name="buyList" options={{ headerShown: false }} />
        <Stack.Screen
          name="resetPasswordEmail"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="planPageType" options={{ headerShown: false }} />
        <Stack.Screen name="planPageMarried" options={{ headerShown: false }} />
        <Stack.Screen name="planPageGuests" options={{ headerShown: false }} />
        <Stack.Screen name="planPageAdress" options={{ headerShown: false }} />
        <Stack.Screen name="planPageFinish" options={{ headerShown: false }} />
        <Stack.Screen name="detailsEvent" options={{ headerShown: false }} />
        <Stack.Screen name="guestsPage" options={{ headerShown: false }} />
        <Stack.Screen name="bugdetPage" options={{ headerShown: false }} />
        <Stack.Screen
          name="detailsFestivais"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="test"
          options={{
            headerShown: false,
            animation: "fade_from_bottom",
            animationMatchesGesture: true,
            animationDuration: 500,
          }}
        />
      </Stack>
    </>
  );
}
