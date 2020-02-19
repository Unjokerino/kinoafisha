import React from "react";
import { Text, Image, View } from "react-native";
import {
  TouchableOpacity,
  TouchAction,
  TouchableHighlight,
  TouchableNativeFeedback
} from "react-native-gesture-handler";
import { Title, List, Caption } from "react-native-paper";
import moment from "moment";
export default function MovieCard(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.route.navigation.navigate("DetailClubScreen", {
          ...props
        });
      }}
      style={{
        margin: 5,
        borderRadius: 6,
        elevation: 2,
        marginBottom: 5,
        backgroundColor: "#fff"
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <Image
          style={{
            margin: 5,

            height: 150,
            zIndex: 0,
            borderRadius: 5
          }}
          source={{
            uri:
              props.preview_img !== ""
                ? props.preview_img
                : "https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png"
          }}
        />
        <View style={{ marginLeft: 20 }}>
          <Title style={{ fontFamily: "Roboto" }}>{props.name}</Title>
        </View>
      </View>
    </TouchableOpacity>
  );
}
