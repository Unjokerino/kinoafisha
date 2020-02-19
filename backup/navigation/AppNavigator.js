import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabNavigator from "./MainTabNavigator";
import NewsScreen from "../screens/NewsScreen";
import DetailMovieScreen from "../screens/DetailMovieScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Главная"
          icon="menu"
          component={MainTabNavigator}
        />
        <Drawer.Screen name="Новости" icon="menu" component={NewsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
