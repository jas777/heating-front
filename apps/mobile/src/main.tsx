import { AppRegistry } from 'react-native';
import App from './app/App';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Config, isConfig } from "@heating-front/utils";

const readData = async () => {
  try {
    const rawConfig = await AsyncStorage.getItem("@config");
    const parsedConfig = rawConfig ? JSON.parse(rawConfig) : {};
    if (!isConfig(parsedConfig)) {
      const defaultConfig: Config = {
        address: "http://192.168.1.45:2137",
      };
      await AsyncStorage.setItem("@config", JSON.stringify(defaultConfig));
    }
  } catch (e) {
    console.error(e);
  }
};

readData().then(r => {
  AppRegistry.registerComponent('main', () => App);
});
