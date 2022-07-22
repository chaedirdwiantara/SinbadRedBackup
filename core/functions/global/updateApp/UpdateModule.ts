import { NativeModules } from 'react-native';

interface UpdateProps {
  checkAppUpdate(data: any): Promise<boolean>;
}

export function Update(): UpdateProps {
  return NativeModules.Update;
}
