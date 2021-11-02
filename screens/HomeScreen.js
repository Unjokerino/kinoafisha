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
HomeScreen.navigationOptions = {
  headerText: "Афиша",
};
export default function HomeScreen(props) {
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

  let scrollListReftop;

  useEffect(() => {
    //getData()

    if (scrollState && categoryScrollState) {
      scrollState.scrollTo({
        x: deviceWidth * categoryIndex,
        y: 0,
        animated: false,
      });
      categoryScrollState.scrollTo({
        x: 100 * categoryIndex - (deviceWidth / 2 + 50),
        y: 0,
        animated: true,
      });
    }
  }, [categoryIndex]);

  function getData() {
    let aSeanses = [];
    try {
      setRefreshing(true);
      fetch("http://rus-noyabrsk.ru/platforms/themes/blankslate/kino.json", {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          Pragma: "no-cache",
        },
      }).then((response) => {
        response.json().then((text) => {
          getDates().then((dates) => {
            setDates(dates);
            checkDate(dates, text).then((resp) => {
              setAvalableSeanses(resp);
            });
          });
          setMovies(text);
        });
        setRefreshing(false);
      });
    } catch (error) {
      console.log(111111, error);
    }
  }

  useEffect(() => {
    isDarkTheme();
    getData();
  }, []);

  async function isDarkTheme() {
    let darkTheme = await AsyncStorage.getItem("darkTheme");
    setdarkTheme(darkTheme);
    darkTheme === "1" ? setColors(COLORS.DARK) : setColors(COLORS.LIGHT);
  }

  return (
    <View style={styles.container}>
      <Provider>
        <View style={styles.scheduleContainer}>
          <Title style={styles.scheduleTitle}>Расписание</Title>
          <ScrollView
            ref={setcategoryScrollState}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ flexWrap: "wrap", flexGrow: 1 }}
          >
            {dates.map((date, index) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setCategoryIndex(index);
                    }}
                    style={{
                      flexGrow: 1,
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                      margin: 5,
                    }}
                  >
                    <Text style={styles.scheduleText}>
                      {date.getDate() < 10 ? "0" : ""}
                      {date.getDate()}/{date.getMonth() < 10 ? "0" : ""}
                      {date.getMonth() + 1}
                    </Text>
                    <View
                      style={{
                        marginTop: 3,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        height: 3,
                        width: "100%",
                        backgroundColor:
                          categoryIndex === index ? "#990000" : "#CFCFCF",
                      }}
                    ></View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getData} />
          }
          pagingEnabled={true}
          nestedScrollEnabled={true}
          ref={(ref) => setscrollState}
          onScroll={(event) => {
            let offset = Math.round(
              event.nativeEvent.contentOffset.x / deviceWidth
            );
            offset !== categoryIndex && setCategoryIndex(offset);
          }}
          ref={setscrollState}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {Object.entries(avalableSeanses).map((avalableSeans, index) => {
            const [data, seans] = avalableSeans;

            return (
              <View>
                <Text
                  style={{
                    paddingVertical: 10,
                    fontSize: 16,
                    color: colors.text_color,
                    paddingHorizontal: 5,
                  }}
                >
                  Сеансы на {data}
                </Text>
                {countSeanses(seans) > 0 ? (
                  <FlatList
                    contentContainerStyle={{
                      backgroundColor: colors.background_color,
                      paddingTop: 10,
                    }}
                    nestedScrollEnabled={true}
                    key={seans.name + index}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                    data={seans}
                    renderItem={({ item }) => (
                      <View>
                        <MovieCard
                          detailType="DetailMovieScreen"
                          darkTheme={darkTheme}
                          current_date={item.date}
                          movies={movies}
                          navigation={props}
                          {...item}
                        />
                      </View>
                    )}
                    keyExtractor={(item, index) => item.name}
                  />
                ) : (
                  <View style={[styles.scrollView, styles.message]}>
                    <Text style={styles.messageText}>
                      Сеансов пока нет, но скоро обязательно появятся{" "}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
        {/*}
        <Portal>
          <FAB.Group
            fabStyle={{ backgroundColor: "#EF0000" }}
            open={FABopen}
            icon={FABopen ? "dots-vertical" : "format-list-bulleted"}
            actions={[
              {
                icon: "email",
                label: "Формат",
                onPress: () => console.log("Pressed email")
              },
              {
                icon: "bell",
                label: "Жанр",
                onPress: () => console.log("Pressed notifications")
              },
              {
                icon: "email",
                label: "Дата и время",
                onPress: () => console.log("Pressed email")
              },
              {
                icon: "email",
                label: "Контент",
                onPress: () => console.log("Pressed email")
              }
            ]}
            onStateChange={({ open }) => setFABopen(open)}
            onPress={() => {
              if (FABopen) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
          {*/}
      </Provider>
    </View>
  );
}

function countSeanses(seans) {
  let count = 0;
  seans.forEach((element) => {
    count += element.seanses.length;
  });
  return count;
}

async function checkDate(dates, all_movies) {
  let startD = new Date();
  let avalableMovies = JSON.stringify(all_movies);
  avalableMovies = JSON.parse(avalableMovies);
  let city = await AsyncStorage.getItem("city");
  city ? city : "Ноябрьск";
  let seansesOnDate = [];

  dates.forEach((date) => {
    seansesOnDate[moment(date).format("D MMMM")] = [];

    avalableMovies.map((avalableMovie, index) => {
      avalableMovie = JSON.stringify(avalableMovie);
      avalableMovie = JSON.parse(avalableMovie);

      let avalableSeanses = [];
      avalableMovie.seanses.forEach((seans) => {
        let seansDate = new Date(moment(seans.date));
        if (seans.city === city) {
          if (
            seansDate.getDate() + "/" + seansDate.getMonth() ===
            date.getDate() + "/" + date.getMonth()
          ) {
            avalableSeanses.push(seans);
          }
        }
      });

      avalableMovie.date = date;
      avalableMovie.seanses = avalableSeanses;
      if (avalableMovie.seanses.length > 0) {
        seansesOnDate[moment(date).format("D MMMM")].push({
          ...avalableMovie,
        });
      }

      //console.log(date,avalableMovies[index])
    });
  });

  return seansesOnDate;
}

function checkMonth(month) {
  switch (month) {
    case 1:
      return "Январь";
    case 2:
      return "Февраль";
    case 3:
      return "Март";
    case 4:
      return "Апрель";
    case 5:
      return "Май";
    case 6:
      return "Июнь";
    case 7:
      return "Июль";
    case 8:
      return "Август";
    case 9:
      return "Сентябрь";
    case 10:
      return "Октябрь";
    case 11:
      return "Ноябрь";
    case 12:
      return "Декабрь";

    default:
      return "Январь";
  }
}

async function getDates() {
  let dates = [];
  for (let i = 0; i < 7; i++) {
    let date = new Date();
    dates.push(new Date(date.setDate(date.getDate() + i)));
  }
  dates = dates.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a) - new Date(b);
  });
  console.log(dates);
  return dates;
}

HomeScreen.navigationOptions = {
  header: null,
};
