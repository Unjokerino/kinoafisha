import React from "react";
import DetailNewsScreen from "../screens/DetailNewsScreen";
import NewsScreen from "../screens/NewsScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function NewsStuck(props) {
    let screenIndex = props.route.params != undefined ? props.route.params.screen : 0
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="NewsScreen"
          component={NewsScreen}
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