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
  FlatList
} from "react-native";
import moment from "moment";
import MovieCard from "../components/MovieCard";
import {
  Appbar,
  Title,
  FAB,
  Portal,
  Provider,
  Headline,
  Subheading,
  Caption
} from "react-native-paper";
import { MonoText } from "../components/StyledText";
import ReactNativeParallaxHeader from "react-native-parallax-header";

const deviceWidth = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

export default function DetailTheaterScreen(props) {
  const theaterData = props.route.params;

  const images = {
    background: {
      uri:
        theaterData.img_sobitiya == ""
          ? "https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png"
          : theaterData.img_sobitiya
    }
  };



  return (
    <Provider>
      <View style={{height:30,backgroundColor:'#6518f4'}}></View>
      <Appbar
      style={{

        zIndex: 999,
        elevation: 2,
        backgroundColor:'#6518f4'
      }}
    >
      <Appbar.Action
        icon="arrow-left"
        onPress={() => props.navigation.goBack()}
      />
      <Appbar.Content title={props.route.params.name} />
    </Appbar>
      <ScrollView style={styles.container}>
    

        <View
          style={{
            backgroundColor: "#FBFBFB",
            flex: 1,

          }}
        >
          <Image style={{ width: '100%', height: 200, }} source={{
            uri:
              theaterData.img_sobitiya == ""
                ? "https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png"
                : theaterData.img_sobitiya
          }}></Image>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 8


            }}
          >


            <Headline>Информация</Headline>
            <Caption>Дата события</Caption>
            {theaterData.seanses.map(val => {
              return <Text style={styles.title}>{moment(val.date).format("DD/MM HH:MM")}</Text>;
            })}
            <Caption>Место события</Caption>
            <Text style={styles.title}>{theaterData.mesto_sobitiya}</Text>
            <Caption>Стоимость</Caption>
            <Text style={styles.title}>{theaterData.price}</Text>
            <Caption>{theaterData.acters_sostav.length > 0 ? 'Актерский состав' : ''}</Caption>
            <View>{theaterData.acters_sostav.length > 0 ? theaterData.acters_sostav.map(actor => {
              return <Text style={styles.title}>{actor.post_title}</Text>
            }) : <Text></Text>}</View>
            <Text style={[styles.title, {
              paddingVertical: 10, fontSize: 13, borderColor: "#f1f1f1",
              borderRadius: 5,
              borderTopWidth: 1, marginTop: 15
            }]}>{theaterData.mobile !== '' ? theaterData.mobile.replace('<?xml encoding=\"utf8\" ?>', '') : 'Описания пока нет :('}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Provider>
  );
}

function renderNavBar(navigation) {
  return (
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconLeft} onPress={() => { }}>
          <Appbar.Action
            color="#fff"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconRight}
          onPress={() => { }}
        ></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appbarr: {
    marginTop: 30,
    backgroundColor: "#fff",
    elevation: 0
  },
  box: { paddingHorizontal: 8, flexDirection: "column" },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    flexGrow: 1,
    color: "#000"
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: "transparent"
  },
  title: {
    fontSize: 15,
    fontFamily: 'Roboto',
    
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent"
  },
  titleStyle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  }
});
