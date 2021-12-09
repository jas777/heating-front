import {environment} from "../../environments/environment";
import {useHeater, Heater} from "@heating-front/utils";

const HeaterCard = (props: Heater & { className?: string }) => {

  const {isAuto, setAuto, disable, toggle, enable} = useHeater(props.auto, environment.baseUrl, props.gpio);

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
