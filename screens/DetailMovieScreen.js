import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar, Caption, Headline, IconButton } from "react-native-paper";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import { PlayIcon } from "../assets/icons";
import MoreEvents from "../components/MoreEvents";
import { PushkinCard } from "../components/PushkinCard";
import { useColors } from "../hooks/useColors";

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
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    new Date(movieData.current_date)
  );
  const soonOnScreens = props?.route?.params?.soonOnScreens;
  const url = "http://rus-noyabrsk.ru/platforms/themes/blankslate/kino.json";
  const { darkTheme: stringDarkTheme, colors } = useColors();
  const darkTheme = stringDarkTheme === "1" ? true : false;
  const styles = StyleSheet.create({
    box: { flexDirection: "column", flex: 1 },
    row: {
      flexDirection: "row",
      borderBottomColor: "#7070703D",
      borderBottomWidth: 1,
      alignItems: "center",
      flex: 1,
      paddingVertical: 10,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background_color,
    },
    contentContainer: {
      flexGrow: 1,
      color: colors.text_color,
    },
    title: {
      fontSize: 16,
      fontFamily: "Roboto",
      fontWeight: "700",
      width: "100%",
      flex: 1,
      alignSelf: "flex-start",
      color: darkTheme ? "#FFFFFF" : "#364F6B",
    },
    subtitle: {
      color: darkTheme ? "#FFFFFF" : "#364F6B",
      opacity: 0.6,
      paddingRight: 15,
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
      fontFamily: "Roboto",
      color: darkTheme ? "#FFFFFF" : "#364F6B",
      fontWeight: "500",
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
    caption: {
      fontFamily: "Roboto",
      opacity: 0.6,
      color: darkTheme ? "#F5F5F5" : "#364F6B",
    },
    menuRow: {
      paddingHorizontal: 8,
      flexDirection: "row",
      elevation: 1,
      flexGrow: 1,
      flexWrap: "wrap",
      marginVertical: 8,
    },
    menuItem: {
      width: 85,
      height: 33,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 4,
    },
    menuButton: {
      borderRadius: 8,
      marginVertical: 2,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      borderColor: "#D1D6DD",
      borderWidth: darkTheme ? 0 : 1.5,
      backgroundColor: darkTheme ? "#262626" : "transparent",
    },
    contentWrapper: {
      marginTop: 20,
      borderRadius: 5,
      backgroundColor: colors.card_color,
      borderTopColor: darkTheme ? "#000" : "#7070702B",
      borderTopWidth: darkTheme ? 0 : 1,
      padding: 16,
      marginBottom: 10,
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

  const goToBuying = (item) => {
    if (movieData.quicktickets) {
      const url = `https://quicktickets.ru/noyabrsk-dk-rus/${movieData.quicktickets}?iframe=1`;
      props.navigation.navigate("WebViewScreen", {
        url,
        name: theaterData.name,
      });
      return;
    }
    props.navigation.navigate("WebViewScreen", {
      url: `https://kinowidget.kinoplan.ru/seats/776/${movieData.id_film}/${item.id_session}`,
      name: movieData.name,
    });
  };

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
    setLoading(true);
    checkDate(currentDate, currentMovie).then((dates) => {
      setSeanses(dates);
      setLoading(false);
    });
    console.warn(props.quicktickets);
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
          <Headline
            style={{
              color: colors.text_color,
              fontSize: 18,
              fontFamily: "Roboto",
            }}
          >
            РАСПИСАНИЕ
          </Headline>
          <Text style={styles.caption}>
            {movieData.type_film} | {movieData.vozvrast}+
          </Text>
        </View>
        {soonOnScreens ? (
          <Text
            style={[
              styles.title,
              {
                fontSize: 16,
                fontFamily: "Roboto",
                fontWeight: "600",
                textAlign: "center",
              },
            ]}
          >
            В кино с {moment(movieData?.seanses?.[0].date).format("D MMMM")}
          </Text>
        ) : (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            containerStyle={{
              maxHeight: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
            contentContainerStyle={{
              justifyContent: "center",
            }}
            style={styles.menuRow}
          >
            {dates.map((date) => {
              const isCurrent =
                JSON.stringify(currentDate) == "null"
                  ? () => setCurrentDate(new Date(props.route.params.cur_date))
                  : currentDate.getDate() === date.getDate();
              return (
                <TouchableOpacity
                  key={date.getDate() + date.getMonth()}
                  onPress={() => {
                    setCurrentDate(date);
                  }}
                  style={styles.menuItem}
                >
                  <View
                    style={[
                      styles.menuButton,
                      { width: "100%", height: "100%" },
                      isCurrent && {
                        backgroundColor: darkTheme ? "#EF0000" : "#4579FF26",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          textAlign: "center",
                          color: darkTheme ? "#FFFFFF" : "#434670",
                        },
                        isCurrent && {
                          color: darkTheme ? "#fff" : "#434670",
                        },
                      ]}
                    >
                      {moment(date).format("MM/DD")}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
        <ScrollView style={styles.box}>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 15,
            }}
          >
            {seanses.map((seans) => {
              return (
                <TouchableOpacity
                  key={moment(seans.date).format("HH:mm")}
                  onPress={() => {
                    goToBuying(seans);
                  }}
                  style={[
                    styles.menuButton,
                    styles.menuItem,
                    {
                      width: "auto",
                      paddingHorizontal: 25,
                      marginHorizontal: 4,
                    },
                  ]}
                >
                  <Text style={styles.text}>
                    {moment(seans.date).format("HH:mm")} | {seans.type_zal}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.contentWrapper}>
            <Text
              style={[
                styles.title,
                { fontSize: 16, fontFamily: "Roboto", fontWeight: "600" },
              ]}
            >
              {movieData.name}
            </Text>
            <Caption style={styles.caption}>
              {movieData.ganre.join(", ")}{" "}
            </Caption>

            <Text
              style={[
                [
                  styles.text,
                  { paddingVertical: 22, lineHeight: 18, fontSize: 13 },
                ],
              ]}
            >
              {movieData.desc
                ? movieData.desc.replace('<?xml encoding="utf8" ?>', "")
                : "Описания пока нет :("}
            </Text>
            <View style={styles.row}>
              <Caption style={styles.subtitle}>Cтрана</Caption>
              <Text style={styles.title}>{movieData.country.join(", ")} </Text>
            </View>
            <View style={styles.row}>
              <Caption style={styles.subtitle}>Режиссер</Caption>
              <Text style={styles.title}>{movieData.regisser}</Text>
            </View>
            <View style={[styles.row, { borderBottomWidth: 0 }]}>
              <Caption style={styles.subtitle}>В главных ролях</Caption>
              <Text style={styles.title}>{movieData.acters} </Text>
            </View>
          </View>
          <MoreEvents
            name={movieData.name}
            url={url}
            target="DetailMovieScreen"
            navigation={props}
          />
        </ScrollView>
      </View>
    );
  }

  const renderTitle = () => {
    return (
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
        <IconButton
          icon="play"
          size={50}
          color={"#fff"}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 5,
            borderColor: "#fff",
            alignSelf: "center",
          }}
        />
        <PushkinCard style={{ position: "absolute", bottom: 8, right: 13 }} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={250}
        extraScrollHeight={20}
        navbarColor={darkTheme ? "black" : "black"}
        alwaysShowTitle={false}
        title={renderTitle()}
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
