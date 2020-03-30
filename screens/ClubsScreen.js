import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  FlatList
} from "react-native";
import moment from "moment";
import ClubCard from "../components/ClubCard";
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
import COLORS from "../assets/colors"

const deviceWidth = Dimensions.get("window").width;

export default function ClubsScreen(props) {
  const [clubs, setClubs] = useState([]);
  const [darkTheme,setdarkTheme] = useState("0")
  const [dates, setDates] = useState([new Date()]);
  const [avalableSeanses, setAvalableSeanses] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [colors, setColors] = useState(global.darkTheme ? COLORS.DARK : COLORS.LIGHT)
  const [city,setCity] = useState("Ноябрьск")

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background_color
    },
    headerText: {
      fontSize: 30,
      textAlign: "center",
      margin: 10,
      color: colors.text_color,
  
    },
    scrollView: {
      width: deviceWidth
    }
  });

  async function getCity(){
    const city = await AsyncStorage.getItem('city');
    return city ? city : 'Ноябрьск'
  }

  function loadData() {
    try {
      setRefreshing(true);
      fetch(
        "http://rus-noyabrsk.ru/platforms/themes/blankslate/clubs.json",
        {
          headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            Pragma: "no-cache"
          }
        }
      ).then(response =>
        response.json().then(text => {
          setRefreshing(false);
          setClubs(text);
        })
      );
    } catch (error) {
      console.log(111111, error);
    }
  }

  async function isDarkTheme(){
    let darkTheme = await AsyncStorage.getItem('darkTheme')
    setdarkTheme(darkTheme)
    darkTheme === "1" ? setColors(COLORS.DARK) : setColors(COLORS.LIGHT)
  }

  useEffect(() => {
    loadData();
    isDarkTheme()
    getCity().then(setCity)
  }, []);



  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadData} />
        }
        style={{}}
      >
        {clubs.map(club => {
          return (
            <View key={club.name} >
              <ClubCard darkTheme={darkTheme} navigation={props} {...club} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}


