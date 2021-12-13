import { FlatList, RefreshControl, SafeAreaView, StatusBar, Text } from "react-native";
import HeaterCard from "./HeaterCard";
import React, { useState } from "react";
import styled from "styled-components";
import { useAxios, useLazyAxios } from "use-axios-client";
import { ConfigDTO } from "@heating-front/utils";
import environment from "../environments/environment";
import axios from "axios";

const HomeScreen = () => {

  const HeadingText = styled(Text)`
    color: #4F46E5;
    font-size: 30px;
    margin: 5px auto auto;
    font-weight: bold;
    background-color: transparent;
  `;

  const { data, error, loading, refetch } = useAxios<ConfigDTO>({
    url: `${environment.baseUrl}/config`,
    headers: {
      Accept: "application/json"
    }
  });

  console.log(data);

  const [getData, loopData] = useLazyAxios<{ in_loop: number[] }>({
    url: `${environment.baseUrl}/inloop`,
    headers: {
      Accept: "application/json"
    }
  });

  const [inLoop, setInLoop] = useState(loopData?.data?.in_loop ?? []);

  React.useEffect(() => {
    getData().catch(e => console.log(e));
  }, []);

  React.useEffect(
    () => setInLoop(loopData?.data?.in_loop ?? []),
    [loopData.data]
  );

  const [isRefreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    await getData();
    setRefreshing(false);
  };

  const updateLoop = (gpio: number, auto: boolean) => {
    auto ? setInLoop([...inLoop, gpio]) : setInLoop(inLoop.filter(h => h !== gpio));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <FlatList
          refreshControl={(
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refresh}
            />
          )}
          // style={{ minHeight: Dimensions.get("window").height }}
          contentInsetAdjustmentBehavior="automatic"
          ListHeaderComponent={<HeadingText>Sterownik ogrzewania</HeadingText>}
          ListEmptyComponent={<Text style={{ marginTop: 10, marginLeft: 10 }}>{}</Text>}
          contentContainerStyle={{ paddingBottom: 25 }}
          data={data?.heaters ?? []}
          extraData={inLoop}
          keyExtractor={(i) => i.gpio.toString()}
          renderItem={({ item }) => <HeaterCard name={item.name} gpio={item.gpio} active={item.active}
                                                auto={inLoop.includes(item.gpio)} updateFunc={updateLoop} />} />
      </SafeAreaView>
    </>
  );
}

export default HomeScreen;
