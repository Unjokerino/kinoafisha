import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState, useMemo } from "react";
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
  FlatList,
  AsyncStorage,
  SectionList,
} from "react-native";
import moment from "moment";
import { format } from "../utils/format";
import "moment/src/locale/ru";
import "moment/min/moment-with-locales";
import MovieCard from "../components/MovieCard";
import {
  Appbar,
  Title,
  FAB,
  Portal,
  Provider,
  Headline,
} from "react-native-paper";
import COLORS from "../assets/colors";

const deviceWidth = Dimensions.get("window").width;
HomeScreen.navigationOptions = {
  headerShown: false,
};

export default function HomeScreen(props) {
  const [theatre, setTheatre] = useState([]);
  const [dates, setDates] = useState([new Date()]);
  const [darkTheme, setdarkTheme] = useState("0");
  const [refreshing, setRefreshing] = useState(false);
  const [colors, setColors] = useState(
    global.darkTheme ? COLORS.DARK : COLORS.LIGHT
  );

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
    message: {
      textAlign: "center",
      padding: 30,
      alignItems: "center",
      flex: 1,

      justifyContent: "center",
    },
    messageText: {
      textAlign: "center",
      color: colors.text_color,
      fontWeight: "bold",
    },
    scheduleTitle: {
      fontSize: 20,
      paddingHorizontal: 10,
      marginTop: 10,
      color: colors.text_color,
    },
    dateText: {
      padding: 8,
      fontSize: 15,
      fontFamily: "Roboto",
      color: colors.text_color,
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

  function getData() {
    try {
      setRefreshing(true);

      fetch(props.route.url, {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          Pragma: "no-cache",
        },
      }).then((response) =>
        response.json().then((text) => {
          setTheatre(text);
          console.log(text);
          setRefreshing(false);
        })
      );
    } catch (error) {
      console.log(111111, error);
    }
  }

  const avalableSeanses = useMemo(() => {
    const formatedTheatre = format(theatre);
    console.log(formatedTheatre);
    return formatedTheatre;
    //const as = await checkSeanses(theatre);
    //console.warn("as", as);
    //return as;
  }, [theatre]);

  async function isDarkTheme() {
    let darkTheme = await AsyncStorage.getItem("darkTheme");
    setdarkTheme(darkTheme);
    darkTheme === "1" ? setColors(COLORS.DARK) : setColors(COLORS.LIGHT);
  }

  useEffect(() => {
    isDarkTheme();
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.scheduleContainer}>
        <Title style={styles.scheduleTitle}>Расписание</Title>
      </View>
      {avalableSeanses?.[0]?.date && (
        <SectionList
          sections={avalableSeanses}
          renderItem={({ item, section }) => (
            <MovieCard
              detailType="DetailTheaterScreen"
              url={props.route.url}
              darkTheme={darkTheme}
              navigation={props}
              {...item}
              {...section.info}
            />
          )}
        />
      )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getData} />
        }
        style={{}}
      >
        {/* <MovieCard
                      detailType="DetailTheaterScreen"
                      url={props.route.url}
                      darkTheme={darkTheme}
                      navigation={props}
                      {...event}
                    /> */}
      </ScrollView>
    </View>
  );
}
