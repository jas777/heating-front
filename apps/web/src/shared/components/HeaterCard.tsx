import axios from "axios";
import {useState} from "react";
import Heater from "../dto/Heater";

const HeaterCard = (props: Heater & { className?: string }) => {

  const [isAuto, setAuto] = useState(props.auto);

  const toggle = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/toggle/${props.gpio}`).then(r => {
      setAuto(!isAuto)
    })
  }

  const enable = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/enable/${props.gpio}`).then(r => {
      setAuto(false);
    })
  }

  const disable = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/disable/${props.gpio}`).then(r => {
      setAuto(false);
    })
  }

  return (
    <div className={`w-48 select-none flex flex-col shadow-lg ${props.className}`}>
      <button onClick={toggle}
              className={`flex rounded-t-lg justify-center w-full heater-mode-info ${isAuto ? 'bg-purple-600' : 'bg-red-600'}`}>
        {isAuto ? 'AUTO' : 'MANUAL'}
      </button>
      <div className='w-full bg-gray-200 text-xl text-center p-2'>
        <p>{props.name}</p>
      </div>
      <div className='flex bg-gray-200 w-full'>
        <button
          className='w-1/2 bg-red-600 text-white py-1 hover:bg-red-700 transition-all duration-200'
          onClick={disable}
        >Wyłącz
        </button>
        <button
          className='w-1/2 bg-green-500 text-white py-1 hover:bg-green-600 transition-all duration-200'
          onClick={enable}
        >Włącz
        </button>
      </div>
    </div>
  )

}

export default HeaterCard;
