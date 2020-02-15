import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
 
  TouchableOpacity,
  View,
} from 'react-native';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TheaterScreen from '../screens/TheaterScreen'
import DetailMovieScreen from '../screens/DetailMovieScreen';
import { Appbar } from 'react-native-paper';
import { BottomNavigation, Text } from "react-native-paper";

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details:DetailMovieScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';



const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});

tabNavigator.path = '';

function dd(){
  return (
    <HomeStack/>
  );
}
export default class BottomNavigator extends React.Component {
  constructor(props){
    super(props)
   
    this.state = {
      index: 0,
      routes: [
        { key: "Afisha", title: "Афиша", icon: "filmstrip", color: "#EF0000",navigation:this.props.navigation},
        { key: "Theater", title: "Театр", icon: "drama-masks", color: "#000" },
        { key: "Calendar", title: "События", icon: "calendar-star", color: "#6518f4" },
        { key: "Stuff3", title: "Клубы", icon: "account-multiple", color: "#006d6a",  }
      ]
    };
  }


  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    Afisha:HomeScreen,
    Theater: TheaterScreen,
    Calendar: SettingsScreen,
    Stuff3: SettingsScreen,
  });

  render() {
    return (
      <BottomNavigation
       
        shifting={true}
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}
