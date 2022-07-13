import { NativeModules } from 'react-native';

type UpdateAvailablelity = boolean;

interface UpdateProps {
  checkAppUpdate(data: any): Promise<boolean>;
}

export function Update(): UpdateProps {
  return NativeModules.Update;
}
