import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { BarraDePesquisa, CarosselImages } from "../components/HomePage";
import { useFonts } from "expo-font";
import axios from "axios";
import { useEffect, useState } from "react";

type Music = {
  id: string;
  name: string;
  album: {
    images: { url: string; height: number; width: number }[];
    name: string;
    release_date: string;
    artists: { name: string; id: string }[];
  };
};

type SpotifyResponse = {
  items: {
    track: Music;
  }[];
};

export default function PlaylistPage() {
  const [getMusic, setGetMusic] = useState<Music[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [randomMusics, setRandomMusics] = useState<Music[]>([]);

  async function GetMusic() {
    try {
      console.log("Iniciando a requisição para obter o token...");
      const tokenResponse = await axios.get(
        "https://0ca7-2804-47e4-8879-8400-2d14-62e4-5bc8-a69d.ngrok-free.app/getTokenSpotify"
      );
      console.log("Token recebido:", tokenResponse.data.token);

      const musicResponse = await axios.get<SpotifyResponse>(
        "https://api.spotify.com/v1/playlists/37i9dQZEVXbMXbN3EUUhlg/tracks",
        { headers: { Authorization: `Bearer ${tokenResponse.data.token}` } }
      );

      const musicTracks = musicResponse.data.items.map((item) => item.track);
      setGetMusic(musicTracks);

      getRandomMusics(musicTracks);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Erro na requisição:", error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  }

  const getRandomMusics = (musicTracks: Music[]) => {
    if (musicTracks.length > 0) {
      const shuffled = musicTracks.sort(() => 0.5 - Math.random());
      const selectedMusics = shuffled.slice(0, 4);
      setRandomMusics(selectedMusics);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    GetMusic();
  }, []);

  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={style.areaRoxa}>
      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
      <View className="mt-10 flex "></View>
      <View className="items-center" style={style.areaBranca}>
        <View style={style.carossel}>
          <CarosselImages />
        </View>
        <View>
          <BarraDePesquisa placeholder="Pesquisar músicas" />
        </View>
        <View>
          <Text style={style.title}>Em Alta</Text>
          <Text style={style.subTitle}>
            Confira as playlists em alta baseado no seu evento
          </Text>
        </View>

        <View>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : getMusic.length > 0 ? (
            getMusic.map((music) => (
              <View key={music.id} style={style.listaDeMusica}>
                <View>
                  {music.album.images.length > 0 ? (
                    <Image
                      source={{ uri: music.album.images[0].url }}
                      style={style.imagem}
                    />
                  ) : (
                    <Text>Imagem não disponível</Text>
                  )}
                </View>
                <View className="flex flex-col pl-2 items-center justify-center">
                  <Text
                    style={style.nomeMusica}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {music.name}
                  </Text>
                  <Text
                    style={style.nomeArtista}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Artista: {music.album.artists[0].name}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={style.error}>Nenhuma música encontrada.</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  areaRoxa: {
    backgroundColor: "#760BFF",
    height: "100%",
  },

  areaBranca: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },

  carossel: {
    marginTop: 30,
  },

  title: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 25,
    textAlign: "center",
  },

  subTitle: {
    marginTop: 5,
    fontSize: 13,
    letterSpacing: 0.3,
    color: "#BFBFBF",
    marginBottom: 20,
    width: 500,
    fontFamily: "Poppins",
    fontWeight: "bold",
    textAlign: "center",
  },

  listaDeMusica: {
    width: 349,
    height: 70,
    backgroundColor: "#D9D9D9",
    marginBottom: 20,
    gap: 10,
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
  },

  imagem: {
    width: 50,
    height: 50,
    alignItems: "center",
    marginLeft: 10,
    borderRadius: 5,
  },

  nomeMusica: {
    fontSize: 16,
    fontWeight: "bold",
    width: 200,
    textAlign: "center",
  },

  nomeArtista: {
    fontSize: 12,
    display: "flex",
    textAlign: "center",
  },
  error: {
    fontSize: 16,
  },
});
