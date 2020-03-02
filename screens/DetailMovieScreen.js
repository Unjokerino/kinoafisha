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
import { WebView } from "react-native-webview";
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

export default function DetailMovieScreen(props) {
  const movieData = props.route.params;
  const [dates, setDates] = useState([]);
  const [currentMovie, setCurrentMovie] = useState([]);
  const [seanses, setSeanses] = useState([]);
  const [loading,setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(movieData.current_date));

  function renderNavBar(navigation) {
    return (
      <View style={styles.navContainer}>
        <View style={styles.statusBar} />
        <View style={styles.navBar}>
          <TouchableOpacity style={[styles.iconLeft,{display:'flex',opacity:1,zIndex:999}]} onPress={() => { }}>
            <Appbar.Action
              color="#fff"
              icon="arrow-left"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Appbar.Content
              color="#fff"
              title={movieData.name}
             
            />
          <TouchableOpacity
            style={styles.iconRight}
            onPress={() => { }}
          ></TouchableOpacity>
        </View>
      </View>
    );
  }

  useEffect(() => {
    props.route.params.movies.forEach(element => {
      if (element.id_film === movieData.id_film) {
        setCurrentMovie(element);
        setCurrentDate(new Date(movieData.current_date))
        checkDate(currentDate, element).then((dates) => {
          setSeanses(dates);
          
          setLoading(false)});
      }
    }),
      setDates(getDates());
     

  }, []);

  useEffect(() => {
    console.log(dates);
    setLoading(true)
    checkDate(currentDate, currentMovie).then((dates) => {setSeanses(dates);   setLoading(false)});

  }, [currentDate]);

  const images = {
    background: {
      uri:
        movieData.poster === ""
          ? "https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png"
          : movieData.poster
    }
  };

  async function checkDate(date, movie) {

    let seansesOnDate = [];
    if (movie.seanses != undefined) {
      let avalableMovie = JSON.stringify(movie);
      avalableMovie = JSON.parse(avalableMovie);

      let avalableSeanses = [];

      avalableMovie.seanses.forEach(seans => {
        let seansDate = new Date(moment(seans.date));

        if (seansDate.getDate() === date.getDate()) {
          avalableSeanses.push(seans);
        }
      });

      seansesOnDate.push(...avalableSeanses);
    }
    return seansesOnDate;
  }

  function setCurrentSeanses(date) { }

  function renderContent() {
    return (
      <View style={{ backgroundColor: "#FBFBFB", flex: 1 }}>
       
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 8,
            alignItems: "center"
          }}
        >
          
          <Headline>Расписание</Headline>
          <Text>
            {movieData.type_film} | {movieData.vozvrast}+
          </Text>
        </View>

        <View
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          containerStyle={{
            maxHeight: 50,
            alignItems: "center",
            justifyContent: "center"
          }}
          style={{
            height: 50,
            backgroundColor: "#fff",
            flexDirection: "row",
            elevation: 1,
            justifyContent: "center",
            flexWrap: "wrap",
            marginVertical: 8
          }}
        >
     
          {dates.map(date => {
            return (
              <TouchableOpacity
                key={date.getDate()+date.getMonth()}
                onPress={() => {
                  setCurrentDate(date);
                }}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  backgroundColor:
                    currentDate.getDate() === date.getDate()
                      ? "#EF0000"
                      : "#fff",
                  paddingHorizontal: 16,
                  paddingVertical: 8
                }}
              > 
          
                <Text
                  style={{
                    textAlign: "center",

                    color:
                      JSON.stringify(currentDate) == "null" ?  () => setCurrentDate(new Date(props.route.params.cur_date)) : currentDate.getDate() === date.getDate() ? "#fff" : "#000"                  
                    }}
                >
                  {date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <ScrollView style={styles.box}>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom:15
            }}
          >
            {seanses.map(seans => {
              return (
                <TouchableOpacity
                  key={moment(seans.date).format("HH:mm")}
                  onPress={() => {
                    props.navigation.navigate("WebViewScreen", {
                      url: `https://kinowidget.kinoplan.ru/seats/776/${movieData.id_film}/${seans.id_session}`,
                      name: movieData.name
                    });
                  }}
                  style={{
                    marginRight: 10,
                    marginBottom: 5,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 5,
                    borderColor: "#f1f1f1",
                    borderWidth: 1,

                    alignSelf: "flex-start"
                  }}
                >
                  <Text>
                    {moment(seans.date).format("HH:mm")} | {seans.type_zal}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <WebView
            style={{ marginTop: (Platform.OS == 'ios') ? 20 : 0, width: '100%', height: 250 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{ uri: 'https://www.youtube.com/embed/' + movieData.youtube }}
          />
       
        
          <View
            style={{
              marginTop: 20,
              borderColor: "#f1f1f1",
              borderRadius: 5,
              borderWidth: 1,
              padding: 16
            }}
          >
          <View style={{borderBottomColor:'#f1f1f1',borderBottomWidth:1}}>  
          <Text style={[styles.title, { fontSize: 18 }]}>{movieData.name}</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>

              <Caption>{movieData.ganre.join(', ')} </Caption>

            </View>
          </View>
            <Caption>Описание</Caption>
            <Text style={[{

              paddingVertical: 0, 
              borderColor: "#f1f1f1",
              borderRadius: 5,
              fontSize:13,
              fontFamily:'Roboto',
              
              
            }]}>
              {movieData.mobile !== '' ? movieData.desc.replace('<?xml encoding=\"utf8\" ?>', '') : 'Описания пока нет :('}
            </Text>
            <Caption>Cтрана</Caption>
            <View style={{ flexDirection: "row",  flexWrap: "wrap" }}>
              <Text style={styles.title}>{movieData.country.join(', ')} </Text>
            </View>
            <Caption>Режисер</Caption>
            <Text style={styles.title}>{movieData.regisser}</Text>
            <Caption>В главных ролях</Caption>
            <Text style={styles.title}>{movieData.acters} </Text>

          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 30,
          backgroundColor: Platform.OS === "ios" ? "#fff" : "#000"
        }}
      />
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={200}
        extraScrollHeight={20}
        navbarColor="#EF0000"
        alwaysShowTitle={false}
        
        title={
        <TouchableOpacity 
          onPress={() =>{ 
            props.navigation.navigate("WebViewScreen", {
            url: 'https://www.youtube.com/embed/' + movieData.youtube,
            name: movieData.name
          })}} 
          style={{height:'100%',width:'100%',justifyContent:'center',backgroundColor:'#11111154',justifyContent:'center',
        }}>
          <Title style={{color:'#fff',fontFamily:'Roboto',textAlign:'center',marginHorizontal:10}}>{""}</Title>
        
        </TouchableOpacity>}
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

function getDates() {
  let dates = [];
  for (let i = 0; i < 7; i++) {
    let date = new Date();
    dates.push(new Date(date.setDate(date.getDate() + i)));
  }
  return dates;
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
  title: {
    fontSize:13,
    fontFamily: 'Roboto',
    
  },
  iconLeft:{
    opacity:1,
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