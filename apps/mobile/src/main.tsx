import { AppRegistry } from 'react-native';
import App from './app/App';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "./shared/Config";

export const isConfig = (object): object is Config => {
  return (object as Config) !== undefined && !!(object as Config).ip;
};

const readData = async () => {
  try {
    const rawConfig = await AsyncStorage.getItem("@config");
    const parsedConfig = rawConfig ? JSON.parse(rawConfig) : {};
    if (!isConfig(parsedConfig)) {
      const defaultConfig: Config = {
        ip: "192.168.1.45",
        port: 2137
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
