import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import MovieCard from "../components/MovieCard";
import { useColors } from "../hooks/useColors";

export default function SoonOnScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [movies, setMovies] = useState([]);
  const { colors } = useColors();
  const fetchData = async () => {
    try {
      setRefreshing(true);
      fetch(
        "http://rus-noyabrsk.ru/platforms/themes/blankslate/kinocoon.json",
        {
          headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            Pragma: "no-cache",
          },
        }
      ).then((response) => {
        setRefreshing(false);
        response.json().then((text) => {
          setMovies(text);
          console.warn(text);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: colors.background_color }}>
      <Appbar
        style={{
          backgroundColor: "#EF0000",
          paddingTop: 10,
          alignItems: "center",
        }}
      >
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Скоро в кино" />
      </Appbar>
      <FlatList
        data={movies}
        contentContainerStyle={{ paddingVertical: 16 }}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <MovieCard
              current_date={item.date}
              movies={movies}
              detailType="DetailMovieScreen"
              soonOnScreens={true}
              {...item}
            />
          </View>
        )}
      />
    </View>
  );
}
