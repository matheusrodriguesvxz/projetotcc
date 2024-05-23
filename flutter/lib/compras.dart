import 'package:flutter/material.dart';

void main() {
  runApp(const Lista());
}

class Lista extends StatelessWidget {
  const Lista({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Compras(),
    );
  }
}
class Compras extends StatefulWidget {
  const Compras({super.key});

  @override
  State<Compras> createState() => _ComprasState();
}

class _ComprasState extends State<Compras> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: Drawer(),
      appBar: AppBar(
    backgroundColor: const Color.fromARGB(255, 135, 26, 154),
        title: Center(child: Padding(
        padding: const EdgeInsets.fromLTRB(0,0,65,0),
        child: Text("EventEasy",
        style: TextStyle(color: Colors.white, fontFamily: "Arial")),),
      ),
    ),
        body: Container(
          child: Column(
                children: [
                  SizedBox(height: 30,),
                  Center(child: Text("LISTA DE COMPRAS", style: TextStyle(fontSize: 20))),
                ],
              ),
          ),

    );
  }
}