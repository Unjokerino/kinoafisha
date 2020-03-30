import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabNavigator from "./MainTabNavigator";
import NewsStuck from "./NewsStuck";
import SettingsScreen from "../screens/SettingsScreen"
import SoonOnScreensStuck from "./SoonOnScreensStuck";
import { List, Colors } from 'react-native-paper';

import DetailMovieScreen from "../screens/DetailMovieScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,

} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function CustomDrawerContent(props, city, setCity) {




  async function getCity() {
    const value = await AsyncStorage.getItem('city');
    return value
  }

  return (
    <DrawerContentScrollView style={{ flex: 1 }} {...props}>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          style={{ height: 100, width: 100 }}
          source={require("../assets/images/iconBlack.png")}
        />
      </View>
      <DrawerItemList  {...props} />
      <TouchableOpacity onPress={
        () => {
          console.log(props.navigation.jumpTo("Театр"))
        }
      }>

      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          marginTop:10,
          justifyContent: "flex-end"
        }}
      >
        <TouchableOpacity
          onPress={async () => {
            const city = await AsyncStorage.setItem('city', 'Ноябрьск');
            setCity('Ноябрьск')
          }}
          style={[styles.cityCard, city === "Ноябрьск" && styles.activeCard]}
        >
          <Text style={[styles.text, city === "Ноябрьск" && styles.activeText]}>Ноябрьск</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const city = await AsyncStorage.setItem('city', 'Вынгапур');
            setCity('Вынгапур')
          }}
          style={[styles.cityCard, city === "Вынгапур" && styles.activeCard]}
        >
          <Text style={[styles.text, city === "Вынгапур" && styles.activeText]}>Вынгапур</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

function App() {
  const [city, setCity] = useState("Ноябрьск")
  let darkTheme = "0"
  useEffect(() => {
    isDarkTheme().then(e => darkTheme = e)
  }, [])

  async function isDarkTheme() {
    let darkTheme = await AsyncStorage.getItem('darkTheme')
    return darkTheme
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        key={city + darkTheme}
        drawerContent={props => CustomDrawerContent(props, city, setCity, props.navigation)}
        drawerContentOptions={{
          activeTintColor: "#fff",
          inactiveTintColor: "#fff",
          iconContainerStyle: {
            opacity: 1,
          },
        }}

        drawerStyle={{
          backgroundColor: "#000",
          color: "#fff",
          activeTintColor: "#fff"
        }}
      >
        <Drawer.Screen
          options={{
            drawerIcon: ({ tintColor }) => (
              <List.Icon style={{ padding: 0, margin: 0 }} color={Colors.white} icon="filmstrip" />
            )
          }}
          initialParams={{ screen: 0, city: city }} name={"Кино"} icon="menu" component={MainTabNavigator} />
        <Drawer.Screen options={{
          drawerIcon: ({ tintColor }) => (
            <List.Icon style={{ padding: 0, margin: 0 }} color={Colors.white} icon="drama-masks" />
          )
        }} initialParams={{ screen: 1, city: city }} name="Театр" icon="menu" component={MainTabNavigator} />
        <Drawer.Screen options={{
          drawerIcon: ({ tintColor }) => (
            <List.Icon style={{ padding: 0, margin: 0 }} color={Colors.white} icon="calendar-star" />
          )
        }} initialParams={{ screen: 2, city: city }} name="Афиша" icon="menu" component={MainTabNavigator} />
        <Drawer.Screen options={{
          drawerIcon: ({ tintColor }) => (
            <List.Icon style={{ padding: 0, margin: 0 }} color={Colors.white} icon="account-multiple" />
          )
        }} initialParams={{ screen: 3, city: city }} name="Клубы" icon="menu" component={MainTabNavigator} />
        <Drawer.Screen options={{
          drawerIcon: ({ tintColor }) => (
            <List.Icon style={{ padding: 0, margin: 0 }} color={Colors.white} icon="filmstrip" />
          )
        }} name="Скоро в кино" icon="menu" component={SoonOnScreensStuck} />
        <Drawer.Screen options={{
          drawerIcon: ({ tintColor }) => (
            <List.Icon style={{ padding: 0, margin: 0 }} color={Colors.white} icon="newspaper" />
          )
        }} name="Новости" icon="menu" component={NewsStuck} />

        <Drawer.Screen options={{
          drawerIcon: ({ tintColor }) => (
            <List.Icon style={{ padding: 0, margin: 0 }} color={Colors.white} icon="settings" />
          )
        }} name="Настройки" icon="settings" component={SettingsScreen} />
        

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  cityCard: {
    marginHorizontal: 8,
    paddingVertical: 8,
    borderColor: "#fff",
    borderWidth: 2,
    color: '#fff',
    borderRadius: 6,
    marginBottom: 10,

  },
  text: {
    textAlign: "center",
    color: "#fff"
  },
  activeText: {
    color: "#000"
  },
  activeCard: {
    borderColor: "#fff",
    color: '#000',
    backgroundColor: "#fff"
  }
})