import { AppLoading,Updates  } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState,useEffect } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";
import moment from "moment";

import "moment/src/locale/ru";
import "moment/min/moment-with-locales";
import { Ionicons } from "@expo/vector-icons";
import { Appbar, Drawer } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { checkForUpdateAsync } from "expo/build/Updates/Updates";
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';


export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const value = AsyncStorage.getItem("city");
  const [visible, setvisible] = useState(false)
  moment.locale = "ru";
  global.currentScreen = 0

  useEffect(() => {
    checkForUpdates()
  }, [])

  async function checkForUpdates() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        setvisible(true)
        //Updates.reloadFromCache();
      }
    } catch (e) {
      // handle or log error
    }
  }



  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider style={{ flex: 1 }}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <AppNavigator />
        <Portal>
           <Modal visible={visible}>
             <View style={{paddingVertical:10,backgroundColor:'#fff',justifyContent:'center',alignContent:'center'}}>
                <Text style={{textAlign:'center',fontWeight:'bold'}}>Приложению необходимо обновиться</Text>
                <Button
                style={{ marginTop: 30 }}
                onPress={() => Updates.reloadFromCache()}>
                  Обновить
                </Button>
              </View>
           </Modal>
        </Portal>
      </Provider>
    );
  }
}



async function getLocaldata(city) {
  try {
    await AsyncStorage.setItem("city", city);
  } catch (error) {
    // Error saving data
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/robot-dev.png"),
      require("./assets/images/robot-prod.png")
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
