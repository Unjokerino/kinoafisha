import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
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
import MoreEvents from "../components/MoreEvents"
import HorizontalItemCard from "../components/HorizontalItemCard"
import COLORS from "../assets/colors"

const deviceWidth = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;



export default function DetailTheaterScreen(props) {
  const [colors,setColors] = useState(props.route.params.darkTheme ? COLORS.DARK : COLORS.LIGHT)
  const [darkTheme,setdarkTheme] = useState("0")
  const theaterData = props.route.params;
  
  const styles = StyleSheet.create({
    appbarr: {
      marginTop: 30,
      backgroundColor: colors.background_color,
      elevation: 0
    },
    otherEvents:{
      marginVertical:10
    },
    box: { paddingHorizontal: 8, flexDirection: "column" },
    container: {
      flex: 1,
      backgroundColor: colors.background_color
    },
    contentContainer: {
      flexGrow: 1,
      color: colors.text_color
    },
    tag: {
      borderRadius: 5,
      borderColor: '#f1f1f1',
      borderWidth: 1,
      maxWidth: 100,
      marginVertical: 5,
      alignItems: 'center',
      paddingVertical: 5,
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
      color: colors.text_color
    },
    text: {
      color: colors.text_color
    },
    caption: {
      color: colors.caption_color
    },
    navBar: {
      height: NAV_BAR_HEIGHT,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: "transparent"
    },
    titleStyle: {
      color: colors.text_color,
      fontWeight: "bold",
      fontSize: 18
    }
  });

  useEffect(()=>{
    isDarkTheme()
  },[])

  async function isDarkTheme(){
    let darkTheme = await AsyncStorage.getItem('darkTheme')
    setdarkTheme(darkTheme)
    darkTheme === "1" ? setColors(COLORS.DARK) : setColors(COLORS.LIGHT)
  }

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
      <View style={{ height: 30, backgroundColor: '#6518f4' }}></View>
      <Appbar
        style={{

          zIndex: 999,
          elevation: 2,
          backgroundColor: '#6518f4'
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
            backgroundColor: colors.background_color,
            flex: 1,

          }}
        >
          <Image style={{ width: '100%', height: 200, }} source={{
            uri:
              theaterData.img_sobitiya == ""
                ? "https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png"
                : theaterData.img_sobitiya
          }}></Image>
          <View
            style={{
              backgroundColor: colors.background_color,
              paddingHorizontal: 8


            }}
          >


            <Headline style={styles.text}>Информация</Headline>
            <Caption style={styles.caption}>Дата события</Caption>
            {theaterData.seanses.map(val => {
              return (<TouchableOpacity onPress={ () =>{
                if(theaterData.id_film && val.id_session ){
                  props.navigation.navigate("WebViewScreen", {
                    url: `https://kinowidget.kinoplan.ru/seats/776/${theaterData.id_film}/${val.id_session}`,
                    name: theaterData.name
                  })
                }

                }
              }
                style={styles.tag}><Text style={styles.title}>{moment(val.date).format("DD/MM HH:MM")}</Text></TouchableOpacity>)
            })}
            <Caption style={styles.caption}>Место события</Caption>
            <Text style={styles.title}>{theaterData.mesto_sobitiya}</Text>
            {theaterData.price ? <View><Caption style={styles.caption}>Стоимость</Caption>
            <Text style={styles.title}>{theaterData.price}</Text></View> : false}
            {theaterData.caption ? <Caption style={styles.caption}>{theaterData.acters_sostav.length > 0 ? 'Актерский состав' : ''}</Caption> : false}
            <View>{theaterData.acters_sostav.length > 0 ? theaterData.acters_sostav.map(actor => {
              return <Text style={styles.title}>{actor.post_title}</Text>
            }) : <Text></Text>}</View>
            <Text style={[styles.title, {
              paddingVertical: 10, fontSize: 13, borderColor: "#f1f1f1",
              borderRadius: 5,
              borderTopWidth: 1, marginTop: 15
            }]}>{theaterData.mobile !== '' ? theaterData.mobile.replace('<?xml encoding=\"utf8\" ?>', '') : 'Описания пока нет :('}</Text>
          </View>
        </View>
        <MoreEvents url={theaterData.url} skipDateCheck={true} name={theaterData.name} target="DetailTheaterScreen" navigation={props} />

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


