import React from "react";
import DetailMovieScreen from "../screens/DetailMovieScreen";
import SoonOnScreens from "../screens/SoonOnScreen";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function SoonOnScreensStuck(props) {
  let screenIndex =
    props.route.params != undefined ? props.route.params.screen : 0;
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="SoonOnScreens"
        component={SoonOnScreens}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="DetailMovieScreen"
        component={DetailMovieScreen}
      />
    </Stack.Navigator>
  );
}
