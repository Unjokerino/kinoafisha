import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Platform, View, StatusBar, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TheaterScreen from "../screens/TheaterScreen";
import ClubsScreen from "../screens/ClubsScreen";
import WebViewScreen from "../screens/WebViewScreen";
import DateTimePicker from "@react-native-community/datetimepicker";
import DetailNewsScreen from "../screens/DetailNewsScreen";
import DetailMovieScreen from "../screens/DetailMovieScreen";
import DetailTheaterScreen from "../screens/DetailTheaterScreen";
import DetailClubScreen from "../screens/DetailClubScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNavigation, Text, Appbar } from "react-native-paper";
import MoviesOnDateScreen from "../screens/MoviesOnDateScreen";
import { Burger2Icon, CalendarIconNew, StarIcon } from "../assets/icons";

const tabNavigator = createBottomTabNavigator({
  HomeScreen,
  TheaterScreen,
  SettingsScreen,
});

tabNavigator.path = "";

class BottomNavigator extends React.Component {
  constructor(props) {
    super(props);
    let darkTheme;
    this.state = {
      date: new Date(),
      mode: "date",
      showDatePicker: false,
      cind: global.currentScreen,
      darkTheme: false,
      index:
        props.route.params !== undefined ? props.route.params.screenIndex : 0,
      routes: [
        {
          key: "Afisha",
          title: "Афиша",
          darkTheme: darkTheme,
          url: "http://rus-noyabrsk.ru/platforms/themes/blankslate/kino.json",
          icon: "filmstrip",
          color: "#EF0000",
          navigation: this.props.navigation,
        },
        {
          key: "Theater",
          title: "Театр",
          url: "http://rus-noyabrsk.ru/platforms/themes/blankslate/theatre.json",
          darkTheme: darkTheme,
          icon: "drama-masks",
          color: "#000",
          navigation: this.props.navigation,
        },
        {
          key: "Events",
          url: "http://rus-noyabrsk.ru/platforms/themes/blankslate/afisha.json",
          title: "События",
          darkTheme: darkTheme,
          icon: "calendar-star",
          color: "#6518f4",
          navigation: this.props.navigation,
        },
        {
          key: "Clubs",
          title: "Клубы",
          url: "http://rus-noyabrsk.ru/platforms/themes/blankslate/clubs.json",
          darkTheme: darkTheme,
          icon: "account-multiple",
          color: "#006d6a",
          navigation: this.props.navigation,
        },
      ],
    };
  }

  onChange = (event, selectedDate) => {
    this.setState({ showDatePicker: false });
    if (selectedDate) {
      const currentDate = selectedDate;
      const currentRoute = this.state.routes[this.state.index];

      this.setState({ date: currentDate });
      this.props.navigation.navigate("MoviesOnDateScreen", {
        url: currentRoute.url,
        date: currentDate,
        backgroundColor: currentRoute.color,
      });
    }
  };

  showMode = (currentMode) => {
    this.setState({ showDatePicker: true });
    this.setState({ mode: currentMode });
  };

  showDatepicker = () => {
    this.showMode("date");
  };

  componentDidMount() {
    this._getDarkTheme();
    this.setState({ index: this.props.route.params.screenIndex });
  }

  _getDarkTheme = async () => {
    let darkTheme = await AsyncStorage.getItem("darkTheme");
    darkTheme = darkTheme === "1" ? "1" : "0";
    this.darkTheme = darkTheme;
    this.setState({
      darkTheme: darkTheme,
    });
  };

  _handleIndexChange = (index) => {
    this.setState({ index });
  };

  _renderScene = BottomNavigation.SceneMap({
    Afisha: HomeScreen,
    Theater: TheaterScreen,
    Events: TheaterScreen,
    Clubs: ClubsScreen,
  });

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          animated={true}
          backgroundColor={this.state.routes[this.state.index].color}
        />
        {Platform.OS === "ios" && (
          <View
            style={{
              height: 30,
              backgroundColor: this.state.routes[this.state.index].color,
            }}
          />
        )}

        <Appbar
          style={{
            backgroundColor: this.state.routes[this.state.index].color,
            elevation: 0,
          }}
        >
          <TouchableOpacity
            style={{ paddingLeft: 24 }}
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Burger2Icon />
          </TouchableOpacity>

          <Appbar.Content title={this.state.routes[this.state.index].title} />

          {this.state.index < 3 && (
            <TouchableOpacity
              style={{ paddingLeft: 24 }}
              onPress={() => this.showDatepicker()}
            >
              <CalendarIconNew />
            </TouchableOpacity>
          )}
          <Appbar.Action
            icon={
              this.state.darkTheme === "1"
                ? "theme-light-dark"
                : () => <StarIcon />
            }
            onPress={async () => {
              let darkTheme = await AsyncStorage.getItem("darkTheme");
              darkTheme = darkTheme === "1" ? "0" : "1";
              this.darkTheme = darkTheme;
              await AsyncStorage.setItem("darkTheme", darkTheme);
              darkTheme = await AsyncStorage.getItem("darkTheme");

              this.setState({
                darkTheme: darkTheme,
              });
            }}
          />
        </Appbar>

        <BottomNavigation
          key={this.state.darkTheme}
          shifting={true}
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
        />
        {this.state.showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={this.state.date}
            mode={this.state.mode}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
          />
        )}
      </View>
    );
  }
}
const Stack = createStackNavigator();

export default function NavigationStuckScreen(props) {
  let screenIndex =
    props.route.params != undefined ? props.route.params.screen : 0;
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        initialParams={{ screenIndex: screenIndex }}
        name="Feed"
        {...props}
        component={BottomNavigator}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="DetailMovieScreen"
        component={DetailMovieScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="DetailTheaterScreen"
        component={DetailTheaterScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="DetailClubScreen"
        component={DetailClubScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="WebViewScreen"
        component={WebViewScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="DetailNewsScreen"
        component={DetailNewsScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="MoviesOnDateScreen"
        component={MoviesOnDateScreen}
      />
    </Stack.Navigator>
  );
}
