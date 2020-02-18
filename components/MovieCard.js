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
        props.navigation.route.navigation.navigate("DetailMovieScreen", {
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
              props.poster !== ""
                ? props.poster
                : "https://lh3.googleusercontent.com/proxy/PMHyypID38zj0zC4JBbN2mCcRyFHrrT2P6gLE3lBj6UYFDpkxfR7NhN4v1pXM3Hz_DPl6x5wh62imdz8E9zjKDWez2BQriPqGdn0DvE5Y4C3ebCOwjOuKiDuQ6w"
          }}
        />
        <View style={{ width: 200, marginLeft: 20 }}>
          <Title style={{ fontFamily: "Roboto" }}>{props.name}</Title>
          <Caption>
            {props.ganre.map(ganre => {
              return ganre + " ";
            })}
          </Caption>
          <Caption>
            {props.year} | {props.country[0]}
          </Caption>

          <View style={{ flexDirection: "row", marginVertical: 15 }}>
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
}
