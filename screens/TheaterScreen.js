import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import "moment/min/moment-with-locales";
import "moment/src/locale/ru";
import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import Fuse from "fuse.js";
import MovieCard from "../components/MovieCard";
import { format } from "../utils/format";
import { useColors } from "../hooks/useColors";
import { PushkinCard } from "../components/PushkinCard";

const deviceWidth = Dimensions.get("window").width;
HomeScreen.navigationOptions = {
  headerShown: false,
};

export default function HomeScreen(props) {
  const [theatre, setTheatre] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { colors, darkTheme } = useColors();
  const [searched, setSearched] = useState(theatre);
  const [query, setQuery] = useState("");
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background_color,
    },
    header: {
      padding: 11,
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
      paddingHorizontal: 24,
      paddingTop: 18,
      paddingBottom: 12,
      fontWeight: "800",
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
    title: {
      fontSize: 14,
    },
    menuItem: {
      borderRadius: 8,
      borderWidth: 1.5,
      borderColor: colors.border_color,
      paddingVertical: 10,
      color: "#434670",
      fontSize: 15,
      fontWeight: "500",
      paddingHorizontal: 24,
      marginHorizontal: 12,
      textTransform: "capitalize",
      maxWidth: 300,
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
          setRefreshing(false);
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  const avalableSeanses = useMemo(() => {
    const formatedTheatre = format(searched.length > 0 ? searched : theatre);
    return formatedTheatre;
    //const as = await checkSeanses(theatre);
    //console.warn("as", as);
    //return as;
  }, [theatre, searched, query]);

  useEffect(() => {
    getData();
  }, []);

  const searchByType = (type) => {
    if (query === type) {
      setQuery("");
      setSearched(theatre);
      return;
    }
    setQuery(type);
    const options = {
      keys: ["short_desc"],
    };
    if (type === "pushkin_card") {
      const result = theatre.filter((item) => !!item.pushkin_card);
      setSearched(result);
      return;
    }
    const fuse = new Fuse(theatre, options);
    const result = fuse.search(type).map((item) => item.item);
    setSearched(result);
  };

  return (
    <View style={styles.container}>
      <View style={styles.scheduleContainer}>
        <Text style={[styles.scheduleTitle, { color: colors.afisha_title }]}>
          Расписание
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 12 }}
        >
          <Text
            onPress={() => searchByType("pushkin_card")}
            style={[
              styles.menuItem,
              +darkTheme && { color: "#fff", borderColor: "#ffffff26" },
              query === "pushkin_card" && { backgroundColor: "#4579FF26" },
            ]}
          >
            <PushkinCard style={{ height: 15, width: 15 }} />
            <Text style={{ paddingLeft: 8 }}>Пушкинская карта</Text>
          </Text>
          {theatre.map((item) => {
            return (
              <Text
                onPress={() => searchByType(item.short_desc)}
                numberOfLines={1}
                style={[
                  styles.menuItem,
                  +darkTheme && { color: "#fff", borderColor: "#ffffff26" },
                  query === item.short_desc && { backgroundColor: "#4579FF26" },
                ]}
              >
                {item.short_desc}
              </Text>
            );
          })}
        </ScrollView>
      </View>
      {avalableSeanses?.[0]?.date && (
        <SectionList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getData} />
          }
          sections={avalableSeanses}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, section }) => (
            <View
              style={{
                paddingHorizontal: 24,
                paddingTop: 12,
                paddingBottom: 10,
              }}
            >
              <MovieCard
                titleStyle={styles.title}
                detailType="DetailTheaterScreen"
                url={props.route.url}
                darkTheme={darkTheme}
                {...item}
                {...section.info}
              />
            </View>
          )}
          renderSectionHeader={({ section: { date } }) => (
            <Text
              style={[
                styles.header,
                {
                  color: colors.text_color,
                  backgroundColor: colors.gray,
                  fontWeight: "400",
                  fontSize: 16,
                },
              ]}
            >
              {moment(date).format("DD MMMM, dddd")}
            </Text>
          )}
        />
      )}
    </View>
  );
}
