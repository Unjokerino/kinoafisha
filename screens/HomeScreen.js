import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  View,
  ActivityIndicator,
  Dimensions,
  FlatList
} from "react-native";
import moment from "moment";
import MovieCard from "../components/MovieCard";
import { Appbar, Title, FAB, Portal, Provider } from "react-native-paper";
import { MonoText } from "../components/StyledText";

const deviceWidth = Dimensions.get("window").width;
HomeScreen.navigationOptions = {
  headerText: "Афиша"
};
export default function HomeScreen(props) {
  const [movies, setMovies] = useState([]);
  const [dates, setDates] = useState([new Date()]);
  const [FABopen, setFABopen] = useState(false);
  const [avalableSeanses, setAvalableSeanses] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().getDate());
  const [scrollCheckEnabled, setScrollCheckEnabled] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  let scrollListReftop;

  function getData() {
    let aSeanses = [];
    try {
      setRefreshing(true);
      fetch("https://newtime.binarywd.com/jsonfeed/kino/", {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          Pragma: "no-cache"
        }
      }).then(response => {
        setRefreshing(false);
        response.json().then(text => {
          setDates(getDates());
          setMovies(text);

          aSeanses = checkDate(dates, text);

          setAvalableSeanses(aSeanses);
        });
      });
    } catch (error) {
      console.log(111111, error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Provider>
        <View style={{ backgroundColor: "#fff" }}>
          <Title style={{ paddingHorizontal: 10, marginTop: 10 }}>
            Расписание
          </Title>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ flexWrap: "wrap", flexGrow: 1 }}
          >
            {dates.map(date => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setScrollCheckEnabled(false);
                      setCurrentDate(date.getDate());
                      let offset = date.getDate() - new Date().getDate();
                      scrollListReftop.scrollTo({
                        x: deviceWidth * offset,
                        y: 0,
                        animated: true
                      });
                      setTimeout(() => {
                        setScrollCheckEnabled(true);
                      }, 500);
                    }}
                    style={{
                      flexGrow: 1,
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                      margin: 5
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>
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
                          currentDate === date.getDate() ? "#990000" : "#CFCFCF"
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
          style={{}}
          nestedScrollEnabled={true}
          ref={ref => (scrollListReftop = ref)}
          onScroll={event => {
            if (scrollCheckEnabled) {
              let offset = Math.round(
                event.nativeEvent.contentOffset.x / deviceWidth
              );
              let date = new Date();
              let newDate = new Date(date.setDate(date.getDate() + offset));
              //console.log('new: ',newDate.getDate(), 'cur: ',currentDate)
              if (currentDate !== newDate.getDate()) {
                setCurrentDate(newDate.getDate());
              }
            }
          }}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        >
          {Object.entries(avalableSeanses).map((avalableSeans, index) => {
            avalableSeans = avalableSeans[1];
            let key = avalableSeans[0];
            console.log(index);
            return (
              <View>
                <Text
                  style={{
                    paddingVertical: 10,
                    fontSize: 16,
                    paddingHorizontal: 5
                  }}
                >
                  {" "}
                  Сеансы на
                </Text>
                <FlatList
                  contentContainerStyle={{
                    backgroundColor: "#fff",
                    paddingTop: 10
                  }}
                  style={{ backgroundColor: "#fff" }}
                  nestedScrollEnabled={true}
                  key={index}
                  showsVerticalScrollIndicator={false}
                  style={styles.scrollView}
                  data={avalableSeans}
                  renderItem={({ item }) =>
                    item.seanses.length > 0 ? (
                      <MovieCard navigation={props} {...item} />
                    ) : (
                      <View style={{ flex: 1 }}>
                        <View></View>
                      </View>
                    )
                  }
                  keyExtractor={(item, index) =>
                    item.name + new Date().getTime() + index
                  }
                />
              </View>
            );
          })}
        </ScrollView>
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
      </Provider>
    </View>
  );
}

function checkDate(dates, all_movies) {
  let avalableMovies = JSON.stringify(all_movies);
  avalableMovies = JSON.parse(avalableMovies);
  let seansesOnDate = {};
  dates.forEach(date => {
    seansesOnDate[date.getDate()] = [];
    avalableMovies.map((avalableMovie, index) => {
      let avalableSeanses = [];

      avalableMovie.seanses.forEach(seans => {
        let seansDate = new Date(moment(seans.date));

        if (seansDate.getDate() === date.getDate()) {
          avalableSeanses.push(seans);
        }
      });

      if (avalableSeanses.length > 0) {
        avalableMovie.date = date.getDate();
        avalableMovie.seanses = avalableSeanses;
        seansesOnDate[date.getDate()].push(avalableMovie);
        //console.log(date,avalableMovies[index])
      } else {
        avalableMovie.seanses = [];
      }
    });
  });
  return seansesOnDate;
}

function getDates() {
  let dates = [];
  for (let i = 0; i < 7; i++) {
    let date = new Date();
    dates.push(new Date(date.setDate(date.getDate() + i)));
  }
  return dates;
}

HomeScreen.navigationOptions = {
  header: null
};

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
