import { useNavigation } from '@react-navigation/native';
import React from 'react';

const useOTP: any = () => {
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  return {
    func: {
      setLoading,
    },
    state: {
      loading,
    },
    ...navigation,
  };
};

export default useOTP;
