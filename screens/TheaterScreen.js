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

const deviceWidth = Dimensions.get("window").width;
HomeScreen.navigationOptions = {
  headerShown: false
};

export default function HomeScreen(props) {
  const [theatre, setTheatre] = useState([]);
  const [dates, setDates] = useState([new Date()]);
  const [avalableSeanses, setAvalableSeanses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  function getData() {
    let aTheatres = [];
    try {
      setRefreshing(true);
      fetch(
        "http://rus-noyabrsk.ru/platforms/themes/blankslate/theatre.json",
        {
          headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            Pragma: "no-cache"
          }
        }
      ).then(response =>
        response.json().then(text => {
        
          getDates().then((dates) => {setDates(dates); checkDate(dates, text).then((resp) => {setAvalableSeanses(resp);})});

          

          setTheatre(text);
  setRefreshing(false);
        })
      );
    } catch (error) {
      console.log(111111, error);
    }
  }

  useEffect(() => {
    getData();
    {
      setTimeout(() => {
        getData();
      }, 2500);
    }
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
        {  Object.entries(avalableSeanses).map((avalableSeans, index) => {
            const [data, seans] = avalableSeans;
            if(seans.length > 0)
              return (
        
                  <View>
                    <Text
                      style={{ padding: 8, fontSize: 15, fontFamily: "Roboto" }}
                    >
                      {checkMonth(seans[0].date.getMonth() + 1)},{" "}
                      {seans[0].date.getDate()}
                    </Text>
                    <View style={{ backgroundColor: "#fff" }}>
                      { seans.map(val => {
                      
                          return (
                            <View>
                            
                              <TheaterCard navigation={props} {...val}></TheaterCard>
                            </View>
                          );
                      })}
                    </View>
                  </View>
                );
          })
     
        }
      </ScrollView>
    </View>
  );
}

async function checkDate(dates, all_movies) {
  let startD = new Date();
  let avalableMovies = JSON.stringify(all_movies);
  avalableMovies = JSON.parse(avalableMovies);
  let seansesOnDate = [];

  dates.forEach(date => {
    seansesOnDate[date.getDate()] = [];

    avalableMovies.map((avalableMovie, index) => {
      avalableMovie = JSON.stringify(avalableMovie);
      avalableMovie = JSON.parse(avalableMovie);

      let avalableSeanses = [];
      avalableMovie.seanses.forEach(seans => {
        let seansDate = new Date(moment(seans.date));

        if (seansDate.getDate() === date.getDate()) {
          avalableSeanses.push(seans);
        }
      });

      avalableMovie.date = date;
      avalableMovie.seanses = avalableSeanses;
      if(avalableSeanses.length > 0)
        seansesOnDate[date.getDate()].push({
          ...avalableMovie
        });
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

async function getDates() {
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
