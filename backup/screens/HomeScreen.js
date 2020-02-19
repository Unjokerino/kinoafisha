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
          console.log(text);
          setDates(getDates());
          setMovies(text);
          dates.forEach(date => {
            aSeanses.push(checkDate(date, text));
          });
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
          {dates.map((date, index) => {
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
                  Сеансы на {date.getDate()}/{date.getMonth() + 1}
                </Text>
                <FlatList
                  contentContainerStyle={{
                    backgroundColor: "#fff",
                    paddingTop: 10
                  }}
                  style={{ backgroundColor: "#fff" }}
                  nestedScrollEnabled={true}
                  key={date}
                  showsVerticalScrollIndicator={false}
                  style={styles.scrollView}
                  data={avalableSeanses[index]}
                  renderItem={({ item }) =>
                    item.seanses.length > 0 ? (
                      <MovieCard navigation={props} {...item} />
                    ) : (
                      <View style={{ flex: 1 }}>
                        <View></View>
                      </View>
                    )
                  }
                  keyExtractor={item => item.name}
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

function checkDate(date, all_movies) {
  let avalableMovies = JSON.stringify(all_movies);
  avalableMovies = JSON.parse(avalableMovies);

  avalableMovies.forEach((avalableMovie, index) => {
    let avalableSeanses = [];

    avalableMovies[index].seanses.forEach(seans => {
      let seansDate = new Date(moment(seans.date));

      if (seansDate.getDate() === date.getDate()) {
        avalableSeanses.push(seans);
      }
    });

    if (avalableSeanses.length > 0) {
      avalableMovies[index].date = date.getDate();
      avalableMovies[index].seanses = avalableSeanses;
      //console.log(date,avalableMovies[index])
    } else {
      avalableMovies[index].seanses = [];
    }
  });

  return avalableMovies;
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
