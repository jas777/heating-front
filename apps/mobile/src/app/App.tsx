import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity, FlatList,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// @ts-ignore
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
import styled from 'styled-components';
import {useAxios} from "use-axios-client";
import environment from "../environments/environment";
import {ConfigDTO, Heater} from "@heating-front/utils";
import HeaterCard from "../components/HeaterCard";
import axios from "axios";

const App = () => {

  const HeadingText = styled(Text)`
    color: #4F46E5;
    font-size: 30px;
    margin: 5px auto auto;
    font-weight: bold;
    background-color: transparent;
  `

  const {data, error, loading} = { data: '', error: '', loading: '' };

  axios.get(`${environment.baseUrl}/config`).then(d => console.log(d))

  const {data: heatersInLoop} = useAxios<{ in_loop: number[] }>({
    url: `${environment.baseUrl}/inloop`
  });

  console.log(error?.message ?? '');

  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView>
        <FlatList
          contentInsetAdjustmentBehavior="automatic"
          ListHeaderComponent={<HeadingText>Sterownik ogrzewania</HeadingText>}
          ListEmptyComponent={<Text style={{marginTop: 10, marginLeft: 10}}>Pobieranie danych...</Text>}
          data={data?.heaters ?? []}
          keyExtractor={(i) => i.gpio.toString()}
          renderItem={({item}) => <HeaterCard name={item.name} gpio={item.gpio} active={item.active}
                                              auto={heatersInLoop.in_loop.includes(item.gpio)}/>}/>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  header: {
    backgroundColor: '#143055',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  logo: {
    width: 200,
    height: 180,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  link: {
    color: '#45bc98',
  },
  githubStarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  githubStarBadge: {
    borderWidth: 1,
    borderColor: Colors.dark,
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontWeight: '600',
  },
});

export default App;
