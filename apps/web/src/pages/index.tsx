import {useRef} from "react";
import styled from 'styled-components';
import { useAxios } from 'use-axios-client';
import axios from 'axios';
import ConfigDTO from "../shared/dto/ConfigDTO";
import HeaterCard from "../shared/components/HeaterCard";

export function Home() {

  const {data, loading} = useAxios<ConfigDTO>({
    url: `${process.env.REACT_APP_BASE_URL}/config`
  });

  const {data: heatersInLoop} = useAxios<{ in_loop: number[] }>({
    url: `${process.env.REACT_APP_BASE_URL}/inloop`
  });

  const StyledHeater = styled(HeaterCard)`
      //width: fit-content;
      margin: 1em 0 1em 2em;
    `

  const toDisplay = (!data || loading) ? <li><p className='ml-8'>Pobieranie danych...</p></li> : data.heaters.map(h => {
    return <StyledHeater name={h.name} active={h.active} gpio={h.gpio}
                         auto={!!heatersInLoop?.in_loop.includes(h.gpio)}/>
  })

  const durationRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<HTMLInputElement>(null);

  const sendUpdate = () => {

    if (!intervalRef.current || !durationRef.current) return;

    axios.put(`${process.env.REACT_APP_BASE_URL}/update`, {
      interval: Number(intervalRef.current.value),
      duration: Number(durationRef.current.value)
    })
  }

  return (
    <div className='flex flex-col overflow-hidden'>
      <h1 className='text-5xl m-6 font-bold text-indigo-600'>Sterownik ogrzewania</h1>
      <div className='mx-6 my-4'>
        <p className='text-3xl font-semibold'>Grzejniki</p>
        <ul data-testid='heaters' className='-ml-8 flex flex-wrap'>{toDisplay}</ul>
      </div>
      <div className='mx-6 my-4 text-2xl font-semibold'>
        <form action="">
          <label htmlFor='duration'>Grzejniki mają się włączać na</label>
          <input key={data?.duration} type="number" name='duration' id='duration' ref={durationRef}
                 defaultValue={(data?.duration ?? 0) / 1000 / 60}/>
          <label htmlFor="interval"> minut co </label>
          <input key={data?.interval} type="number" name='interval' id='interval' ref={intervalRef}
                 defaultValue={(data?.interval ?? 0) / 1000 / 60}/>
          <span> minut</span>
          <button
            className='block bg-pink-600 text-white p-2 my-4 text-lg rounded-lg hover:bg-pink-700 transition-all duration-200'
            onClick={(e) => {
              sendUpdate();
              e.preventDefault()
            }}
          >Zapisz
          </button>
        </form>
      </div>
    </div>
  );

}

export default Home;
