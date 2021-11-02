import React, { useState, useEffect } from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import {
  TouchableOpacity,
  TouchAction,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";
import { Title, List, Caption } from "react-native-paper";
import moment from "moment";
import localization from "moment/locale/ru";
import COLORS from "../assets/colors";

export default function MovieCard(props) {
  const colors = props.darkTheme === "1" ? COLORS.DARK : COLORS.LIGHT;
  const styles = StyleSheet.create({
    text: {
      fontFamily: "Roboto",
      color: colors.text_color,
    },
    tag: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#f5f5f5",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
      paddingHorizontal: 5,
      flexWrap: "wrap",
    },
    caption: {
      color: colors.caption_color,
    },
  });

  return (
    <TouchableOpacity
      onPress={() => {
        let navigation = props.navigation.route
          ? props.navigation.route.navigation
          : props.navigation;
        navigation.navigate(props.detailType, {
          darkTheme: [props.darkTheme],
          ...props,
        });
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
              props.poster !== ""
                ? props.poster
                  ? props.poster
                  : props.img_sobitiya
                : "https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png",
          }}
        />
        <View style={{ width: 200, marginLeft: 20 }}>
          <Title style={styles.text}>{props.name}</Title>
          {props.ganre && (
            <Caption style={styles.caption}>{props.ganre.join(", ")}</Caption>
          )}
          {props.country && (
            <Caption style={styles.caption}>
              {props.year} | {props.country[0]}
            </Caption>
          )}

          <View
            style={{ flexDirection: "row", marginBottom: 10, marginTop: 5 }}
          >
            {props.soonOnScreens ? (
              <TouchableOpacity style={styles.tag}>
                <Text style={styles.caption}>
                  В кино с{" "}
                  {moment(props.seanses?.[0].date)
                    .locale("ru", localization)
                    .format("D MMMM")}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={{ flexDirection: "row" }}>
                {props.seanses &&
                  props.seanses.map((seans, index) => {
                    let seansDate = new Date(moment(seans.date));
                    return (
                      <TouchableOpacity key={index} style={styles.tag}>
                        <Text style={styles.caption}>
                          {seans.date.split(" ")[1]}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
