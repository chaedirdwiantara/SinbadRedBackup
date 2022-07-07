import { NativeModules } from 'react-native';

function NewRelic(): Promise<{
  init: string;
}> {
  return NativeModules.NewRelic;
}

export default NewRelic;
