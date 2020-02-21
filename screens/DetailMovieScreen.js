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
  ActivityIndicator,
  Dimensions,
  FlatList,
  Linking
} from "react-native";
import moment from "moment";
import MovieCard from "../components/MovieCard";
import {
  Appbar,
  Title,
  FAB,
  Portal,
  Provider,
  Headline,
  Subheading,
  Caption
} from "react-native-paper";
import { MonoText } from "../components/StyledText";
import ReactNativeParallaxHeader from "react-native-parallax-header";

const deviceWidth = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

export default function DetailMovieScreen(props) {
  const movieData = props.route.params;
  const [dates, setDates] = useState([]);
  const [currentMovie, setCurrentMovie] = useState([]);
  const [seanses, setSeanses] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    props.route.params.movies.forEach(element => {
      if (element.id_film === movieData.id_film) {
        setCurrentMovie(element);
      }
    });
    setDates(getDates());
    setSeanses(checkDate(new Date(), currentMovie));
  }, []);

  useEffect(() => {
    setSeanses(checkDate(currentDate, currentMovie));
  }, [currentDate]);

  const images = {
    background: {
      uri:
        movieData.poster === ""
          ? "https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png"
          : movieData.poster
    }
  };

  function checkDate(date, movie) {
    let seansesOnDate = [];
    if (movie.seanses != undefined) {
      let avalableMovie = JSON.stringify(movie);
      avalableMovie = JSON.parse(avalableMovie);

      let avalableSeanses = [];

      avalableMovie.seanses.forEach(seans => {
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
      <View style={{ backgroundColor: "#FBFBFB", flex: 1 }}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 8,
            alignItems: "center"
          }}
        >
          <Headline>Расписание</Headline>
          <Text>
            {movieData.type_film} | {movieData.vozvrast}+
          </Text>
        </View>
        <View
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          containerStyle={{
            maxHeight: 50,
            alignItems: "center",
            justifyContent: "center"
          }}
          style={{
            height: 50,
            backgroundColor: "#fff",
            flexDirection: "row",
            elevation: 1,
            justifyContent: "center",
            flexWrap: "wrap",
            marginVertical: 8
          }}
        >
          {dates.map(date => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setCurrentDate(date);
                }}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  backgroundColor:
                    currentDate.getDate() === date.getDate()
                      ? "#EF0000"
                      : "#fff",
                  paddingHorizontal: 16,
                  paddingVertical: 8
                }}
              >
                <Text
                  style={{
                    textAlign: "center",

                    color:
                      currentDate.getDate() === date.getDate() ? "#fff" : "#000"
                  }}
                >
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <ScrollView style={styles.box}>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            {seanses.map(seans => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("WebViewScreen", {
                      url: `https://kinowidget.kinoplan.ru/seats/776/${movieData.id_film}/${seans.id_session}`,
                      name: movieData.name
                    });
                  }}
                  style={{
                    marginRight: 10,
                    marginBottom: 5,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 5,
                    borderColor: "#f1f1f1",
                    borderWidth: 1,

                    alignSelf: "flex-start"
                  }}
                >
                  <Text>
                    {moment(seans.date).format("HH:MM")} | {seans.type_zal}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={{
              marginTop: 20,
              borderColor: "#f1f1f1",
              borderRadius: 5,
              borderWidth: 1,
              padding: 16
            }}
          >
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {movieData.country.map(val => {
                return <Caption>{val} </Caption>;
              })}
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {movieData.ganre.map(val => {
                return <Caption>{val} </Caption>;
              })}
            </View>
            <Text>{movieData.desc}</Text>
            <Caption>Режисер</Caption>
            <Text>{movieData.regisser}</Text>
            <Caption>В главных ролях</Caption>
            <Text>{movieData.acters} </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 30,
          backgroundColor: "#000"
        }}
      />
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={200}
        extraScrollHeight={20}
        navbarColor="#EF0000"
        title={movieData.name}
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
          onScrollEndDrag: () => console.log("onScrollEndDrag")
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

function renderNavBar(navigation) {
  return (
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconLeft} onPress={() => {}}>
          <Appbar.Action
            color="#fff"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconRight}
          onPress={() => {}}
        ></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appbarr: {
    marginTop: 30,
    backgroundColor: "#fff",
    elevation: 0
  },
  box: { paddingHorizontal: 8, flexDirection: "column" },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    flexGrow: 1,
    color: "#000"
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: "transparent"
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent"
  },
  titleStyle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  }
});
