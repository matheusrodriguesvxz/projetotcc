import 'package:flutter/material.dart';
import 'menu.dart';
void main() {
  runApp(const EventEasyApp());
}

class EventEasyApp extends StatelessWidget {
  const EventEasyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: EventEasyHomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class EventEasyHomePage extends StatelessWidget {
  const EventEasyHomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      
      appBar: AppBar(
        titleTextStyle: TextStyle(fontFamily: 'Poppins' ),
        backgroundColor: const Color(0xff33007e),
        title: const Text('EventEasy', style: TextStyle(fontSize: 35,  color: Colors.white, fontFamily: 'Poppins.ttf')),
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
      drawer: Menu(),
      
      body:  Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: Text(
                    'Bem-vindo a EventEasy',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 16),
            TextField(
              decoration: InputDecoration(
                prefixIcon: Icon(Icons.search),
                hintText: 'Procurar',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(40)),
                  borderSide: BorderSide.none,
                ),
                filled: true,
                fillColor: Color.fromARGB(255, 233, 233, 233),
              ),
            ),
            SizedBox (height: 16),
             Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                children: [
                  _buildMenuItem('Listas de Convidados'),
                  _buildMenuItem('Orçamento'),
                  _buildMenuItem('Playlist'),
                  _buildMenuItem('Criar Convite'),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.black,
        selectedIconTheme: IconThemeData(color: Color(0xff33007e)),
        unselectedIconTheme: IconThemeData(color: const Color.fromARGB(255, 83, 83, 83)),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_filled),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.people_alt_outlined),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.shopping_cart_outlined),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.list_alt_rounded),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings_outlined),
                        
            label: '',
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Color(0xff33007e),
        foregroundColor: Colors.white,
        
        onPressed: () {},
        child: const Icon(Icons.add),
        
      ),
    );
  }

  static Widget _buildMenuItem(String title) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.grey[200],
        borderRadius: BorderRadius.circular(8),
      ),
      child: Center(
        child: Text(
          title,
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}