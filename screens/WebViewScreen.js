import * as React from "react";
import { WebView } from "react-native-webview";
import { Text, Appbar } from "react-native-paper";
import { Platform, View, StatusBar } from "react-native";

export default function WebViewScreen(props) {
  console.log(props.route.params);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 30,
          backgroundColor: "#fff"
        }}
      />
      <Appbar
        style={{
          marginBottom: -60,
          zIndex: 999,
          elevation: 2,
          backgroundColor: "#fff"
        }}
      >
        <Appbar.Action
          icon="arrow-left"
          onPress={() => props.navigation.goBack()}
        />
        <Appbar.Content title={props.route.params.name} />
      </Appbar>
      <WebView source={{ uri: props.route.params.url }} style={{}} />
    </View>
  );
}
