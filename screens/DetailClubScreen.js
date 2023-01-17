import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar, Caption, Portal, Provider, Title } from "react-native-paper";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import COLORS from "../assets/colors";
import MoreEvents from "../components/MoreEvents";
import { useColors } from "../hooks/useColors";

const deviceWidth = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

export default function DetailClubScreen(props) {
  const clubData = props.route.params;
  const [colors, setcolors] = useState(
    clubData.darkTheme === "1" ? COLORS.DARK : COLORS.LIGHT
  );

  const { darkTheme: stringDarkTheme } = useColors();
  const darkTheme = stringDarkTheme === "1" ? true : false;

  const styles = StyleSheet.create({
    appbarr: {
      marginTop: 30,
      backgroundColor: colors.background_color,
      elevation: 0,
    },
    box: { paddingHorizontal: 8, flexDirection: "column" },
    container: {
      flex: 1,
      paddingHorizontal: 14,
      paddingTop: 17,
      backgroundColor: colors.background_color,
    },
    title: {
      textAlign: "left",
      color: darkTheme ? "#fff" : "#000",
      fontFamily: "Roboto",
      fontSize: 18,
    },

    contentContainer: {
      flexGrow: 1,
      color: colors.text_color,
    },
    navContainer: {
      height: HEADER_HEIGHT,
      marginHorizontal: 10,
    },
    statusBar: {
      height: STATUS_BAR_HEIGHT,
      backgroundColor: "transparent",
    },
    description: {
      paddingVertical: 25,
      textAlign: "left",
      color: darkTheme ? "#fff" : "#364F6B",
      fontFamily: "Roboto",
      lineHeight: 18,
      fontSize: 13,
    },
    buttonContainer: {
      position: "absolute",
      bottom: 0,
      alignSelf: "center",
      paddingHorizontal: 6,
      borderRadius: 8,

      paddingVertical: 12,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 20,

      backgroundColor: "#EF0000",
    },
    buttonText: {
      color: "#fff",
      paddingHorizontal: 30,
      fontFamily: "Roboto",
      fontWeight: "900",
      fontSize: 18,
    },

    navBar: {
      height: NAV_BAR_HEIGHT,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: "transparent",
    },
    titleStyle: {
      color: colors.text_color,
      fontWeight: "bold",
      fontSize: 18,
    },
  });

  const images = {
    background: {
      uri: clubData.img
        ? clubData.img.url
          ? clubData.img.url
          : clubData.img
        : "https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png",
    },
  };

  function renderContent(colors) {
    const url = "http://rus-noyabrsk.ru/platforms/themes/blankslate/clubs.json";
    return (
      <>
        <Text style={styles.title}>{clubData.name}</Text>
        <Text style={styles.description}>
          {clubData.mobile
            ? clubData.mobile.replace('<?xml encoding="utf8" ?>', "")
            : clubData.description.replace('<?xml encoding="utf8" ?>', "")}
        </Text>
        <MoreEvents
          skipDateCheck={true}
          skipCityCheck={true}
          name={clubData.name}
          url={url}
          target="DetailClubScreen"
          navigation={props}
        />
        <Portal>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(clubData.link);
            }}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Подать заявку на вступление</Text>
          </TouchableOpacity>
        </Portal>
      </>
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

  return (
    <>
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={200}
        extraScrollHeight={20}
        navbarColor="black"
        title={""}
        titleStyle={styles.titleStyle}
        backgroundImage={images.background}
        backgroundImageScale={1.2}
        renderNavBar={() => renderNavBar(props.navigation)}
        renderContent={renderContent}
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}
        scrollViewProps={{
          onScrollBeginDrag: () => console.log("onScrollBeginDrag"),
          onScrollEndDrag: () => console.log("onScrollEndDrag"),
        }}
      />
    </>
  );
}
