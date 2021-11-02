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
  Linking,
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
  Caption,
} from "react-native-paper";
import { MonoText } from "../components/StyledText";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import COLORS from "../assets/colors";
import MoreEvents from "../components/MoreEvents";

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

  const styles = StyleSheet.create({
    appbarr: {
      marginTop: 30,
      backgroundColor: colors.background_color,
      elevation: 0,
    },
    box: { paddingHorizontal: 8, flexDirection: "column" },
    container: {
      flex: 1,
      backgroundColor: colors.background_color,
    },
    text: {
      textAlign: "center",
      color: colors.text_color,
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
      backgroundColor: colors.card_color,
      color: colors.text_color,
      fontWeight: "bold",
      textAlign: "center",
      fontFamily: "Roboto",
      paddingTop: 30,
      elevation: 1,
      paddingVertical: 8,
      paddingHorizontal: 4,
      marginTop: 10,
      paddingBottom: 20,
    },
    buttonContainer: {
      position: "absolute",
      bottom: 0,
      alignSelf: "center",
      paddingHorizontal: 6,
      borderRadius: 14,
      borderColor: "#03a9f4",
      borderWidth: 2,
      paddingVertical: 12,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 20,
      elevation: 2,
      backgroundColor: colors.card_color,
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

  useEffect(() => {}, []);

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
      <View style={styles.container}>
        <Title style={styles.text}>{clubData.name}</Title>
        <Text style={styles.description}>
          {clubData.mobile
            ? clubData.mobile.replace('<?xml encoding="utf8" ?>', "")
            : clubData.description.replace('<?xml encoding="utf8" ?>', "")}
        </Text>
        <Caption
          style={[
            {
              textAlign: "center",
              paddingHorizontal: 16,
              fontFamily: "Roboto",
              marginBottom: 50,
            },
            styles.text,
          ]}
        >
          Увидеть положение и подать заявку на вступление вы можете на нашем
          сайте
        </Caption>
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
            <Caption style={styles.text}>
              Функция записи будет скоро доступна
            </Caption>
          </TouchableOpacity>
        </Portal>
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

  return (
    <Provider style={styles.container}>
      <View
        style={{
          backgroundColor: "#000",
        }}
      />
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={200}
        extraScrollHeight={20}
        navbarColor="#006d6a"
        title={""}
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
          onScrollEndDrag: () => console.log("onScrollEndDrag"),
        }}
      />
    </Provider>
  );
}
