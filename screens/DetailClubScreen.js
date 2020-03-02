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

export default function DetailClubScreen(props) {
  const clubData = props.route.params;

  const images = {
    background: {
      uri:
        clubData.preview_img === ""
          ? "https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png"
          : clubData.preview_img
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
      <Title style={{textAlign:'center'}}>{clubData.name}</Title>
        <Text
          style={{backgroundColor:'#fff', fontWeight:'bold', textAlign: "center", fontFamily: "Roboto", paddingTop: 30,elevation:1,paddingVertical:8,paddingHorizontal:4,marginTop:10,paddingBottom:20 }}
        >
          {clubData.mobile.replace('<?xml encoding=\"utf8\" ?>', '')}
        </Text>
        <Caption
          style={{
            textAlign: "center",
            paddingHorizontal: 16,
            fontFamily: "Roboto",
            marginBottom:50,
          }}
        >
          Увидеть положение и подать заявку на вступление вы можете на нашем
          сайте
        </Caption>
        <Portal >
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(clubData.link);
          }}
          style={{
            position:'absolute',
            bottom:0,
            alignSelf:'center',
            paddingHorizontal:6,
            borderRadius: 14,
            borderColor: "#03a9f4",
            borderWidth: 2,
            paddingVertical: 12,
            justifyContent: "center",
            alignItems: "center",
            marginVertical:20,
            elevation: 2,
            backgroundColor: "#fff",
          
          }}
        >
     
        <Caption>Функция записи будет скоро доступна</Caption>
 

        </TouchableOpacity>
        </Portal>
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
        title={""
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
