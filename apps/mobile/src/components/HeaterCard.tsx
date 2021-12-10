import { Heater, useHeater } from "@heating-front/utils";
import { Button, Pressable, Text, View } from "react-native";
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

const ModeButton = styled(Pressable)<{ auto: boolean }>`
  background-color: ${(props) => props.auto ? colors.violet["500"] : colors.red["600"]};
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

const NameView = styled(View)`
  background-color: ${colors.gray["200"]};
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

const SwitchButton = styled(Pressable)`
  width: 50%;
  background-color: ${colors.gray["300"]};
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const EnableButton = styled(SwitchButton)`
  background-color: ${colors.lime["500"]};
  border-bottom-left-radius: 10px;
`;

const DisableButton = styled(SwitchButton)`
  background-color: ${colors.red["500"]};
  border-bottom-right-radius: 10px;
`;

const HeaterCard = (props: Heater & { updateFunc: (gpio: number, auto: boolean) => void }) => {

  const {
    isAuto,
    setAuto,
    disable,
    toggle,
    enable
  } = useHeater(props.auto, environment.baseUrl, props.gpio, props.updateFunc);

  return (
    <CardView>
      <ModeButton auto={isAuto} onPress={toggle}>
        <ButtonText style={{ color: "white" }}>{isAuto ? "AUTO" : "MANUAL"}</ButtonText>
      </ModeButton>
      <NameView>
        <Text style={{ fontSize: 20 }}>{props.name}</Text>
      </NameView>
      <ButtonView>
        <EnableButton onPress={enable}>
          <Text style={{ color: "white", fontSize: 20 }}>Włącz</Text>
        </EnableButton>
        <DisableButton onPress={disable}>
          <Text style={{ color: "white", fontSize: 20 }}>Wyłącz</Text>
        </DisableButton>
      </ButtonView>
    </CardView>
  );
};

export default HeaterCard;
