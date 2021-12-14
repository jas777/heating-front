export interface Heater {
  name: string,
  gpio: number,
  active: 'low' | 'high',
  auto: boolean
}
