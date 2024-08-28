import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';

void main() {
  runApp(Calendario());
}

class Calendario extends StatelessWidget {
  const Calendario({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: CalendarioState(),
    );
  }
}

class CalendarioState extends StatefulWidget {
  const CalendarioState({super.key});

  @override
  State<CalendarioState> createState() => _CalendarioState();
}

class _CalendarioState extends State<CalendarioState> {
  CalendarFormat _calendarFormat = CalendarFormat.month;
  DateTime today = DateTime.now();

  void onDaySelected(DateTime day, DateTime focusedDay) {
    setState(() {
      today = day;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Center(child: Text("CALENDÁRIO")),
        backgroundColor: Color(0xff33007e),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none_rounded),
            onPressed: () {},
          ),
        ],
        iconTheme: const IconThemeData(
          color: Colors.white,
        ),
        toolbarHeight: 80,
        centerTitle: true,
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              decoration: BoxDecoration(
                color: Color(0xff33007e),
              ),
              child: Text(
                'EventEasy',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                ),
              ),
            ),
            ListTile(
              leading: Icon(Icons.assignment_outlined),
              title: Text('Meus Planejamentos'),
            ),
            ListTile(
              leading: Icon(Icons.account_circle_outlined),
              title: Text('Minha Conta'),
            ),
            ListTile(
              leading: Icon(Icons.settings),
              title: Text('Configurações'),
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          TableCalendar(
            rowHeight: 43,
            firstDay: DateTime.utc(2024, 1, 1),
            lastDay: DateTime.utc(2030, 12, 31),
            focusedDay: today,
            selectedDayPredicate: (day) => isSameDay(day, today),
            onDaySelected: (selectedDay, focusedDay) {
              setState(() {
                today = selectedDay;
              });
            },
            calendarFormat: _calendarFormat,
            onFormatChanged: (format) {
              setState(() {
                _calendarFormat = format;
              });
            },
          ),
        ],
      ),
    );
  }
}
