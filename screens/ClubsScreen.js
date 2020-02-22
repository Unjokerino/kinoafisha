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
const deviceWidth = Dimensions.get("window").width;

export default function ClubsScreen(props) {
  const [clubs, setClubs] = useState([]);
  const [dates, setDates] = useState([new Date()]);
  const [avalableSeanses, setAvalableSeanses] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

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

  useEffect(() => {
    loadData();
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
            <View key={club.name} style={{ backgroundColor: "#fff" }}>
              <ClubCard navigation={props} {...club} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
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
