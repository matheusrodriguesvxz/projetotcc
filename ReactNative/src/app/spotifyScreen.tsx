import {
  View,
  Image,
  Text,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { LogoSmall } from "../components/Svgs";
import axios from "axios";
import { useEffect, useState } from "react";
import { Tab } from "@rneui/base";
import Carousel from "react-native-snap-carousel";

interface Track {
  id: string;
  track: {
    name: string;
    album: {
      images: { url: string }[];
    };
  };
}

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

export default function SpotifyScreen() {
  const [playlistImages, setPlaylistImages] = useState<Array<string | null>>([]);
  const [playlistNames, setPlaylistNames] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(true);
  const [animations, setAnimations] = useState<Animated.Value[]>([]);
  const [index, setIndex] = useState(0);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null
  );
  const { width: screenWidth } = Dimensions.get("window");

  async function getPlaylistTracks(playlistId: string) {
    try {
      const tokenResponse = await axios.get(
        "https://0ca7-2804-47e4-8879-8400-2d14-62e4-5bc8-a69d.ngrok-free.app/getTokenSpotify"
      );
      const token = tokenResponse.data.token;
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const tracks = response.data.items;
      console.log("Tracks:", tracks);
      setTopMusics(tracks);
    } catch (error) {
      console.error("Erro ao obter músicas:", error);
    }
  }
  const [topMusics, setTopMusics] = useState<Track[]>([]);

  const handlePlaylistClick = (id: string) => {
    setSelectedPlaylistId(id);
    getPlaylistTracks(id);
  };
  async function getTopMusics() {
    try {
      const tokenResponse = await axios.get(
        "https://0ca7-2804-47e4-8879-8400-2d14-62e4-5bc8-a69d.ngrok-free.app/getTokenSpotify"
      );
      const token = tokenResponse.data.token;

      const response = await axios.get(
        "https://api.spotify.com/v1/playlists/2NzZ9Z1vF45Gmkywg0BJ91/tracks",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const topTracks = response.data?.items || [];

      setTopMusics(topTracks.slice(0, 3));
    } catch (error) {
      console.error("Erro ao obter músicas:", error);
      setLoading(false);
    }
  }
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (index === 0) {
      getTopMusics();
    }
  }, [index]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getTopMusics();
  }, []);

  const playlistIds = [
    "5TPEneuulbJMhgz6PtnkaW",
    "44rrWDJeyqOx4SVvUI3kZU",
    "7110oQdXKCBofaBanEYo1Z",
    "3QfUDYpxCgQM77RY7WK890",
    "0AIQcYhkKho3uRvysz7CrY",
  ];
  async function GetMusic() {
    try {
      const tokenResponse = await axios.get(
        "https://0ca7-2804-47e4-8879-8400-2d14-62e4-5bc8-a69d.ngrok-free.app/getTokenSpotify"
      );
      const token = tokenResponse.data.token;

      const images: Array<string | null> = [];
      const names: Array<string> = [];

      for (const id of playlistIds) {
        const playlistResponse = await axios.get(
          `https://api.spotify.com/v1/playlists/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const imageUrl = playlistResponse.data.images[0]?.url || null;
        const name = playlistResponse.data.name;

        images.push(imageUrl);
        names.push(name);
      }

      setPlaylistImages(images);
      setPlaylistNames(names);

      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados das playlists:", error);
      setLoading(false);
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    GetMusic();
  }, []);

  useEffect(() => {
    if (playlistImages.length > 0) {
      setAnimations(playlistImages.map(() => new Animated.Value(0)));
    }
  }, [playlistImages]);

  const renderCarouselItem = ({
    item,
    index,
  }: {
    item: string | null;
    index: number;
  }) => (
    <TouchableOpacity
      style={{
        alignItems: "center",
        marginHorizontal: 10,
        padding: 15,
        borderRadius: 15,
      }}
      key={index}
    >
      <Animated.Image
        style={{
          height: 150,
          width: 150,
          borderRadius: 8,
        }}
        source={{
          uri: item || "https://via.placeholder.com/150",
        }}
      />
      <Text
        style={{
          color: "#333",
          fontFamily: "Poppins",
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 10,
        }}
        numberOfLines={1}
      >
        {playlistNames[index]}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View
        style={{ position: "relative" }}
        className="flex justify-center items-center"
      >
        <Image
          style={{ height: 150, borderRadius: 30, width: "100%" }}
          source={require("../../assets/Purple Wallpapers 30.png")}
        />
        <Text
          style={{
            position: "absolute",
            top: "50%",
            left: "5%",
            transform: [{ translateY: -12 }],
            color: "white",
            fontSize: 24,
            fontFamily: "Poppins",
            fontWeight: "bold",
          }}
        >
          Músicas
        </Text>
        <View
          style={{
            position: "absolute",
            top: "53%",
            right: "5%",
            transform: [{ translateY: -12 }],
          }}
        >
          <LogoSmall />
        </View>
      </View>
      <View>
        <Text
          style={{
            color: "black",
            fontFamily: "Poppins",
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Novas tendências entre as festas!
        </Text>
      </View>
      <View
        className="flex flex-row justify-center items-center w-full"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 110,
        }}
      >
        <View>
          <Text
            style={{
              color: "black",
              fontFamily: "Poppins",
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 20,
              marginLeft: 20,
            }}
          >
            Playlists
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: "#C0C0C0",
              fontFamily: "Poppins",
              fontSize: 14,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 20,
              marginLeft: 20,
            }}
          >
            Mostrar mais
          </Text>
        </View>
      </View>
      {playlistImages.length > 0 && playlistNames.length > 0 ? (
        <Carousel
          data={playlistImages}
          renderItem={({ item, index }) => (
            <View
              style={{
                alignItems: "center",
                marginHorizontal: 10,
                marginTop: 10,
              }}
            >
              {item && (
                <Image
                  style={{ height: 150, width: 150, borderRadius: 8 }}
                  source={{ uri: item }}
                />
              )}
              <Text
                style={{
                  color: "black",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 10,
                  width: 200,
                }}
                numberOfLines={1}
              >
                {playlistNames[index] || "Carregando..."}
              </Text>
            </View>
          )}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * 0.7}
          inactiveSlideOpacity={0.5}
          inactiveSlideScale={0.9}
          autoplay={true}
        />
      ) : (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 50 }}
        />
      )}
      <Tab
        value={index}
        onChange={setIndex}
        containerStyle={{ borderRadius: 10, marginLeft: 20, marginTop: 20 }}
        disableIndicator
      >
        <Tab.Item
          title="Em Alta"
          buttonStyle={{
            backgroundColor: index === 0 ? "black" : "#EAEAEA",
            borderRadius: 10,
            width: 150,
          }}
          titleStyle={{
            color: index === 0 ? "white" : "black",
            fontWeight: "bold",
            fontFamily: "Poppins",
            fontSize: 14,
          }}
        />
        <Tab.Item
          title="Para Você"
          buttonStyle={{
            backgroundColor: index === 1 ? "black" : "#EAEAEA",
            borderRadius: 10,
            width: 150,
          }}
          titleStyle={{
            color: index === 1 ? "white" : "black",
            fontWeight: "bold",
            fontFamily: "Poppins",
            fontSize: 14,
          }}
        />
      </Tab>
      {index === 0 ? (
        <View className="flex flex-col mt-4 justify-center items-center">
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : topMusics.length > 0 ? (
            topMusics.map((item) => (
              <View key={item.id} style={style.listaDeMusica} className="flex flex-col justify-center items-center">
                <View className="">
                  {item.track.album.images.length > 0 ? (
                    <Image
                      source={{ uri: item.track.album.images[0]?.url }}
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
                    {item.track.name || "Nome não disponível"}
                  </Text>
                  <Text
                    style={style.nomeArtista}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Artista:{item.track.artists[0]?.name}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={style.error}>Nenhuma música encontrada.</Text>
          )}
        </View>
      ) : null}
    </View>
  );
}

const style = StyleSheet.create({
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
    justifyContent: "center",
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
