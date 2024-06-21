import 'package:flutter/material.dart';
import 'cadastro.dart';
import 'inicio.dart';

void main() {
  runApp(const LoginPage());
}

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Login(),
    );
  }
}

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(

      /*appBar: AppBar(title: Center(child: Text("Bem vindo ao EventEasy!",
      style: TextStyle(color: Colors.white, fontFamily: "Arial", fontSize: 45))),
      backgroundColor: Color.fromARGB(255, 135, 26, 154),),*/
      
      body:

      Container(
        color: Color.fromARGB(255, 255, 255, 255),
        
        child: Column(
          children: <Widget>[
            
            Icon(Icons.supervised_user_circle, size: 100, color: Color(0xff33007e),),
            SizedBox(height: 30),
            Text("Bem Vindo ao EventEasy!", style: TextStyle(fontSize: 30, color: Color(0xff33007e)),),
            SizedBox(height: 30,),
            TextField(decoration: InputDecoration(labelText: "E-mail"),),
            TextField(decoration: InputDecoration(labelText: "Senha"),
            obscureText: true,
            
            ),
            SizedBox(height: 30,),
             ElevatedButton(onPressed: (){
                Navigator.push(context, MaterialPageRoute(builder: (context) =>  EventEasyApp()),
                );
            },
            child: Text("Entrar"), style: ButtonStyle(),),
            SizedBox(height: 15,),
            GestureDetector(child: Text("Esqueci minha senha"),onTap: (){
            Navigator.push(context, MaterialPageRoute(builder: (context) =>  Cadastrar()),);
            },),
            SizedBox(height: 30,),
            
            SizedBox(height: 30,),
            Text("Ainda não é um membro? Clique no botão e se cadastre."),
            SizedBox(height: 15,),
            ElevatedButton(onPressed: (){
                Navigator.push(context, MaterialPageRoute(builder: (context) =>  Cadastrar()),
                );
            },
            child: Text("Cadastre-se"), style: ButtonStyle(),),

  

          ],
           
        ),
        
      ),
    
    );
  }
}