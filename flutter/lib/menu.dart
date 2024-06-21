import 'package:flutter/material.dart';

class Menu extends StatelessWidget {
  const Menu({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Material(
        color: Color(0xff33007e),
        child: ListView(
          padding: EdgeInsets.symmetric(horizontal: 20),
          children: [
            
            cabecalho(
             nome: "Nome do usuário",
             email: "emailusuario@gmail.com",
             imagem: "https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
             ),

            const SizedBox(
              height: 40,
            ),

            itemmenu(texto: "Home", icone: Icons.home),
            const SizedBox(
              height: 2,
            ),

           itemmenu(texto: "Calendário", icone:Icons.calendar_month),
            const SizedBox(
              height: 2,
            ),

            itemmenu(texto: "Lista de Convidados", icone:Icons.format_list_numbered),
            const SizedBox(
              height: 2,
            ),

            itemmenu(texto: "Criar convite", icone:Icons.add_box),
            const SizedBox(
              height: 2,
            ),

            itemmenu(texto: "Orçamento", icone:Icons.monetization_on),
            const SizedBox(
              height: 2,
            ),

             itemmenu(texto: "Lista de Compras", icone:Icons.inventory_outlined),
            const SizedBox(
              height: 2,
            ),

             itemmenu(texto: "Vaquinha", icone:Icons.attach_money_sharp),
            const SizedBox(
              height: 2,
            ),

            itemmenu(texto: "Playlist", icone:Icons.queue_music),
            const SizedBox(
              height: 70,
            ),
            itemmenu(texto: "Sair", icone: Icons.exit_to_app),
          ],
        ),
      ),
    );
  }
}
Widget itemmenu({
  required String texto,
  required IconData icone,
}){
  return ListTile(
    leading: Icon(icone, color: Colors.white),
    title: Text(texto, style:TextStyle(color:Colors.white),
    ),
    hoverColor: Colors.white70,
  );
}
cabecalho({
  required String nome,
  required String email,
  required String imagem,
}) =>
    InkWell(
     
     onTap: (){},
      child: Row(
        children: [
          CircleAvatar(
            radius: 35,
            backgroundImage: NetworkImage(imagem),
          ),
          const SizedBox(width: 20,),
          Column(
            children: [
              Text(nome, style: TextStyle(fontSize: 10, color: Colors.white,),),
              const SizedBox(height: 4,),
              Text(email, style: TextStyle(fontSize: 10, color:Colors.white),),
              ],)
        ],
      ),
    );