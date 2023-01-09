import moment from "moment";
import "moment/min/moment-with-locales";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  RefreshControl, ScrollView,
  StyleSheet,
  Text, View
} from "react-native";
import {
  Headline
} from "react-native-paper";
import { requests } from "../api";
import TheaterCard from "../components/TheaterCard";

const deviceWidth = Dimensions.get("window").width;

export default function EventsScreen(props) {
  const [theatre, setTheatre] = useState([]);
  const [dates, setDates] = useState([new Date()]);
  const [avalableSeanses, setAvalableSeanses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    let aTheatres = [];
    try {
      setRefreshing(true);
      const afisha = await requests.getAfisha()
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
          moment.locale("ru");

          return (
            <View>
              <Text style={{ padding: 5 }}>
                {moment(avalableSeans.date).format("MMM Do")}
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
