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
  FlatList,
  AsyncStorage
} from "react-native";
import moment from "moment";
import "moment/src/locale/ru";
import "moment/min/moment-with-locales";
import MovieCard from "../components/MovieCard";
import {
  Appbar,
  Title,
  FAB,
  Portal,
  Provider,
  Headline
} from "react-native-paper";
import COLORS from "../assets/colors"


const deviceWidth = Dimensions.get("window").width;
HomeScreen.navigationOptions = {
  headerShown: false
};

export default function HomeScreen(props) {
  const [events, setevents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [colors, setColors] = useState("0")
  const [darkTheme,setdarkTheme] = useState("0")

  useEffect(() => {
    getData().then(setevents);

  }, []);


    React.useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus', () => {
        isDarkTheme()
      });
  
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, [props.navigation]);
  

  async function getData() {
    isDarkTheme()
    const result = await fetch("https://rus-noyabrsk.ru/platforms/themes/blankslate/kinocoon.json",{
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          Pragma: "no-cache"
        }
      })
    return result.json()
  }

  async function isDarkTheme(){
    let darkTheme = await AsyncStorage.getItem('darkTheme')
    setdarkTheme(darkTheme)
    darkTheme === "1" ? setColors(COLORS.DARK) : setColors(COLORS.LIGHT)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background_color
    },
    scheduleContainer:{
      backgroundColor:colors.card_color
    },
    scheduleText:{
      fontSize: 16, 
      fontWeight: "700",
      color:colors.text_color
    },
 
    scheduleTitle:{
      paddingHorizontal: 10, 
      marginTop: 10,
      color:colors.text_color
    },
    dateText:{ 
      padding: 8, 
      fontSize: 15, 
      fontFamily: "Roboto",
      color:colors.text_color
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



  return (
    <View style={styles.container}>
        <View
        style={{
          height: 30,
          backgroundColor: "#EF0000"
        }}
      />
      <Appbar
        style={{
          backgroundColor: "#EF0000"
        }}
      >
        <Appbar.Action
          icon="menu"
          onPress={() => props.navigation.openDrawer()}
        />
        <Appbar.Content title="Скоро в кино" />
      </Appbar>
      <Title></Title>
      <ScrollView>
        {events.map(event =>{
            return <MovieCard soonOnScreens={true} detailType="DetailMovieScreen" darkTheme={darkTheme} navigation={props.navigation} {...event}></MovieCard>

        })}
    </ScrollView>

    </View>
  );
}



