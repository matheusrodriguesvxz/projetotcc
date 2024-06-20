import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: VaquinhaScreen(),
    );
  }
}

class VaquinhaScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final customColor = Color.fromRGBO(73, 1, 95, 0.925);

    return Scaffold(
      appBar: AppBar(
        title: Text('Vaquinha'),
        backgroundColor: customColor,
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            UserAccountsDrawerHeader(
              accountName: Text("Nome do usuário"),
              accountEmail: Text("emailusuario@gmail.com"),
              currentAccountPicture: CircleAvatar(
                backgroundColor: Colors.white,
                child: Icon(
                  Icons.person,
                  size: 50,
                  color: customColor,
                ),
              ),
              decoration: BoxDecoration(
                color: customColor,
              ),
            ),
            ListTile(
              leading: Icon(Icons.home, color: customColor),
              title: Text('Home'),
              onTap: () {
                // Ação ao clicar
              },
            ),
            ListTile(
              leading: Icon(Icons.calendar_today, color: customColor),
              title: Text('Calendário'),
              onTap: () {
                // Ação ao clicar
              },
            ),
            ListTile(
              leading: Icon(Icons.group, color: customColor),
              title: Text('Lista de Convidados'),
              onTap: () {
                // Ação ao clicar
              },
            ),
            ListTile(
              leading: Icon(Icons.add, color: customColor),
              title: Text('Criar convite'),
              onTap: () {
                // Ação ao clicar
              },
            ),
            ListTile(
              leading: Icon(Icons.attach_money, color: customColor),
              title: Text('Orçamento'),
              onTap: () {
                // Ação ao clicar
              },
            ),
            ListTile(
              leading: Icon(Icons.shopping_cart, color: customColor),
              title: Text('Lista de Compras'),
              onTap: () {
                // Ação ao clicar
              },
            ),
            ListTile(
              leading: Icon(Icons.money, color: customColor),
              title: Text('Vaquinha'),
              onTap: () {
                // Ação ao clicar
              },
            ),
            ListTile(
              leading: Icon(Icons.playlist_play, color: customColor),
              title: Text('Playlist'),
              onTap: () {
                // Ação ao clicar
              },
            ),
          ],
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              padding: EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                color: customColor.withOpacity(0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Column(
                children: [
                  Text(
                    'R\$ 120,00 / R\$ 300,00',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: customColor,
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 20),
            Text(
              'Por favor, forneça um local para guardar os fundos da vaquinha.',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.black54,
              ),
            ),
            SizedBox(height: 20),
            TextField(
              decoration: InputDecoration(
                prefixIcon: Icon(Icons.vpn_key, color: customColor),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                labelText: 'Coloque Sua Chave Pix',
              ),
            ),
            SizedBox(height: 20),
            Text(
              'Registro de Pagamentos',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.black54,
              ),
            ),
            SizedBox(height: 10),
            Expanded(
              child: Container(
                padding: EdgeInsets.all(16.0),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: customColor),
                ),
                child: ListView(
                  children: [
                    // Pagamentos de exemplo, substitua pelos seus dados reais
                    ListTile(
                      leading: Icon(Icons.payment, color: customColor),
                      title: Text('Pagamento 1'),
                      subtitle: Text('R\$ 50,00'),
                    ),
                    ListTile(
                      leading: Icon(Icons.payment, color: customColor),
                      title: Text('Pagamento 2'),
                      subtitle: Text('R\$ 70,00'),
                    ),
                    // Adicione mais ListTiles aqui
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
