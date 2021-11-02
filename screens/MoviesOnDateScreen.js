import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  View,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from "react-native";
import MovieCard from "../components/MovieCard";
import { Appbar, Title, FAB, Portal, Provider } from "react-native-paper";
import { MonoText } from "../components/StyledText";
import COLORS from "../assets/colors";
import moment from "moment";
import localization from "moment/locale/ru";

const deviceWidth = Dimensions.get("window").width;

export default function MoviesOnDateScreen(props) {
  const [movies, setMovies] = useState([]);
  const [offset, setOffset] = useState(0);
  const [scrollState, setscrollState] = useState(false);
  const [categoryScrollState, setcategoryScrollState] = useState(false);
  const [darkTheme, setdarkTheme] = useState("0");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [dates, setDates] = useState([new Date()]);
  const [FABopen, setFABopen] = useState(false);
  const [avalableSeanses, setAvalableSeanses] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().getDate());
  const [scrollCheckEnabled, setScrollCheckEnabled] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [colors, setColors] = useState(COLORS.LIGHT);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background_color,
    },
    scheduleContainer: {
      backgroundColor: colors.card_color,
    },
    scheduleText: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text_color,
    },
    scheduleTitle: {
      paddingHorizontal: 10,
      marginTop: 10,
      color: colors.text_color,
    },
    message: {
      textAlign: "center",
      paddingHorizontal: 30,
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
    },
    messageText: {
      textAlign: "center",
      color: colors.text_color,
      fontWeight: "bold",
    },
    headerText: {
      fontSize: 30,
      textAlign: "center",
      margin: 10,
      color: "white",
      fontWeight: "bold",
    },
    scrollView: {
      width: deviceWidth,
    },
  });

  useEffect(() => {
    getData().then(setAvalableSeanses);
    isDarkTheme();
  }, []);

  async function isDarkTheme() {
    let darkTheme = await AsyncStorage.getItem("darkTheme");
    setdarkTheme(darkTheme);
    darkTheme === "1" ? setColors(COLORS.DARK) : setColors(COLORS.LIGHT);
  }

  async function getData() {
    let seanses = [];
    let result = await fetch(props.route.params.url, {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        Pragma: "no-cache",
      },
    });
    result = await result.json();
    result.forEach((movie) => {
      movie.seanses.forEach((seans) => {
        if (
          moment(seans.date).format("MM/DD") ===
          moment(props.route.params.date).format("MM/DD")
        ) {
          seanses.push({
            ...movie,
            seanses: [seans],
          });
        }
      });
    });

    return seanses;
  }

  return (
    <View style={styles.container}>
      <Provider>
        <View
          style={{
            height: 30,
            backgroundColor: props.route.params.backgroundColor,
          }}
        />
        <Appbar
          style={{
            backgroundColor: props.route.params.backgroundColor,
            elevation: 0,
          }}
        >
          <Appbar.Action
            onPress={() => props.navigation.goBack()}
            icon="arrow-left"
          />
          <Appbar.Content
            title={
              "Сеансы на " + moment(props.route.params.date).format("D MMMM")
            }
          />
        </Appbar>
        <View style={styles.scheduleContainer}>
          <Title style={styles.scheduleTitle}>Расписание</Title>
          <FlatList
            contentContainerStyle={{ paddingBottom: 150 }}
            data={avalableSeanses}
            renderItem={({ item }) => (
              <MovieCard
                detailType="DetailMovieScreen"
                url={props.route.params.url}
                darkTheme={darkTheme}
                navigation={props.navigation}
                {...item}
              ></MovieCard>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Provider>
    </View>
  );
}
