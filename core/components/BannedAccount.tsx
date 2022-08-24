import React from 'react';
import { useDataAuth, useDataPermanent } from '@core/redux/Data';
import { NavigationAction } from '@navigation';

const BannedAccount = () => {
  const { userBanned } = useDataPermanent();
  const { me } = useDataAuth()

  React.useEffect(() => {
    if ((me.data?.user.id === userBanned?.userId) && userBanned?.isBanned) {
      NavigationAction.resetToBannedAccount();
    }
  }, [userBanned, me.data]);

  return null;
};

export default BannedAccount;
