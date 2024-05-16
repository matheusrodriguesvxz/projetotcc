import 'package:flutter/material.dart';

void main() {
  runApp(const Cadastro());
}

class Cadastro extends StatelessWidget {
  const Cadastro({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Cadastrar(),
    );
  }
}

class Cadastrar extends StatefulWidget {
  const Cadastrar({super.key});

  @override
  State<Cadastrar> createState() => _CadastrarState();
}

class _CadastrarState extends State<Cadastrar> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Center(child: Text("EventEasy",
      style: TextStyle(color: Colors.white, fontFamily: "Arial"))),
      backgroundColor: Color.fromARGB(255, 135, 26, 154),),
      body: Column(
        children: <Widget>[
          TextField(decoration: InputDecoration(labelText: "Nome"),),
          TextField(decoration: InputDecoration(labelText: "Sobrenome"),),
          TextField(decoration: InputDecoration(labelText: "E-mail"),),
          TextField(decoration: InputDecoration(labelText: "Senha"),),
          TextField(decoration: InputDecoration(labelText: "Confirmar Senha"),),
          SizedBox(height: 20,),
          ElevatedButton(onPressed: (){}, child: Text("Enviar"), style: ButtonStyle(),),
        ],
      ),
    
    );
  }
}