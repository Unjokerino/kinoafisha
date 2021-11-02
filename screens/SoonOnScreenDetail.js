import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import moment from "moment";
import localization from "moment/locale/ru";
import MoreEvents from "../components/MoreEvents";
import {
  Appbar,
  Title,
  FAB,
  Portal,
  Provider,
  Headline,
  Subheading,
  Caption,
} from "react-native-paper";
import { MonoText } from "../components/StyledText";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import COLORS from "../assets/colors";

const deviceWidth = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

export default function SoonOnScreenDetail(props) {
  const movieData = props.route.params;
  const [dates, setDates] = useState([]);
  const [darkTheme, setdarkTheme] = useState("0");
  const [colors, setColors] = useState(
    movieData.darkTheme === "1" ? COLORS.DARK : COLORS.LIGHT
  );
  const [currentMovie, setCurrentMovie] = useState([]);
  const [seanses, setSeanses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    new Date(movieData.current_date)
  );
  const url =
    "https://rus-noyabrsk.ru/platforms/themes/blankslate/kinocoon.json";

  const styles = StyleSheet.create({
    appbarr: {
      marginTop: 30,
      backgroundColor: colors.background_color,
      elevation: 0,
    },
    box: { paddingHorizontal: 8, flexDirection: "column" },
    container: {
      flex: 1,
      backgroundColor: colors.background_color,
    },
    contentContainer: {
      flexGrow: 1,
      color: colors.text_color,
    },
    title: {
      fontSize: 13,
      fontFamily: "Roboto",
      color: colors.text_color,
    },
    iconLeft: {
      opacity: 1,
    },
    navContainer: {
      height: HEADER_HEIGHT,
      marginHorizontal: 10,
    },
    statusBar: {
      height: STATUS_BAR_HEIGHT,
      backgroundColor: "transparent",
    },
    text: {
      paddingVertical: 0,
      borderColor: "#f1f1f1",
      borderRadius: 5,
      fontSize: 13,
      fontFamily: "Roboto",
      color: colors.text_color,
    },
    navBar: {
      height: NAV_BAR_HEIGHT,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: "transparent",
    },
    titleStyle: {
      color: colors.text_color,
      fontWeight: "bold",
      fontSize: 18,
    },
  });

  function renderNavBar(navigation) {
    return (
      <View style={styles.navContainer}>
        <View style={styles.statusBar} />
        <View style={styles.navBar}>
          <TouchableOpacity
            style={[
              styles.iconLeft,
              { display: "flex", opacity: 1, zIndex: 999 },
            ]}
            onPress={() => {}}
          >
            <Appbar.Action
              color="#fff"
              icon="arrow-left"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Appbar.Content color="#fff" title={movieData.name} />
          <TouchableOpacity
            style={styles.iconRight}
            onPress={() => {}}
          ></TouchableOpacity>
        </View>
      </View>
    );
  }

  useEffect(() => {
    props.route.params.movies &&
      props.route.params.movies.forEach((element) => {
        if (element.id_film === movieData.id_film) {
          setCurrentMovie(element);
          setCurrentDate(new Date(movieData.current_date));
          checkDate(currentDate, element).then((dates) => {
            setSeanses(dates);

            setLoading(false);
          });
        }
      }),
      setDates(getDates());
  }, []);

  useEffect(() => {
    isDarkTheme();
  }, []);

  async function isDarkTheme() {
    let darkTheme = await AsyncStorage.getItem("darkTheme");
    setdarkTheme(darkTheme);
    darkTheme === "1" ? setColors(COLORS.DARK) : setColors(COLORS.LIGHT);
  }

  useEffect(() => {
    setLoading(true);
    checkDate(currentDate, currentMovie).then((dates) => {
      setSeanses(dates);
      setLoading(false);
    });
  }, [currentDate]);

  const images = {
    background: {
      uri:
        movieData.poster === ""
          ? "https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png"
          : movieData.poster,
    },
  };

  async function checkDate(date, movie) {
    let seansesOnDate = [];
    if (movie.seanses != undefined) {
      let avalableMovie = JSON.stringify(movie);
      avalableMovie = JSON.parse(avalableMovie);

      let avalableSeanses = [];

      avalableMovie.seanses.forEach((seans) => {
        let seansDate = new Date(moment(seans.date));

        if (seansDate.getDate() === date.getDate()) {
          avalableSeanses.push(seans);
        }
      });

      seansesOnDate.push(...avalableSeanses);
    }
    return seansesOnDate;
  }

  function setCurrentSeanses(date) {}

  function renderContent() {
    return (
      <View style={{ backgroundColor: colors.background_color, flex: 1 }}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 8,
            color: colors.caption_color,
            alignItems: "center",
          }}
        >
          <Headline style={{ color: colors.caption_color }}>
            Расписание
          </Headline>
          <Text style={{ color: colors.caption_color }}>
            {movieData.type_film} | {movieData.vozvrast}+
          </Text>
        </View>

        <Title style={[styles.title, { textAlign: "center", fontSize: 16 }]}>
          В кино с{" "}
          {moment(movieData.seanses[0].date)
            .locale("ru", localization)
            .format("D MMMM")}
        </Title>

        <ScrollView style={styles.box}>
          <WebView
            style={{
              marginTop: Platform.OS == "ios" ? 20 : 0,
              width: "100%",
              height: 250,
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{
              uri: "https://www.youtube.com/embed/" + movieData.youtube,
            }}
          />

          <View
            style={{
              marginTop: 20,
              borderColor: "#f1f1f1",
              borderRadius: 5,
              backgroundColor: colors.card_color,
              borderWidth: 1,
              padding: 16,
              marginBottom: 10,
            }}
          >
            <View
              style={{ borderBottomColor: "#f1f1f1", borderBottomWidth: 1 }}
            >
              <Text style={[styles.title, { fontSize: 18 }]}>
                {movieData.name}
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Caption style={{ color: colors.caption_color }}>
                  {movieData.ganre.join(", ")}{" "}
                </Caption>
              </View>
            </View>
            <Caption style={{ color: colors.caption_color }}>Описание</Caption>
            <Text style={styles.text}>
              {movieData.mobile
                ? movieData.desc.replace('<?xml encoding="utf8" ?>', "")
                : "Описания пока нет :("}
            </Text>
            <Caption style={{ color: colors.caption_color }}>Cтрана</Caption>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text style={styles.title}>{movieData.country.join(", ")} </Text>
            </View>
            <Caption style={{ color: colors.caption_color }}>Режисер</Caption>
            <Text style={styles.title}>{movieData.regisser}</Text>
            <Caption style={{ color: colors.caption_color }}>
              В главных ролях
            </Caption>
            <Text style={styles.title}>{movieData.acters} </Text>
          </View>
          <MoreEvents
            skipCityCheck={true}
            skipDateCheck={true}
            name={movieData.name}
            url={url}
            target="DetailMovieScreen"
            navigation={props}
          />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={200}
        extraScrollHeight={20}
        navbarColor="#EF0000"
        alwaysShowTitle={false}
        title={
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("WebViewScreen", {
                url: "https://www.youtube.com/embed/" + movieData.youtube,
                name: movieData.name,
              });
            }}
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              backgroundColor: "#11111154",
              justifyContent: "center",
            }}
          >
            <Title
              style={{
                color: colors.text_color,
                fontFamily: "Roboto",
                textAlign: "center",
                marginHorizontal: 10,
              }}
            >
              {""}
            </Title>
          </TouchableOpacity>
        }
        titleStyle={styles.titleStyle}
        backgroundImage={images.background}
        backgroundImageScale={1.2}
        renderNavBar={() => renderNavBar(props.navigation)}
        renderContent={renderContent}
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}
        innerContainerStyle={styles.container}
        scrollViewProps={{
          onScrollBeginDrag: () => console.log("onScrollBeginDrag"),
          onScrollEndDrag: () => console.log("onScrollEndDrag"),
        }}
      />
    </View>
  );
}

function getDates() {
  let dates = [];
  for (let i = 0; i < 7; i++) {
    let date = new Date();
    dates.push(new Date(date.setDate(date.getDate() + i)));
  }
  return dates;
}
