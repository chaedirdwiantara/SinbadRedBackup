import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

export type State = {
  status: string;
  orderStatus: string;
  subOrderStatus: string;
  keyword: string;
};
type HistoryListCTX = [state: State, setState: Dispatch<SetStateAction<State>>];

const defaultValue = {
  status: 'waiting_for_payment',
  orderStatus: '',
  subOrderStatus: '',
  keyword: '',
};

const Context = createContext<HistoryListCTX>([defaultValue, () => {}]);
// hoc provider for history list screen
const Provider = (Component: any) => (props: unknown) => {
  const [state, setState] = useState<State>(defaultValue);
  return (
    <Context.Provider value={[state, setState]}>
      <Component {...props} />
    </Context.Provider>
  );
};

export { Provider, Context };
