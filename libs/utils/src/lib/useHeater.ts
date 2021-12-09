import {useState} from "react";
import axios from "axios";

const useHeater = (auto: boolean, baseUrl: string, gpio: number) => {
  const [isAuto, setAuto] = useState(auto);

  const toggle = () => {
    axios.post(`${baseUrl}/toggle/${gpio}`).then(r => {
      setAuto(!isAuto)
    })
  }

  const enable = () => {
    axios.post(`${baseUrl}/enable/${gpio}`).then(r => {
      setAuto(false);
    })
  }

  const disable = () => {
    axios.post(`${baseUrl}/disable/${gpio}`).then(r => {
      setAuto(false);
    })
  }

  return {
    isAuto,
    setAuto,
    toggle,
    disable,
    enable
  }

}

export default useHeater
