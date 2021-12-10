import React, { useState } from "react";
import axios from "axios";

const useHeater = (auto: boolean, baseUrl: string, gpio: number, updateFunc?: (gpio: number, auto: boolean) => void) => {
  const [isAuto, setAuto] = useState(auto);

  React.useEffect(() => {
    setAuto(auto);
  }, [auto]);

  const toggle = () => {
    axios.post(`${baseUrl}/toggle/${gpio}`).then(r => {
      setAuto(!isAuto);
      if (updateFunc) {
        updateFunc(gpio, !isAuto);
      }
    });
  };

  const enable = () => {
    axios.post(`${baseUrl}/enable/${gpio}`).then(r => {
      setAuto(false);
      if (updateFunc) {
        updateFunc(gpio, false);
      }
    });
  };

  const disable = () => {
    axios.post(`${baseUrl}/disable/${gpio}`).then(r => {
      setAuto(false);
      if (updateFunc) {
        updateFunc(gpio, false);
      }
    });
  };

  return {
    isAuto,
    setAuto,
    toggle,
    disable,
    enable
  };

};

export default useHeater;
