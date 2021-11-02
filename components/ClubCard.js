import React,{useState} from "react";
import { Text, Image, View, StyleSheet } from "react-native";
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
  console.log(props.preview_img)
  const [colors, setColors] = useState(props.darkTheme === "1" ? COLORS.DARK : COLORS.LIGHT)
  const styles = StyleSheet.create({
    container: {
      margin: 5,
      borderRadius: 6,
      elevation: 2,
      marginBottom: 5,
      backgroundColor: colors.card_color
    },
    text:{ 
      fontFamily: "Roboto",
      color:colors.text_color
    }
  });
  
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.route.navigation.navigate("DetailClubScreen", {
          darkTheme:props.darkTheme,
          ...props
        });
      }}
    style={styles.container}
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
              props.img
                ? props.img.url ? props.img.url : props.img
                : "https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png"
          }}
        />
        <View style={{ marginLeft: 20 }}>
          <Title style={styles.text}>{props.name}</Title>
        </View>
      </View>
    </TouchableOpacity>
  );
}
