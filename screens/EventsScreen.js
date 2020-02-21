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
  RefreshControl,
  FlatList
} from "react-native";
import moment from "moment";
import "moment/src/locale/ru";
import "moment/min/moment-with-locales";
import TheaterCard from "../components/TheaterCard";
import {
  Appbar,
  Title,
  FAB,
  Portal,
  Provider,
  Headline
} from "react-native-paper";
import { MonoText } from "../components/StyledText";
import "moment/min/moment-with-locales";

const deviceWidth = Dimensions.get("window").width;

export default function EventsScreen(props) {
  const [theatre, setTheatre] = useState([]);
  const [dates, setDates] = useState([new Date()]);
  const [avalableSeanses, setAvalableSeanses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  function getData() {
    let aTheatres = [];
    try {
      setRefreshing(true);
      fetch(
        "https://newtime.binarywd.com/platforms/themes/blankslate/afisha.json",
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate,max-age=0",
            "Content-Type": "application/json",
            "Cache-Control": "post-check=0, pre-check=0",
            Pragma: "no-cache"
          }
        }
      ).then(response =>
        response.json().then(text => {
          console.log(text);
          setRefreshing(false);
          setDates(getDates());

          setTheatre(text);
          dates.forEach(date => {
            aTheatres.push({
              theatres: [...checkDate(date, text)],
              date: date
            });
          });

          setAvalableSeanses(aTheatres);
        })
      );
    } catch (error) {
      console.log(111111, error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Headline
        style={{
          paddingHorizontal: 10,

          backgroundColor: "#fff"
        }}
      >
        Расписание
      </Headline>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getData} />
        }
        style={{}}
      >
        {avalableSeanses.map(avalableSeans => {
          if (avalableSeans.theatres.length > 0)
            return (
              <View>
                <Text
                  style={{ padding: 8, fontSize: 15, fontFamily: "Roboto" }}
                >
                  {checkMonth(avalableSeans.date.getMonth() + 1)},{" "}
                  {avalableSeans.date.getDate()}
                </Text>
                <View style={{ backgroundColor: "#fff" }}>
                  {avalableSeans.theatres.map(val => {
                    return (
                      <TheaterCard navigation={props} {...val}></TheaterCard>
                    );
                  })}
                </View>
              </View>
            );
        })}
      </ScrollView>
    </View>
  );
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
      return "Аперль";
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

function checkDate(date, theatres) {
  theatres = JSON.stringify(theatres);
  theatres = JSON.parse(theatres);
  let avalableTheaters = [];
  theatres.forEach((avalableMovie, index) => {
    let avalableSeanses = [];

    theatres[index].seanses.forEach(seans => {
      let seansDate = new Date(moment(seans.date));

      if (
        seansDate.getDate() + seansDate.getMonth() + seansDate.getFullYear() ===
        date.getDate() + date.getMonth() + date.getFullYear()
      ) {
        avalableSeanses.push(seans);
      }
    });

    if (avalableSeanses.length > 0) {
      theatres[index].date = date.getDate();
      theatres[index].seanses = avalableSeanses;
      avalableTheaters.push(theatres[index]);
      //console.log(date,avalableMovies[index])
    } else {
      theatres[index].seanses = [];
    }
  });

  return avalableTheaters;
}

function getDates() {
  let dates = [];
  for (let i = 0; i < 7; i++) {
    let date = new Date();
    dates.push(new Date(date.setDate(date.getDate() + i)));
  }
  return dates;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  headerText: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    color: "white",
    fontWeight: "bold"
  },
  scrollView: {
    width: deviceWidth
  }
});
