import React from "react";
import { Text, Image, View, Linking } from "react-native";
import {
  TouchableOpacity,
  TouchAction,
  TouchableHighlight,
  TouchableNativeFeedback
} from "react-native-gesture-handler";
import { Title, List, Caption } from "react-native-paper";
import moment from "moment";
export default function NewsCard(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigation.navigate("DetailNewsScreen", { ...props });
      }}
      style={{
        margin: 5,
        borderRadius: 2,
        elevation: 2,
        marginBottom: 5,
        backgroundColor: "#fff"
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            margin: 5,
            width: 90,
            height: 150,
            zIndex: 0,
            borderRadius: 5
          }}
          source={{
            uri:
              props.img_sobitiya !== ""
                ? props.img_sobitiya
                : "https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png"
          }}
        />
        <View style={{ width: 200, marginLeft: 20 }}>
          <Title style={{ fontFamily: "Roboto" }}>{props.name}</Title>
          <Caption>{props.date}</Caption>

          <Text>{props.short_desc.substr(0, 100).replace('<?xml encoding=\"utf8\" ?>','')}...</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
