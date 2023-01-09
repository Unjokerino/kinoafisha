import moment from "moment";
//@ts-ignore
import React from "react";
import { Image, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { MonoText as Text } from "./StyledText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Caption } from "react-native-paper";
import COLORS from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { EventProps } from "../screens/DetailTheaterScreen";
import { useColors } from "../hooks/useColors";
import {PushkinCard} from "./PushkinCard";
export default function MovieCard(props: EventProps & { titleStyle: StyleProp<TextStyle> }) {
  const {colors, darkTheme} = useColors()
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
      backgroundColor: colors.card_color,
    },
    text: {
      fontFamily: "Roboto",
      color: colors.text_color,
      fontSize: 14,
      fontWeight: "400",
    },
    tag: {
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
      flexWrap: "wrap",
      color: colors.text_color,
    },
    caption: {
      color: colors.caption_color,
      fontSize: 12,
      lineHeight: 20,
    },
    title: {
      fontSize: 18,
      color: colors.black,
    },
    image: {
      margin: 5,
      width: 73,
      height: 113,
      zIndex: 0,
      borderRadius: 8,
    },
    wraper: {
      flex: 1,
      paddingHorizontal: 15,
      paddingTop: 5,
      paddingBottom: 17,
    },
  });

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(props.detailType, {
          darkTheme: [props.darkTheme],
          ...props,
        });
      }}
      style={styles.container}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          style={styles.image}
          source={{
            uri:
              props.poster !== ""
                ? props.poster
                  ? props.poster
                  : props.img_sobitiya
                : "https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png",
          }}
        />
        <View style={styles.wraper}>
          <Text numberOfLines={2} style={[styles.text, styles.title, props.titleStyle]}>
            {props.name}
          </Text>
          {props.ganre && (
            <Text numberOfLines={2} style={styles.caption}>
              {props.ganre.join(", ")}
            </Text>
          )}
          {props.country && (
            <Text style={styles.caption}>
              {props.year} | {props.country[0]}
            </Text>
          )}
          {props.mobile && (
            <Text numberOfLines={2} style={[styles.caption, {paddingVertical: 6}]}>
              {props.mobile}
            </Text>
          )}
          <View style={{ flex: 1 }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {props.soonOnScreens ? (
              <TouchableOpacity style={styles.tag}>
                <Text style={styles.caption}>
                  В кино с {moment(props.seanses?.[0].date).format("D MMMM")}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={{ flexDirection: "row",  alignItems:'center', maxWidth: '80%', overflow:'hidden' }}>
                {props.seanses &&
                  props.seanses.map((seans, index) => {
                    return (
                      <Text key={index} style={styles.tag}>
                        {seans.date.split(" ")[1]}
                      </Text>
                    );
                  })}
              </View>
            )}
          
            {props.pushkin_card && (
              <PushkinCard style={{
                zIndex: 1,
                position: "absolute",
                bottom: -5,
                right: 0,
                width: 26,
                height: 26,
              }} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
