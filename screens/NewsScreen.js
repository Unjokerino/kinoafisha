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
  RefreshControl,
  Dimensions,
  FlatList,
  AsyncStorage
} from "react-native";
import moment from "moment";
import NewsCard from "../components/NewsCard";
import { Appbar, Title, FAB, Portal, Provider } from "react-native-paper";
import { MonoText } from "../components/StyledText";
import COLORS from "../assets/colors"

const deviceWidth = Dimensions.get("window").width;

export default function NewsScreen(props) {
  const [darkTheme,setdarkTheme] = useState("0")
  const [colors, setColors] = useState("0")
  const [refreshing, setRefreshing] = React.useState(false);
  const [news, setNews] = useState([]);

  const styles = StyleSheet.create({
    container:{
      backgroundColor:colors.background_color
    }
  })

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      isDarkTheme()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  function getData() {
    isDarkTheme()
    try {
      setRefreshing(true);
      fetch(
        "http://rus-noyabrsk.ru/platforms/themes/blankslate/news.json",
        {
          headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            Pragma: "no-cache"
          }
        }
      ).then(response => {
        setRefreshing(false);
        response.json().then(text => {
          setNews(text);
        });
      });
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
    
    getData();
  }, []);


  return (
    <View>
      <View
        style={{
          height: 30,
          backgroundColor: "#000"
        }}
      />
      <Appbar
        style={{
          backgroundColor: "#000"
        }}
      >
        <Appbar.Action
          icon="menu"
          onPress={() => props.navigation.openDrawer()}
        />
        <Appbar.Content title="Новости" />
      </Appbar>
      <ScrollView
      style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getData} />
        }
      >
        {news.map(value => {
          return <NewsCard darkTheme={darkTheme} navigation={props} {...value}></NewsCard>;
        })}
      </ScrollView>
    </View>
  );
}


