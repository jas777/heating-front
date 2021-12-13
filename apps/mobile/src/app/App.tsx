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
import Config from "../shared/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isConfig } from "../main";
import styled from "styled-components";

const GlobalStateContext = React.createContext<Config | undefined>(undefined);

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

  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

  const homeIcon = ({ focused, color, size }): ReactNode => {
    // @ts-ignore
    return <RadiatorIcon color={color} size={size} />;
  };

  const settingsIcon = ({ focused, color, size }): ReactNode => {
    // @ts-ignore
    return <CogIcon color={color} size={size} />;
  };

  const [config, setConfig] = useState<Config | undefined>(undefined);

  React.useEffect(() => {
    try {
      AsyncStorage.getItem('@config').then(rawConfig => {
        if (!rawConfig) {
          throw new Error('Expected value but read null!');
        } else {
          const parsedConfig = JSON.parse(rawConfig);
          if (!isConfig(parsedConfig)) {
            throw new TypeError(`Expected Config but got ${typeof parsedConfig}`);
          } else {
            setConfig(parsedConfig as Config);
          }
        }
      })
    } catch (e) {
      console.log('dupa');
    }
  }, [])

  if (!config) return (
    <StyledIndicatorView>
      <ActivityIndicator color={colors.indigo["500"]} size='large' />
    </StyledIndicatorView>
  )

  return (
    <GlobalStateContext.Provider value={config}>
      <NavigationContainer theme={scheme === 'dark' ? darkNavigationTheme : lightNavigationTheme }>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Grzejniki" component={HomeScreen} options={{ tabBarIcon: homeIcon }} />
          <Tab.Screen name="Ustawienia" component={SettingsScreen} options={{ tabBarIcon: settingsIcon }} />
        </Tab.Navigator>
      </NavigationContainer>
    </GlobalStateContext.Provider>
  );
};

export default App;
