
  import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import COLORS from "../assets/colors";

  export const useColors= () => {
    const [darkTheme, setDarkTheme] = useState("0");
    const [colors, setColors] = useState(COLORS.LIGHT);

    useEffect(() => {
        const getTheme = async () => {
            const darkTheme = await AsyncStorage.getItem("darkTheme");
            setDarkTheme(darkTheme);
            darkTheme === "1" ? setColors(COLORS.DARK) : setColors(COLORS.LIGHT);
        }
      
        getTheme();
      }, [darkTheme, colors]);

      return {colors, darkTheme}
  }