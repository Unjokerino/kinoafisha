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

  function renderContent() {
    console.log(props);
    return (
      <View style={{ backgroundColor: "#FBFBFB", flex: 1 }}>
        <Headline>Информация</Headline>
        <Caption>Дата события</Caption>
        {theaterData.seanses.map(val => {
          return <Text>{moment(val.date).format("DD/MM HH:MM")}</Text>;
        })}
        <Caption>Место события</Caption>
        <Text>{theaterData.mesto_sobitiya}</Text>
        <Caption>Стоимость</Caption>
        <Text>{theaterData.price}</Text>
        <Caption>Режисер</Caption>
        <Text>{theaterData.regiser}</Text>
        <Caption>Актерский состав</Caption>
        <Text>{theaterData.acters}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 30,
          backgroundColor: "#000"
        }}
      />
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={200}
        extraScrollHeight={20}
        navbarColor="#EF0000"
        title={
          <View
            style={{
              backgroundColor: "#00000052",
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#fff" }}>{theaterData.name}</Text>
          </View>
        }
        titleStyle={styles.titleStyle}
        backgroundImage={images.background}
        backgroundImageScale={1.2}
        renderNavBar={() => renderNavBar(props.navigation)}
        renderContent={renderContent}
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}
        innerContainerStyle={styles.container}
        scrollViewProps={{
          onScrollBeginDrag: () => console.log("onScrollBeginDrag"),
          onScrollEndDrag: () => console.log("onScrollEndDrag")
        }}
      />
    </View>
  );
}

function renderNavBar(navigation) {
  return (
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconLeft} onPress={() => {}}>
          <Appbar.Action
            color="#fff"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconRight}
          onPress={() => {}}
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
