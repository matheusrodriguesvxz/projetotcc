import 'package:flutter/material.dart';
import 'menu.dart';
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: VaquinhaScreen(),
    );
  }
}

class VaquinhaScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final customColor = Color(0xff33007e);

    return Scaffold(
      appBar: AppBar(
        title: Text('Vaquinha', style: TextStyle(fontSize: 20,  color: Colors.white, fontFamily: 'Poppins.ttf')),
        backgroundColor: customColor,
      ),

       drawer: Menu(),

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