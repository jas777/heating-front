import React, { ReactNode, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity, FlatList, Dimensions, RefreshControl, useColorScheme, ActivityIndicator
} from "react-native";

import {
  Colors,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";
// @ts-ignore
import openURLInBrowser from "react-native/Libraries/Core/Devtools/openURLInBrowser";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../components/HomeScreen";
import RadiatorIcon from "../assets/svg/RadiatorIcon.svg";
import CogIcon from "../assets/svg/CogIcon.svg";
import colors from "tailwindcss/colors";
import styled from "styled-components";
import { GlobalConfigContext, useConfig } from "@heating-front/utils";
import SettingsScreen from "../components/SettingsScreen";


const lightNavigationTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.pink["500"],
    background: '#fff',
    card: colors.gray["100"],
    border: colors.gray["300"]
  }
}

const darkNavigationTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: colors.pink["500"],
    // background: '#fff',
    card: colors.gray["900"],
    border: colors.gray["800"]
  }
}

const StyledIndicatorView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const App = () => {

  const scheme = useColorScheme();

  const Tab = createBottomTabNavigator();

  const homeIcon = ({ focused, color, size }): ReactNode => {
    // @ts-ignore
    return <RadiatorIcon color={color} size={size} />;
  };

  const settingsIcon = ({ focused, color, size }): ReactNode => {
    // @ts-ignore
    return <CogIcon color={color} size={size} />;
  };

  const { config, updateConfig } = useConfig();

  if (!config) return (
    <StyledIndicatorView>
      <ActivityIndicator color={colors.indigo["500"]} size='large' />
    </StyledIndicatorView>
  )

  return (
    <GlobalConfigContext.Provider value={{ config, updateConfig }}>
      <NavigationContainer theme={scheme === 'dark' ? darkNavigationTheme : lightNavigationTheme }>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Grzejniki" component={HomeScreen} options={{ tabBarIcon: homeIcon }} />
          <Tab.Screen name="Ustawienia" component={SettingsScreen} options={{ tabBarIcon: settingsIcon }} />
        </Tab.Navigator>
      </NavigationContainer>
    </GlobalConfigContext.Provider>
  );
};

export default App;
