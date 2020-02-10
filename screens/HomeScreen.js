import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
} from 'react-native';

import MovieCard from '../components/MovieCard'
import { Appbar } from 'react-native-paper';
import { MonoText } from '../components/StyledText';

const deviceWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [movies, setMovies] = useState([])
  const [dates, setDates] = useState([new Date()])
  const [currentDate, setCurrentDate] = useState(new Date().getDate())
  const [scrollCheckEnabled, setScrollCheckEnabled] = useState(true)
  let scrollListReftop
  useEffect(() => {
    setDates(getDates())
    fetch('https://newtime.binarywd.com/jsonfeed/kino.html').then(response => response.json().then(text => {
      setMovies(text)
    }))
  }, [])

  return (

    <View style={styles.container}>
      <View
        style={{flexDirection:'row',flexWrap:'wrap'}}
      >
        {dates.map(date => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setScrollCheckEnabled(false)
                  setCurrentDate(date.getDate())
                  let offset = date.getDate() - new Date().getDate()
                  scrollListReftop.scrollTo({ x: deviceWidth * offset, y: 0, animated: true })
                  setTimeout(() => {
                    setScrollCheckEnabled(true)
                  }, 500);
                }}
                style={{ backgroundColor: currentDate === date.getDate() ? '#e91e63' : '#fff', paddingVertical: 8, paddingHorizontal: 12, borderColor: 'gray', borderRadius: 4, borderWidth: 1, margin: 5 }}>
                <Text style={{ color: currentDate === date.getDate() ? '#fff' : '#000' }}>{date.getDate() < 10 ? '0' : ''}{date.getDate()}.{date.getMonth() < 10 ? '0' : ''}{date.getMonth() + 1}</Text>
              </TouchableOpacity>

            </View>
          )
        })}
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        ref={(ref) => scrollListReftop = ref}
        onScroll={(event) => {
          if(scrollCheckEnabled){
            let offset = Math.round(event.nativeEvent.contentOffset.x / deviceWidth);
            let date = new Date();
            let newDate = new Date(date.setDate(date.getDate() + offset))
            console.log('new: ',newDate.getDate(), 'cur: ',currentDate)
            if (currentDate !== newDate.getDate()) {
              setCurrentDate(newDate.getDate())
            }
          }


        }}
        horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
        {dates.map(date => {
      
          return (
            <View>
              <FlatList
                nestedScrollEnabled={true}
                key={date}
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} ></MovieCard>}
                keyExtractor={item => item.name}
              />
         </View>
          )
        })}



      </ScrollView>



    </View>
  );
}
function checkDate(date,movies){

  movies.forEach(movie => {
    movie.seanses.forEach(element => {
      
    });
  });

}


function getDates() {

  let dates = []
  for (let i = 0; i < 7; i++) {
    let date = new Date();
    dates.push(new Date(date.setDate(date.getDate() + i)))
  }
  return (dates)
}

HomeScreen.navigationOptions = {
  header: null,
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfc',
  }, headerText: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    color: 'white',
    fontWeight: "bold"
  },
  scrollView: {
    width: deviceWidth,

  },
});
