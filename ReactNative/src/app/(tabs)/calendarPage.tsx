import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import type React from "react";
import { useState } from "react";
import day from "react-native-calendars/src/calendar/day";

export const Header = () => null;

export default function CalendarPage() {
  const [selected, setSelected] = useState("");

  return (
    <SafeAreaView style={style.areaRoxa}>
      <View style={style.areaBranca}>
        <Calendar
          style={style.calendario}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#f1f1f1",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#760BFF",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#760BFF",
            dayTextColor: "#2d4150",
            textDisabledColor: "gray",
            arrowColor: "#760BFF",
          }}
          onDayPress={(day: { dateString: React.SetStateAction<string> }) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  calendario: {
    borderWidth: 1,
    borderColor: "#F1F1F1",
    height: 350,
    borderRadius: 28,
  },

  areaRoxa: {
    backgroundColor: "#760BFF",
    height: "100%",
  },

  areaBranca: {
    backgroundColor: "white",
    height: "100%",
    marginTop: 20,
    borderRadius: 35,
  },
});
