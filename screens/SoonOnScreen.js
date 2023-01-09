import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StatusBar, FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import MovieCard from "../components/MovieCard";

export default function SoonOnScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [movies, setMovies] = useState([]);
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
      console.log(111111, error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View>
      <StatusBar backgroundColor="#EF0000" animated={true} />
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
        renderItem={({ item }) => (
          <MovieCard
            current_date={item.date}
            movies={movies}
            detailType="DetailMovieScreen"
            soonOnScreens={true}
            {...item}
          />
        )}
      />
    </View>
  );
}
