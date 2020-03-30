import React, { useState, useEffect } from "react";
import { ExpoConfigView } from "@expo/samples";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
  AsyncStorage
} from "react-native";
import { Text, Appbar } from "react-native-paper";
import App from "../navigation/AppNavigator";
import COLORS from "../assets/colors"
import { color } from "react-native-reanimated";

export default function SettingsScreen(props) {
  const [newsNotifications,setNewsNotification] = useState(false)
  const [darkTheme,setdarkTheme] = useState("0")
  const [colors,setColors] = useState("0")
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  const  styles = StyleSheet.create({
    container:{
      backgroundColor:colors.background_color,
      flex:1,
    },
    card:{
      marginVertical:10,
      backgroundColor:colors.card_color,
      padding:10,
      elevation:1,
    },
    cardItem:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    cardText:{
      color:colors.text_color
    }
  })

  useEffect(()=>{
    isDarkTheme()
  },[])

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      isDarkTheme()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  async function isDarkTheme(){
    let darkTheme = await AsyncStorage.getItem('darkTheme')
    setdarkTheme(darkTheme)
    darkTheme === "1" ? setColors(COLORS.DARK) : setColors(COLORS.LIGHT)
  }
  
  return <View style={{flex:1,}}>
    <View
      style={{
        backgroundColor:colors.card_color,
        height: 30,
      }}
    />
    <Appbar
      style={{
        backgroundColor:colors.card_color,
        elevation: 0
      }}
    >
      <Appbar.Action
        icon="menu"
        onPress={() => props.navigation.openDrawer()}
      />
      <Appbar.Content title="Настройки" />

    </Appbar>
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardItem}>
          <Text style={styles.cardText}>
            Уведомления о новостях
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={newsNotifications ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setNewsNotification}
            value={newsNotifications}
          />
        </View>
      </View>

    </ScrollView>


  </View>;
}

SettingsScreen.navigationOptions = {
  title: "app.json"
};
