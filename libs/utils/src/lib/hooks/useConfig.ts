import React, { useContext, useState } from "react";
import { Config, isConfig } from "../types/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useConfig = () => {
  const [config, setConfig] = useState<Config | undefined>(undefined);

  const updateConfig = async (updatedConfig: Partial<Config>) => {
    if (!config) return;
    setConfig({ ...config, ...updatedConfig });
    try {
      await AsyncStorage.setItem("@config", JSON.stringify({ ...config, ...updatedConfig }));
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    try {
      AsyncStorage.getItem("@config").then(rawConfig => {
        if (!rawConfig) {
          throw new Error("Expected value but read null!");
        } else {
          const parsedConfig = JSON.parse(rawConfig);
          if (!isConfig(parsedConfig)) {
            throw new TypeError(`Expected Config but got ${typeof parsedConfig}`);
          } else {
            setConfig(parsedConfig as Config);
          }
        }
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return {
    config,
    updateConfig
  };
};

type ConfigContext = ReturnType<typeof useConfig>;

export const GlobalConfigContext = React.createContext<ConfigContext | undefined>(undefined);

export const useContextConfig = (): ConfigContext => {
  const config = useContext(GlobalConfigContext);
  if (!config?.config) throw Error("Config not present in the context!");
  return config;
}
