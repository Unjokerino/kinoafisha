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
  RefreshControl,
  FlatList,
  AsyncStorage
} from "react-native";
import moment from "moment";
import "moment/src/locale/ru";
import "moment/min/moment-with-locales";
import MovieCard from "../components/MovieCard";
import {
  Appbar,
  Title,
  FAB,
  Portal,
  Provider,
  Headline
} from "react-native-paper";
import COLORS from "../assets/colors"


const deviceWidth = Dimensions.get("window").width;
HomeScreen.navigationOptions = {
  headerShown: false
};

export default function HomeScreen(props) {
  const [theatre, setTheatre] = useState([]);
  const [dates, setDates] = useState([new Date()]);
  const [darkTheme,setdarkTheme] = useState("0")
  const [avalableSeanses, setAvalableSeanses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [colors, setColors] = useState(global.darkTheme ? COLORS.DARK : COLORS.LIGHT)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background_color
    },
    scheduleContainer:{
      backgroundColor:colors.card_color
    },
    scheduleText:{
      fontSize: 16, 
      
      fontWeight: "700",
      color:colors.text_color
    },
    message:{
      textAlign:'center',
      padding:30,
      alignItems:'center',
      flex:1,
      
      justifyContent:'center'
    },
    messageText:{
      textAlign:'center',
      color:colors.text_color,
      fontWeight:'bold'
    },
    scheduleTitle:{
      paddingHorizontal: 10, 
      marginTop: 10,
      color:colors.text_color
    },
    dateText:{ 
      padding: 8, 
      fontSize: 15, 
      fontFamily: "Roboto",
      color:colors.text_color
    },
    headerText: {
      fontSize: 30,
      textAlign: "center",
      margin: 10,
      color: "white",
      fontWeight: "bold"
    },
    scrollView: {
      width: deviceWidth
    }
  });

  function getData() {
    let aTheatres = [];
    try {
      setRefreshing(true);
      fetch(
        props.route.url,
        {
          headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            Pragma: "no-cache"
          }
        }
      ).then(response =>
        response.json().then(text => {
        
          getDates().then((dates) => {setDates(dates); checkDate(dates, text).then((resp) => {
          
          })});
          checkSeanses(text).then(setAvalableSeanses)
          

          setTheatre(text);
          setRefreshing(false);
        })
      );
    } catch (error) {
      console.log(111111, error);
    }
  }

  async function isDarkTheme(){
    let darkTheme = await AsyncStorage.getItem('darkTheme')
    setdarkTheme(darkTheme)
    darkTheme === "1" ? setColors(COLORS.DARK) : setColors(COLORS.LIGHT)
  }

  useEffect(() => {
    isDarkTheme()
    getData();
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.scheduleContainer}>
          <Title style={styles.scheduleTitle}>
            Расписание
          </Title>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getData} />
        }
        style={{}}
      >
        {avalableSeanses.map(event => {
            const seans = event.seanses[0]

            return (
      
                <View>
                  <Text style={{color:colors.text_color}}>{moment(seans.date).format("D MMMM")}</Text>

                  <View style={{ backgroundColor: colors.background_color }}>

                          <View>
                            <MovieCard detailType="DetailTheaterScreen" url={props.route.url} darkTheme={darkTheme} navigation={props} {...event}></MovieCard>
                          </View>
                  
           
                  </View>
                </View>
            )
      })
     }
         </ScrollView>
    </View>
  );
}

function countSeanses(avalableSeanses){
  let count = 0
  avalableSeanses.forEach(seans => {
    seans.forEach(element => {
      count += element.seanses.length 
    });
  });

  return count
}

async function checkSeanses(events){
  let city = await AsyncStorage.getItem('city');
  city ? city : 'Ноябрьск'
  let avalableEvents = []
  events.forEach(event => {
    event.seanses.forEach(seans =>{
      if(seans.city === city){
        let seansDate = new Date(moment(seans.date));
        if (seansDate > new Date()) {
          avalableEvents.push({...event,seanses:[seans]});
        }
      }
    })
  });
  return avalableEvents
}

async function checkDate(dates, all_movies) {
  let startD = new Date();
  let avalableMovies = JSON.stringify(all_movies);
  avalableMovies = JSON.parse(avalableMovies);
  let seansesOnDate = [];
  let city = await AsyncStorage.getItem('city');
  city ? city : 'Ноябрьск'
  
  dates.forEach(date => {
    seansesOnDate[date.getDate()] = [];

    avalableMovies.map((avalableMovie, index) => {
      avalableMovie = JSON.stringify(avalableMovie);
      avalableMovie = JSON.parse(avalableMovie);

      let avalableSeanses = [];
      avalableMovie.seanses.forEach(seans => {
        let seansDate = new Date(moment(seans.date));
        if(seans.city === city){
          if (moment(seansDate).format('DDMMYYYY') === moment(date).format('DDMMYYYY') ) {
            

            avalableSeanses.push(seans);
          }
        }
      });

      avalableMovie.date = date;
      avalableMovie.seanses = avalableSeanses;
      if(avalableSeanses.length > 0)
        seansesOnDate[date.getDate()].push({
          ...avalableMovie
        });
      //console.log(date,avalableMovies[index])
    });
  });

  return seansesOnDate;
}

function checkMonth(month) {
  switch (month) {
    case 1:
      return "Январь";
    case 2:
      return "Февраль";
    case 3:
      return "Март";
    case 4:
      return "Апрель";
    case 5:
      return "Май";
    case 6:
      return "Июнь";
    case 7:
      return "Июль";
    case 8:
      return "Август";
    case 9:
      return "Сентябрь";
    case 10:
      return "Октябрь";
    case 11:
      return "Ноябрь";
    case 12:
      return "Декабрь";

    default:
      return "Январь";
  }
}

async function getDates() {
  let dates = [];
  for (let i = 0; i < 30; i++) {
    let date = new Date();
    dates.push(new Date(date.setDate(date.getDate() + i)));
  }
  return dates;
}


