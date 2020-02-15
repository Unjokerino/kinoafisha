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
    ActivityIndicator,
    Dimensions,
    FlatList,
} from 'react-native';
import moment from 'moment'
import TheaterCard from '../components/TheaterCard'
import { Appbar, Title, FAB, Portal, Provider } from 'react-native-paper';
import { MonoText } from '../components/StyledText';
import 'moment/min/moment-with-locales'
const deviceWidth = Dimensions.get('window').width;
HomeScreen.navigationOptions = {
    headerShown: false,
};


export default function HomeScreen(props) {
    const [theatre, setTheatre] = useState([])
    const [dates, setDates] = useState([new Date()])
    const [avalableSeanses, setAvalableSeanses] = useState([])

    useEffect(() => {

        let aTheatres = []
        try {
            fetch('https://newtime.binarywd.com/jsonfeed/theatre.html', { cache: "no-cache" }).then(response => response.json().then(text => {

                setDates(getDates())

                setTheatre(text)
                dates.forEach(date => {
                    aTheatres.push({theatres:[...checkDate(date, text)], date: date })
                });

                setAvalableSeanses(aTheatres)


            }))
        } catch (error) {
            console.log(111111, error)
        }


    }, [])

    return (
        <View style={styles.container}>
            <Appbar style={{ backgroundColor: '#fff', elevation: 0 }}>
                <Appbar.Action icon="menu" title="ad" onPress={() => console.log('Pressed archive')} />
                <Appbar.Content title="Театр"></Appbar.Content>
            </Appbar>
            <View style={{ backgroundColor: '#fff' }}>
                <Title style={{ paddingHorizontal: 10, marginTop: 10 }}>Расписание</Title>
            </View>
            <ScrollView
            horizontal={true}
                style={{ flexWrap: 'wrap', flexGrow: 1, }}
            >

                {avalableSeanses.map(avalableSeans => {

                    moment.locale('ru')

                    return (
                        <View>
                            <Text>{moment(avalableSeans.date).format('MMM Do')}</Text>
                            <FlatList
                                contentContainerStyle={{ backgroundColor: '#fff', paddingTop: 10 }}
                                style={{ backgroundColor: '#fff' }}
                                nestedScrollEnabled={true}
                                key={avalableSeans.date}
                                showsVerticalScrollIndicator={false}
                                style={styles.scrollView}
                                data={avalableSeans.theatres}
                                renderItem={({ item }) => <TheaterCard {...item} navigation={props.route.navigation} ></TheaterCard>}
                                keyExtractor={item => item.name}
                            />
                        </View>
                    )


                })}

            </ScrollView>
        </View>
    )
}

function checkDate(date, theatres) {
    theatres = JSON.stringify(theatres)
    theatres = JSON.parse(theatres)
    let avalableTheaters = []
    theatres.forEach((avalableMovie, index) => {

        let avalableSeanses = []

        theatres[index].seanses.forEach(seans => {

            let seansDate = new Date(moment(seans.date))

            if (seansDate.getDate() + seansDate.getMonth() + seansDate.getFullYear() === date.getDate() + date.getMonth() + date.getFullYear()) {

                avalableSeanses.push(seans)
            }

        });

        if (avalableSeanses.length > 0) {
            theatres[index].date = date.getDate()
            theatres[index].seanses = avalableSeanses
            avalableTheaters.push(theatres[index])
            //console.log(date,avalableMovies[index])
        } else {
            theatres[index].seanses = []
        }

    });

    return avalableTheaters

}


function getDates() {

    let dates = []
    for (let i = 0; i < 7; i++) {
        let date = new Date();
        dates.push(new Date(date.setDate(date.getDate() + i)))
    }
    return (dates)
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: '#f5f5f5',
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
