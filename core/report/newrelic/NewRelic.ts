import { NewRelic } from './NewRelicModule';

export function init(firstScreen: string) {
  NewRelic().init(firstScreen);
}
