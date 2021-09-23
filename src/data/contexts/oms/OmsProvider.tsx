import React from 'react';
import { OmsContext, omsReducer, omsInitialState } from './oms.context';

const OmsProvider: React.FC = ({ children }) => {
  const [stateOms, dispatchOms] = React.useReducer(omsReducer, omsInitialState);
  const valueProvider = React.useMemo(
    () => ({
      stateOms,
      dispatchOms,
    }),
    [stateOms, dispatchOms],
  );
  return (
    <OmsContext.Provider value={valueProvider}>{children}</OmsContext.Provider>
  );
};

export { OmsProvider, OmsContext };
