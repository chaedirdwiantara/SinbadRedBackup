import React from 'react';
import { UserContext, userReducer, userInitialState } from './user.context';

const UserProvider: React.FC = ({ children }) => {
  const [stateUser, dispatchUser] = React.useReducer(
    userReducer,
    userInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateUser,
      dispatchUser,
    }),
    [stateUser, dispatchUser],
  );
  return (
    <UserContext.Provider value={valueProvider}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
