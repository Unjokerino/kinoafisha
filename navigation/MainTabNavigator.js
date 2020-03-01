import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Platform, View, StatusBar } from "react-native";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TheaterScreen from "../screens/TheaterScreen";
import EventsScreen from "../screens/EventsScreen";
import ClubsScreen from "../screens/ClubsScreen";
import WebViewScreen from "../screens/WebViewScreen";

import DetailNewsScreen from "../screens/DetailNewsScreen";
import DetailMovieScreen from "../screens/DetailMovieScreen";
import DetailTheaterScreen from "../screens/DetailTheaterScreen";
import DetailClubScreen from "../screens/DetailClubScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNavigation, Text, Appbar } from "react-native-paper";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";
const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const tabNavigator = createBottomTabNavigator({
  HomeScreen,
  TheaterScreen,
  SettingsScreen
});

tabNavigator.path = "";


class BottomNavigator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cind: global.currentScreen,
      index: props.route.params !== undefined ? props.route.params.screenIndex : 0,
      routes: [
        {
          key: "Afisha",
          title: "Афиша",
          icon: "filmstrip",
          color: "#EF0000",
          navigation: this.props.navigation
        },
        {
          key: "Theater",
          title: "Театр",
          icon: "drama-masks",
          color: "#000",
          navigation: this.props.navigation
        },
        {
          key: "Calendar",
          title: "События",
          icon: "calendar-star",
          color: "#6518f4",
          navigation: this.props.navigation
        },
        {
          key: "Clubs",
          title: "Клубы",
          icon: "account-multiple",
          color: "#006d6a",
          navigation: this.props.navigation
        }
      ]
    };
  }
  componentDidMount(){
    this.setState({index: this.props.route.params.screenIndex} )
  }




  _handleIndexChange = index => {this.setState({ index })};

  _renderScene = BottomNavigation.SceneMap({
    Afisha: HomeScreen,
    Theater: TheaterScreen,
    Calendar: EventsScreen,
    Clubs: ClubsScreen
  });

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 30,
            backgroundColor: this.state.routes[this.state.index].color
          }}
        />
   
        <Appbar
          style={{
            backgroundColor: this.state.routes[this.state.index].color,
            elevation: 0
          }}
        >
          <Appbar.Action
            icon="menu"
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Appbar.Content title={this.state.routes[this.state.index].title} />
        </Appbar>
        <BottomNavigation
          shifting={true}
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
        />
      </View>
    );
  }
}
const Stack = createStackNavigator();

export default function NavigationStuckScreen(props) {
  let screenIndex = props.route.params != undefined ? props.route.params.screen : 0
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false
        }}
        initialParams={{screenIndex:screenIndex}}
        name="Feed"
        {...props}
        component={BottomNavigator}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="DetailMovieScreen"
        component={DetailMovieScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="DetailTheaterScreen"
        component={DetailTheaterScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="DetailClubScreen"
        component={DetailClubScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="WebViewScreen"
        component={WebViewScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="DetailNewsScreen"
        component={DetailNewsScreen}
      />
    </Stack.Navigator>
  );
}
