import React, { useState } from "react";
import { ActivityIndicator, Dimensions, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ConfigDTO, useContextConfig } from "@heating-front/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import colors from "tailwindcss/colors";
import axios from "axios";

const ContentView = styled(SafeAreaView)`
  display: flex;
  padding-left: 20px;
  padding-top: 20px;
`

const Heading = styled(Text)`
  color: #4F46E5;
  font-size: 25px;
  font-weight: bold;
  background-color: transparent;
  padding-top: 20px;
`

const StyledInput = styled(TextInput)<{ error: boolean }>`
  background-color: ${colors.gray["50"]};
  width: ${Dimensions.get("screen").width - 2 * 20}px;
  padding: 5px 5px 5px 0;
  margin-top: 5px;
  font-size: 17px;
  border-bottom-color: ${(props) => !props.error ? colors.indigo["500"] : colors.red["500"]};
  border-bottom-width: 2px;
`

const SaveButton = styled(TouchableOpacity)`
  background-color: ${colors.pink["500"]};
  width: 77px;
  margin-top: 10px;
  padding: 8px;
  border-radius: 6px;
`

const ButtonText = styled(Text)`
  font-size: 17px;
  color: white;
  display: flex;
  align-self: center;
`

const StyledIndicatorView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const SettingsScreen = () => {

  const { config, updateConfig } = useContextConfig();

  const [changedAddress, setAddress] = useState<string>(config.address);
  const [isVerifying, setVerifying] = useState(false);
  const [isError, setError] = useState(false);

  React.useEffect(() => {
    setError(false);
  }, [changedAddress])

  const verifyAndSave = async () => {
    setVerifying(true);
    console.log(changedAddress);
    try {
      const { data } = await axios.create({ timeout: 3000 })
        .get<ConfigDTO>(`${changedAddress}/config`);

      if (data) {
        await updateConfig({ address: changedAddress });
        setVerifying(false);
      } else {
        throw new Error("Invalid data received!");
      }
    } catch (e) {
      setError(true);
      setVerifying(false);
    }
  }

  if (isVerifying) return (
    <StyledIndicatorView>
      <ActivityIndicator color={colors.indigo["500"]} size='large' />
      <Text style={{ marginTop: 10 }}>Weryfikacja adresu serwera</Text>
    </StyledIndicatorView>
  )

  return (
    <ContentView>
      <Heading>Adres serwera</Heading>
      <StyledInput error={isError} defaultValue={config?.address} onChangeText={setAddress}/>
      <SaveButton activeOpacity={0.8} onPress={verifyAndSave}>
        <ButtonText>Zapisz</ButtonText>
      </SaveButton>
    </ContentView>
  )

};

export default SettingsScreen;
