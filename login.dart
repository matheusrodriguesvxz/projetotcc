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
      /*appBar: AppBar(title: Center(child: Text("Bem vindo ao EventEasy!",
      style: TextStyle(color: Colors.white, fontFamily: "Arial", fontSize: 45))),
      backgroundColor: Color.fromARGB(255, 135, 26, 154),),*/
      body:

      Container(
        color: Color.fromARGB(255, 215, 131, 236),
        child: Column(
          children: <Widget>[
            Icon(Icons.supervised_user_circle, size: 100,),
            SizedBox(height: 30),
            Text("Bem Vindo ao EventEasy!", style: TextStyle(fontSize: 30),),
            SizedBox(height: 30,),
            TextField(decoration: InputDecoration(labelText: "E-mail"),),
            TextField(decoration: InputDecoration(labelText: "Senha"),obscureText: true,),
            SizedBox(height: 30,),
            ElevatedButton(onPressed: (){}, child: Text("Login"), style: ButtonStyle(),),
            SizedBox(height: 15,),
            GestureDetector(child: Text("Esqueci minha senha"),),
            SizedBox(height: 30,),
            Text("Ainda não é um membro? Clique no botão e se cadastre."),
            SizedBox(height: 15,),
            ElevatedButton(onPressed: (){}, child: Text("Cadastre-se"), style: ButtonStyle(),)
          ],
        ),
      ),
    
    );
  }
}