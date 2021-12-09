import Heater from "./Heater";

export default interface ConfigDTO {
  interval: number;
  duration: number;
  heaters: Heater[];
}
