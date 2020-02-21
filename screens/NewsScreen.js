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
  FlatList
} from "react-native";
import moment from "moment";
import NewsCard from "../components/NewsCard";
import { Appbar, Title, FAB, Portal, Provider } from "react-native-paper";
import { MonoText } from "../components/StyledText";

const deviceWidth = Dimensions.get("window").width;

export default function NewsScreen(props) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [news, setNews] = useState([]);
  function getData() {
    try {
      setRefreshing(true);
      fetch(
        "https://newtime.binarywd.com/platforms/themes/blankslate/news.json",
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getData} />
        }
      >
        {news.map(value => {
          return <NewsCard navigation={props} {...value}></NewsCard>;
        })}
      </ScrollView>
    </View>
  );
}
