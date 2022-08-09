import React from 'react';
import { useDataAuth, useDataPermanent } from '@core/redux/Data';
import { NavigationAction } from '@navigation';

const BannedAccount = () => {
  const data = useDataPermanent();
  const { me } = useDataAuth()

  React.useEffect(() => {
    if (me.data && data.isBanned) {
      NavigationAction.resetToBannedAccount();
    }
  }, [data.isBanned, me.data]);

  return null;
};

export default BannedAccount;
