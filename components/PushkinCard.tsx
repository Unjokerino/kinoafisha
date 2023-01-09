import React, { useEffect } from "react";
import { Image, ImageStyle, StyleProp } from "react-native";
import { useColors } from "../hooks/useColors";

export const PushkinCard = ({ style }: { style?: StyleProp<ImageStyle> }) => {
  const { darkTheme } = useColors();
  useEffect(() => {
    console.log(darkTheme);
  }, [darkTheme]);

  return (darkTheme !== '0') ? (
    <Image style={style} source={require("../assets/images/pushkinDark.png")} />
  ) : (
    <Image style={style} source={require("../assets/images/pushkin.png")} />
  );
};
