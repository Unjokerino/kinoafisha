import AppLoading from "expo-app-loading";
import * as Updates from "expo-updates";

import * as Notifications from "expo-notifications";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-community/async-storage";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import moment from "moment";

import "moment/src/locale/ru";
import "moment/min/moment-with-locales";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./navigation/AppNavigator";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import * as firebase from "firebase";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: "AIzaSyDHtsweqDfruO6JhZBxaQvkG-NPaBqTcHs",
  authDomain: "kinoafisha-d29d7.firebaseapp.com",
  databaseURL: "https://kinoafisha-d29d7.firebaseio.com",
  projectId: "kinoafisha-d29d7",
  storageBucket: "kinoafisha-d29d7.appspot.com",
  messagingSenderId: "1080891018380",
  appId: "1:1080891018380:web:7224710c052df32b83ffa9",
  measurementId: "G-SNP0W2B5N6",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [visible, setvisible] = useState(false);
  moment.locale = "ru";
  global.currentScreen = 0;

  useEffect(() => {
    checkForUpdates();
    checkCity();
    registerNotifications();
  }, []);

  async function registerNotifications() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // only asks if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    // On Android, permissions are granted on app installation, so
    // `askAsync` will never prompt the user

    // Stop here if the user did not grant permissions
    if (status !== "granted") {
      alert("No notification permissions!");
      return;
    }

    // Get the token that identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    storeHighScore(Constants.installationId, token);
  }

  function storeHighScore(userId, token) {
    firebase
      .database()
      .ref("apps/kinoafisha/users/" + userId)
      .set({
        token: token,
        appOwnership: Constants.appOwnership,
      });
  }

  async function checkCity() {
    const value = await AsyncStorage.getItem("city");
    console.log(value);
    if (value === null) {
      await AsyncStorage.setItem("city", "Ноябрьск");
    }
  }

  async function checkForUpdates() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        setvisible(true);
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
            <View
              style={{
                paddingVertical: 10,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Приложению необходимо обновиться
              </Text>
              <Button
                style={{ marginTop: 30 }}
                onPress={() => Updates.reloadFromCache()}
              >
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
      require("./assets/images/robot-prod.png"),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
    }),
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
    backgroundColor: "#fff",
  },
});
