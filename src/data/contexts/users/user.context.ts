import React from 'react';
import {
  UserInitialProps,
  userInitialState,
  userReducer,
} from '@reducer/users/user.reducer';

const UserContext = React.createContext<{
  // state: InitialStateType;
  stateUser: UserInitialProps;
  dispatchUser: React.Dispatch<any>;
}>({
  // state: initialState,
  stateUser: userInitialState,
  dispatchUser: () => null,
});

export { UserContext, userReducer, userInitialState };
