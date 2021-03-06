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
import COLORS from "../assets/colors"

export default function MovieCard(props) {
  const colors = props.darkTheme === "1" ? COLORS.DARK : COLORS.LIGHT

  if(props.seanses.length > 0)
    return (
      <TouchableOpacity
        onPress={() => {
          
          props.navigation.route.navigation.navigate("DetailTheaterScreen", {
            ...props
          });
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
          <View
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
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
          </View>
          <View
            style={{
              width: 200,
              marginLeft: 20,

              justifyContent: "center"
            }}
          >
            <Title style={{ fontFamily: "Roboto", maxHeight: 100 }}>
              {props.name}
            </Title>

            <View style={{ flexDirection: "row", marginBottom: 15 }}>
              {props.seanses.map((seans, index) => {
                let seansDate = new Date(moment(seans.date));
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: "#f5f5f5",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                      paddingHorizontal: 5,
                      flexWrap: "wrap"
                    }}
                  >
                    <Text style={{}}>{seans.date.split(" ")[1]}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
   
          </View>
        </View>
      </TouchableOpacity>
    );
  else{
    return<View></View>
  }
}
