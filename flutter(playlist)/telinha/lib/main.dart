import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: PlaylistSelectionScreen(),
  ));
}

class PlaylistSelectionScreen extends StatelessWidget {
  PlaylistSelectionScreen({Key? key}) : super(key: key);

  final List<Map<String, dynamic>> playlists = [
    {
      'title': 'Trap',
      'image': 'https://via.placeholder.com/150',
    },
    {
      'title': 'Funk',
      'image': 'https://via.placeholder.com/150',
    },
    {
      'title': 'Sertanejo',
      'image': 'https://via.placeholder.com/150',
    },
    {
      'title': '',
      'image': 'https://via.placeholder.com/150',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Escolha uma Playlist'),
      ),
      body: ListView.builder(
        itemCount: playlists.length,
        itemBuilder: (BuildContext context, int index) {
          return PlaylistItem(
            title: playlists[index]['title'],
            image: playlists[index]['image'],
            onTap: () {
              showDialog(
                context: context,
                builder: (BuildContext context) {
                  return AlertDialog(
                    title: const Text('Playlist Selecionada'),
                    content:
                        Text('Você selecionou: ${playlists[index]['title']}'),
                    actions: <Widget>[
                      TextButton(
                        child: const Text('OK'),
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                      ),
                    ],
                  );
                },
              );
            },
          );
        },
      ),
    );
  }
}

class PlaylistItem extends StatelessWidget {
  final String title;
  final String image;
  final VoidCallback onTap;

  const PlaylistItem({
    super.key,
    required this.title,
    required this.image,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: CircleAvatar(
        backgroundImage: NetworkImage(image),
      ),
      title: Text(title),
      onTap: onTap,
    );
  }
}
