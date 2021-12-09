import {Heater} from "@heating-front/utils";
import {Text, View} from "react-native";
import styled from "styled-components";

const HeaterCard = (props: Heater) => {

  const CardView = styled(View)`
    display: flex;
    flex-direction: column;
  `

  return (
    <CardView>
      <Text>aaa</Text>
    </CardView>
  )
}

export default HeaterCard;
