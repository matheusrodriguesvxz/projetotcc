import { Icon } from "@rneui/base";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: {
          display: "none", 
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerStyle: {
            opacity: 0,
            display: "none",
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#F0F0F0",
            borderTopColor: "transparent",
            height: 65,
            borderTopWidth: 0, 
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/casa (1) 1.png")}
              style={{
                width: 33,
                height: 33,
                tintColor: focused ? "#760BFF" : "#999",
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="calendarPage"
        options={{
          headerStyle: {
            opacity: 0,
            display: "none",
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#F0F0F0",
            borderTopColor: "transparent",
            height: 65,
            borderTopWidth: 0, 
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/image 3.png")}
              style={{
                width: 33,
                height: 33,
                tintColor: focused ? "#760BFF" : "#999",
              }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="kittyPage"
        options={{
          headerStyle: {
            opacity: 0,
            display: "none",
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#F0F0F0",
            borderTopColor: "transparent",
            height: 65,
            borderTopWidth: 0, 
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/image 4.png")}
              style={{
                width: 33,
                height: 33,
                tintColor: focused ? "#760BFF" : "#999",
              }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profilePage"
        options={{
          headerStyle: {
            opacity: 0,
            display: "none",
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#F0F0F0",
            borderTopColor: "transparent",
            height: 65,
            borderTopWidth: 0, 
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/image 2.png")}
              style={{
                width: 33,
                height: 33,
                tintColor: focused ? "#760BFF" : "#999",
              }}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
