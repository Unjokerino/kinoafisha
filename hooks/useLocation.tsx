import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

export const useLocation = () => {
  const [city, setCity] = useState("Ноябрьск");

  useEffect(() => {
    const getCity = async () => {
      const city = await AsyncStorage.getItem("city");
      setCity(city);
    };

    getCity();
  }, [city]);

  return { city };
};
