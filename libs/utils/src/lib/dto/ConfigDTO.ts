import Heater from "./Heater";

export interface ConfigDTO {
  interval: number;
  duration: number;
  heaters: Heater[];
}
