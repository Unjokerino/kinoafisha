import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { Caption, Title } from "react-native-paper";
import COLORS from "../assets/colors";

export default function NewsCard(props) {
  const colors = props.darkTheme === "1" ? COLORS.DARK : COLORS.LIGHT;

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
        backgroundColor: colors.card_color,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            margin: 5,
            width: 90,
            height: 150,
            zIndex: 0,
            borderRadius: 5,
          }}
          source={{
            uri:
              props.img_sobitiya !== ""
                ? props.img_sobitiya
                : "https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png",
          }}
        />
        <View style={{ width: 200, marginLeft: 20 }}>
          <Title style={{ fontFamily: "Roboto", color: colors.text_color }}>
            {props.name}
          </Title>
          <Caption style={{ color: colors.caption_color }}>
            {props.date}
          </Caption>
          {props.short_desc.length > 0 && (
            <Text style={{ color: colors.caption_color, paddingVertical: 5 }}>
              {props.short_desc
                .substr(0, 100)
                .replace('<?xml encoding="utf8" ?>', "")}
              ...
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
