import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text as DefaultText,
  ScrollView,
  Linking,
} from "react-native";
import COLORS from "../assets/colors";
import {
  BackIcon,
  BurgerIcon,
  CalendarIcon,
  ClockIcon,
  LocationIcon,
  ShareIcon,
  WalletIcon,
} from "../assets/icons";
import { HEADER_HEIGHT } from "../constants/Layout";
import * as Clipboard from "expo-clipboard";
import moment from "moment";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useColors } from "../hooks/useColors";
import { PushkinCard } from "../components/PushkinCard";

interface Props {
  route: {
    params: EventProps;
  };
}

export interface EventProps {
  detailType: string;
  url: string;
  darkTheme: "0" | "1";
  id_session: string;
  city: string;
  type_zal: boolean;
  date: string;
  name: string;
  link: string;
  type_afisha: any;
  short_desc: string;
  img_sobitiya: string;
  mobile: string;
  price: string;
  mesto_sobitiya: string;
  acters_sostav: string;
  our_id: string;
  quicktickets: any;
  pushkin_card: any;
  seanses: any;
  poster: string;
  ganre?: string[];
  country?: string[];
  year?: string;
  soonOnScreens?: boolean;
}

const Text = ({ style, children, ...rest }) => {
  const { colors } = useColors();
  return (
    <DefaultText style={[style, { color: colors.text_color }]} {...rest}>
      {children}
    </DefaultText>
  );
};

export default (props: Props) => {
  const { colors, darkTheme } = useColors();
  const params = props.route.params;

  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  const stylez = useAnimatedStyle(() => {
    return {
      height: interpolate(
        translationY.value,
        [0, 120, 170],
        [255, 120, 75],
        Extrapolate.CLAMP
      ),
    };
  });

  const paddingTop = useAnimatedStyle(() => {
    return {
      paddingTop: interpolate(
        translationY.value,
        [0, 120, 170],
        [280, 150, 0],
        Extrapolate.CLAMP
      ),
    };
  });

  const navigation = useNavigation();

  useEffect(() => {
    StatusBar.setBackgroundColor("#EF0000");
  }, [props]);

  const copyToClipboard = async () => {
    const text = `${params.name}|${params.date}|Узнай больше в Приложении Русь Ноябрьск`;
    await Clipboard.setStringAsync(text);
  };

  const renderNavBar = () => {
    return (
      <View style={styles.navContainer}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={navigation.goBack}>
            <BackIcon />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={copyToClipboard}>
              <ShareIcon />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.burgerIcon}
              onPress={navigation.openDrawer}
            >
              <BurgerIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card_color }]}>
      {renderNavBar()}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, paddingTop]}
      >
        <View style={styles.row}>
          <Text style={[styles.subtitle, { color: colors.text_color }]}>
            Название события{" "}
          </Text>
          {params.pushkin_card && (
            <PushkinCard
              
              style={styles.pushkinCard}
            />
          )}
        </View>
        <Text style={[styles.text, { color: colors.text_color }]}>
          {params.name}
        </Text>
        <View style={styles.infoContainer}>
          <View style={[styles.infoRow, styles.border]}>
            <CalendarIcon fill={darkTheme && "#fff"} />
            <Text style={[styles.subtitle, styles.infoText]}>Дата события</Text>
            <Text style={[styles.title, styles.infoText]}>
              {moment(params.date).format("DD MMMM YYYY")}
            </Text>
          </View>
          <View style={[styles.infoRow, styles.border]}>
            <ClockIcon fill={darkTheme && "#fff"} />
            <Text style={[styles.subtitle, styles.infoText]}>Время</Text>
            <Text style={[styles.title, styles.infoText]}>
              {moment(params.date).format("HH:mm")}
            </Text>
          </View>
          <View style={[styles.infoRow]}>
            <LocationIcon fill={darkTheme && "#fff"} />
            <Text style={[styles.subtitle, styles.infoText]}>
              Место события
            </Text>
            <Text style={[styles.title, styles.infoText, { flex: 1 }]}>
              {params.mesto_sobitiya}
            </Text>
          </View>
        </View>
        {params.mobile && <Text style={styles.subtitle}>Описание</Text>}
        {params.mobile && <Text style={styles.caption}>{params.mobile}</Text>}

        <View style={styles.footerContainer}>
          <View style={styles.footerInfoContainer}>
            <WalletIcon fill={darkTheme && "#fff"} />
            <View style={styles.priceContainer}>
              <Text style={styles.subtitle}>Цена</Text>
              <Text style={[styles.title, { color: "#000" }]}>
                {params.price} руб.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => Linking.openURL(params.link)}
            style={styles.button}
          >
            <DefaultText style={[styles.buttonText,]}>Купить билет</DefaultText>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
      <Animated.Image
        style={[styles.mainImg, stylez]}
        source={{ uri: params.img_sobitiya }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: "#EF0000",
  },
  navBar: {
    backgroundColor: "#EF0000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    flex: 1,
  },
  mainImg: {
    top: HEADER_HEIGHT,
    height: 255,
    width: "100%",
    position: "absolute",
  },
  navContainer: {
    height: HEADER_HEIGHT,
    zIndex: 1,
  },
  burgerIcon: {
    paddingLeft: 21,
  },
  subtitle: {
    color: "#364F6B",
    opacity: 0.6,
    paddingBottom: 3.5,
    justifyContent: "space-between",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 275,
  },
  infoContainer: {
    paddingTop: 17,
    paddingBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#7070703D",
    paddingVertical: 10,
  },
  border: {
    borderBottomWidth: 1,
  },
  title: {
    color: "#364F6B",
    fontWeight: "700",
    fontSize: 16,
  },
  infoText: {
    paddingLeft: 12,
    textAlign: "left",
  },
  caption: {
    fontSize: 13,
    color: "#364F6B",
    lineHeight: 18,
    paddingBottom: 55,
  },
  footerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingBottom: 24,
  },
  button: {
    backgroundColor: "#EF0000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    paddingHorizontal: 23,
    paddingVertical: 17,
    fontSize: 16,
  },
  footerInfoContainer: {
    flexDirection: "row",
  },
  priceContainer: {
    paddingLeft: 10,
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "400",
  },
  pushkinCard: {
    alignSelf: "flex-end",
  },
  row:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
});
