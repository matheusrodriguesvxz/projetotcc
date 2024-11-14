import { View, Text } from "react-native";
import { SafeAreaView } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import React, { useState } from "react";
//import day from "react-native-calendars/src/calendar/day";



export default function CalendarPage() {
    
    LocaleConfig.locales['pt'] = {
        monthNames: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro'
        ],
        monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
        dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
        today: 'Hoje'
    };
    LocaleConfig.defaultLocale = 'pt';
    const [selected, setSelected] = useState('');


    return (
        <SafeAreaView style={{ backgroundColor: "#760BFF", height: "100%", }}>
            <View style={{
                marginTop: 10
            }}
            ></View>

            <View style={{
                backgroundColor: "white",
                height: "1000%",
                marginTop: 20,
                borderRadius: 35
            }}>

                <Calendar
                
                    style={{
                        borderWidth: 1,
                        borderColor: '#F1F1F1',
                        height: 350,
                        borderRadius:28,
                    }}

                    theme={{
                        LocaleConfig:'pt',
                        backgroundColor: '#ffffff',
                        calendarBackground: '#f1f1f1',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#760BFF',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#760BFF',
                        dayTextColor: '#2d4150',
                        textDisabledColor: 'gray',
                        arrowColor: '#760BFF',

                    }}

                    onDayPress={(day: { dateString: React.SetStateAction<string>; }) => {
                        setSelected(day.dateString);
                    }}
                    markedDates={{
                        [selected]: { selected: true, disableTouchEvent: true }
                    }}

                    

                />
                
            </View>
            <Text> Gerencie seus Planos </Text>
            

        </SafeAreaView>
    )






}