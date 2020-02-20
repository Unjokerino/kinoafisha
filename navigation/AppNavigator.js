import * as React from "react";
import { View, Text, Image } from "react-native";
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
import { TouchableOpacity } from "react-native-gesture-handler";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function CustomDrawerContent(props) {
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
          source={require("../assets/images/icon.png")}
        ></Image>
      </View>
      <DrawerItemList {...props} />

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end"
        }}
      >
        <TouchableOpacity
          style={{
            marginHorizontal: 8,
            paddingVertical: 8,
            borderColor: "#fff",
            borderWidth: 2,
            borderRadius: 6,
            marginBottom: 10,
            backgroundColor: "#fff"
          }}
        >
          <Text style={{ color: "#000", textAlign: "center" }}>Ноябрьск</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginHorizontal: 8,
            paddingVertical: 8,
            borderColor: "#fff",
            borderWidth: 2,
            borderRadius: 6
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Вынгапур</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => CustomDrawerContent(props)}
        drawerContentOptions={{
          activeTintColor: "#fff",
          inactiveTintColor: "#fff"
        }}
        drawerStyle={{
          backgroundColor: "#000",
          color: "#fff",
          activeTintColor: "#fff"
        }}
      >
        <Drawer.Screen
          color="#fff"
          active
          name="Главная"
          icon="phone"
          component={MainTabNavigator}
        />
        <Drawer.Screen name="Новости" icon="menu" component={NewsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
