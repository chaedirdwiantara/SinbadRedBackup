import { NativeModules } from 'react-native';

type NewRelicProps = {
  init: (firstScreen: string) => void;
};

export function NewRelic(): NewRelicProps {
  return NativeModules.NewRelic;
}
