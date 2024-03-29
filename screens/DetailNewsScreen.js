import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Dimensions, Linking, Platform, StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  Appbar, Provider
} from "react-native-paper";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import COLORS from "../assets/colors";
import MoreEvents from "../components/MoreEvents";

const deviceWidth = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;



export default function DetailNewsScreen(props) {
  const [darkTheme,setdarkTheme] = useState("0")
  const [colors, setColors] = useState(COLORS.LIGHT)
  const newsData = props.route.params;
  const url = "http://rus-noyabrsk.ru/platforms/themes/blankslate/news.json"

  const images = {
    background: {
      uri:
        newsData.img_sobitiya === ""
          ? "https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png"
          : newsData.img_sobitiya
    }
  };

  async function isDarkTheme(){
    let darkTheme = await AsyncStorage.getItem('darkTheme')
    setdarkTheme(darkTheme)
    darkTheme === "1" ? setColors(COLORS.DARK) : setColors(COLORS.LIGHT)
  }

  useEffect(() =>{
    isDarkTheme()
  },[])

  const styles = StyleSheet.create({
    appbarr: {
      marginTop: 30,
      backgroundColor: "#fff",
      elevation: 0
    },
    box: { paddingHorizontal: 8, flexDirection: "column" },
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    contentContainer: {
      flexGrow: 1,
      color:  colors.background
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

  


  function renderContent() {
    return (
      <View
        style={{
          backgroundColor: colors.card_color,
          flex: 1,
          alignItems: "center",
          paddingHorizontal: 8
        }}
      >
        <Text
          style={{ textAlign: "center",color:colors.text_color, fontFamily: "Roboto", paddingVertical: 35 }}
        >
          {newsData.mobile.replace('<?xml encoding=\"utf8\" ?>','')}
        </Text>
        <View style={{marginBottom:50}}>
          <MoreEvents skipCityCheck={true} skipDateCheck={true}  name={newsData.name} url={url} target="DetailNewsScreen" navigation={props} />
        </View>

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
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(newsData.link);
          }}
          style={{
            borderRadius: 10,
            borderColor: "#990000",
            borderWidth: 1,
            backgroundColor:colors.card_color,
            paddingVertical: 8,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
            position:'absolute',
            bottom:10,
            alignSelf:'center',
            width:'90%',
            elevation: 2,
            
          }}
        >
          <Text style={{ color:colors.text_color,textAlign: "center", fontFamily: "Roboto" }}>
            {" "}
            Перейти на сайт на страницу новости
          </Text>
        </TouchableOpacity>
    </Provider>
  );
}




