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
import MovieCard from '../components/MovieCard'
import { Appbar, Title, FAB, Portal, Provider } from 'react-native-paper';
import { MonoText } from '../components/StyledText';

const deviceWidth = Dimensions.get('window').width;

export default function DetailMovieScreen(props) {

    return (

        <View style={{paddingTop:30}}>
            <Appbar style={{backgroundColor:'#EF0000',elevation:0}}>
                <Appbar.Action icon="arrow-left" onPress={() => {
                    props.navigation.goBack()   }} />
                <Appbar.Content title=""></Appbar.Content>
            </Appbar>
            <Text>NE HI</Text>
        </View>
    )
}