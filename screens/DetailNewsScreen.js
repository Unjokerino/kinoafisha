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
  FlatList,
  Linking
} from "react-native";
import moment from "moment";
import MovieCard from "../components/MovieCard";
import {
  Appbar,
  Title,
  FAB,
  Provider,
  Headline,
  Portal,
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

export default function DetailNewsScreen(props) {
  const newsData = props.route.params;

  const images = {
    background: {
      uri:
        newsData.img_sobitiya === ""
          ? "https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png"
          : newsData.img_sobitiya
    }
  };

  function renderContent() {
    return (
      <View
        style={{
          backgroundColor: "#FBFBFB",
          flex: 1,
          alignItems: "center",
          paddingHorizontal: 8
        }}
      >
        <Text
          style={{ textAlign: "center", fontFamily: "Roboto", paddingTop: 30 }}
        >
          {newsData.mobile.replace('<?xml encoding=\"utf8\" ?>','')}
        </Text>

        <TouchableOpacity
          onPress={() => {
            Linking.openURL(newsData.link);
          }}
          style={{
            borderRadius: 10,
            borderColor: "#990000",
            borderWidth: 1,
            paddingVertical: 8,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
            elevation: 2,
            backgroundColor: "#fff",
            marginHorizontal: 20
          }}
        >
          <Text style={{ textAlign: "center", fontFamily: "Roboto" }}>
            {" "}
            Перейти на сайт на страницу новости
          </Text>
        </TouchableOpacity>
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
          <Appbar.Content title={newsData.name}></Appbar.Content>
          <TouchableOpacity
            style={styles.iconRight}
            onPress={() => {}}
          ></TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <Provider style={styles.container}>
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
        navbarColor="#006d6a"
        title={
          <View
            style={{
              flex: 1,
              backgroundColor:'#0000006e',
              justifyContent: "flex-end",
              alignItems: "flex-end",
              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                maxWidth: 200,
                color: "#fff",
                fontSize: 14
              }}
            >
              
            </Text>
          </View>
        }
        alwaysShowTitle={false}
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
    </Provider>
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
    
    fontSize: 18
  }
});
