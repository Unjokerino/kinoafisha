import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import COLORS from "../assets/colors";
import MovieCard from "../components/MovieCard";
import { useColors } from "../hooks/useColors";
import { useLocation } from "../hooks/useLocation";

const deviceWidth = Dimensions.get("window").width;
HomeScreen.navigationOptions = {
  headerText: "Афиша",
};
export default function HomeScreen(props) {
  const [movies, setMovies] = useState([]);
  const [scrollState, setscrollState] = useState(false);
  const [categoryScrollState, setcategoryScrollState] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [dates, setDates] = useState([new Date()]);
  const [avalableSeanses, setAvalableSeanses] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const { colors, darkTheme } = useColors();
  const [showPushkin, setShowPushkin] = useState(false);
  const { city } = useLocation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background_color,
    },
    scheduleContainer: {
      backgroundColor: colors.background_color,
    },
    scheduleText: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text_color,
      textAlign: "center",
    },
    scheduleTitle: {
      paddingHorizontal: 24,
      paddingVertical: 18,
      color: colors.text_color,
      fontSize: 20,
      fontWeight: "800",
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
    pushkinButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: +darkTheme ? "#5669FF" : "#EF0000",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 37,
      right: 25,
    },
    pushkinButtonActive: {
      backgroundColor: +darkTheme ? "#EF0000" : "#5669FF",
    },
  });

  useEffect(() => {
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
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [city]);

  const searchByPuskinCard = () => {
    setShowPushkin((prev) => !prev);
  };

  async function checkDate(dates, all_movies) {
    const avalableMovies = [
      ...all_movies.filter((movie) => movie.type_afisha_name === city),
    ];
    let seansesOnDate = [];

    dates.forEach((date) => {
      seansesOnDate[moment(date).format("D MMMM")] = [];

      avalableMovies.map((avalableMovie, index) => {
        avalableMovie = JSON.stringify(avalableMovie);
        avalableMovie = JSON.parse(avalableMovie);
        const avalableSeanses = [];
        avalableMovie.seanses.forEach((seans) => {
          let seansDate = new Date(moment(seans.date));
          if (
            seansDate.getDate() + "/" + seansDate.getMonth() ===
            date.getDate() + "/" + date.getMonth()
          ) {
            avalableSeanses.push(seans);
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

  return (
    <View style={styles.container}>
      <View style={styles.scheduleContainer}>
        <Text
          style={[
            styles.scheduleTitle,
            {
              backgroundColor: colors.background_color,
              color: colors.afisha_title,
            },
          ]}
        >
          Расписание
        </Text>
        <ScrollView
          ref={setcategoryScrollState}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 37,
            paddingRight: 25,
            backgroundColor: colors.background_color,
            paddingBottom: 29,
          }}
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
                    paddingHorizontal: 8,
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
                      width: 47,
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
        pagingEnabled
        nestedScrollEnabled
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
          const filteredSeans = seans.filter((item) => {
            if (showPushkin) {
              return !!item.pushkin_card;
            }
            return true;
          });
          const seansCount = countSeanses(
            seans.filter((item) => {
              if (showPushkin) {
                return !!item.pushkin_card;
              }
              return true;
            })
          );

          return (
            <View>
              <Text
                style={{
                  paddingVertical: 8,
                  fontSize: 16,
                  backgroundColor: "#E1E1E1",
                  color: "#000",
                  paddingHorizontal: 24,
                }}
              >
                {data}
              </Text>
              {seansCount > 0 ? (
                <FlatList
                  contentContainerStyle={{
                    backgroundColor: colors.background_color,
                    paddingTop: 10,
                  }}
                  nestedScrollEnabled={true}
                  key={seans.name + index}
                  showsVerticalScrollIndicator={false}
                  style={styles.scrollView}
                  data={filteredSeans}
                  renderItem={({ item }) => (
                    <View style={{ paddingHorizontal: 24, paddingBottom: 12 }}>
                      <MovieCard
                        detailType="DetailMovieScreen"
                        current_date={item.date}
                        movies={movies}
                        {...item}
                      />
                    </View>
                  )}
                  keyExtractor={(item, index) => item.name + index}
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
      <TouchableOpacity
        onPress={searchByPuskinCard}
        style={[
          styles.pushkinButton,
          showPushkin && styles.pushkinButtonActive,
        ]}
      >
        <Image source={require("../assets/images/pushkinWhite.png")} />
      </TouchableOpacity>
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

  return dates;
}

HomeScreen.navigationOptions = {
  header: null,
};
