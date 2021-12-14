import { Heater, useHeater } from "@heating-front/utils";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import styled from "styled-components";
import React from "react";
import colors from "tailwindcss/colors";
import environment from "../environments/environment";

const CardView = styled(View)`
  display: flex;
  flex-direction: column;
  width: 75%;
  align-self: center;
  border-radius: 10px;
  margin-top: 25px;
`;

const ModeButton = styled(TouchableOpacity)<{ auto: boolean; dark: boolean }>`
  background-color: ${(props) =>
    props.dark
      ? props.auto
        ? colors.violet["900"]
        : colors.red["900"]
      : props.auto
        ? colors.violet["500"]
        : colors.red["600"]};
  height: 80px;
  color: white;
  align-items: center;
  display: flex;
  justify-content: flex-end;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const ButtonText = styled(Text)`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  padding-bottom: 8px;
`;

const NameView = styled(View)<{ dark: boolean }>`
  background-color: ${(props) =>
    props.dark ? colors.gray["700"] : colors.gray["200"]};
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const SwitchButton = styled(TouchableOpacity)`
  width: 50%;
  background-color: ${colors.gray["300"]};
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const EnableButton = styled(SwitchButton)<{ dark: boolean }>`
  background-color: ${({ dark }) =>
    dark ? colors.lime["700"] : colors.lime["500"]};
  border-bottom-left-radius: 10px;
`;

const DisableButton = styled(SwitchButton)<{ dark: boolean }>`
  background-color: ${({ dark }) =>
    dark ? colors.red["700"] : colors.red["500"]};
  border-bottom-right-radius: 10px;
`;

const HeaterCard = (
  props: Heater & { updateFunc: (gpio: number, auto: boolean) => void }
)  => {

  const dark = useColorScheme() === "dark";

  const { isAuto, setAuto, disable, toggle, enable } = useHeater(
    props.auto,
    environment.baseUrl,
    props.gpio,
    props.updateFunc
  );

  return (
    <CardView>
      <ModeButton auto={isAuto} dark={dark} onPress={toggle} activeOpacity={0.8}>
        <ButtonText style={{ color: "white" }}>
          {isAuto ? "AUTO" : "MANUAL"}
        </ButtonText>
      </ModeButton>
      <NameView dark={dark}>
        <Text
          style={{ fontSize: 20, color: dark ? colors.gray["100"] : "#000" }}
        >
          {props.name}
        </Text>
      </NameView>
      <ButtonView>
        <EnableButton dark={dark} onPress={enable} activeOpacity={0.8}>
          <Text style={{ color: "white", fontSize: 20 }}>Włącz</Text>
        </EnableButton>
        <DisableButton dark={dark} onPress={disable} activeOpacity={0.8}>
          <Text style={{ color: "white", fontSize: 20 }}>Wyłącz</Text>
        </DisableButton>
      </ButtonView>
    </CardView>
  );
};

export default HeaterCard;
