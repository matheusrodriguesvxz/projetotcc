import 'package:flutter/material.dart';
import 'package:flutter_application_1/login.dart';


class Cadastrar extends StatefulWidget {
  const Cadastrar({super.key});

  @override
  State<Cadastrar> createState() => _CadastrarState();
}

class _CadastrarState extends State<Cadastrar> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Center(child: Padding(
        padding: const EdgeInsets.fromLTRB(0,0,65,0),
        child: Text("EventEasy",
        style: TextStyle(color: Colors.black, fontFamily: "Arial")),
      )),
      backgroundColor: const Color.fromARGB(255, 215, 131, 236)),
      
      body: 
      
       Container(
        
        color: Color.fromARGB(255, 215, 131, 236),
        child:Column(
          
        children: <Widget>[
          
          SizedBox(height: 50,),
          TextField(decoration: InputDecoration(labelText: "Nome"),),
          TextField(decoration: InputDecoration(labelText: "Sobrenome"),),
          TextField(decoration: InputDecoration(labelText: "E-mail"),),
          TextField(decoration: InputDecoration(labelText: "Senha"),
          obscureText: true,
          ),

          TextField(decoration: InputDecoration(labelText: "Confirmar Senha"),
          obscureText: true,),
          SizedBox(height: 20,),
          Center(child: ElevatedButton(onPressed: (){
            Navigator.push(context, MaterialPageRoute(builder: (context) =>  Login()),);
          }, child: Text("Cadastrar"), style: ButtonStyle(),)),
        ],
      ),
    
     )
    );
  }
}