import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

export const mockData = [
  {
    id: '1',
    sellerName: 'PT. TIGARAKSA SATRIA TBK',
    statusValue: 'created',
    statusLabel: 'Diproses',
    product: {
      image: 'https://images.sinbad.co.id/odoo_img/product/118378.png',
      name: 'SGM Ananda 1',
      qty: '1',
      uom: 'pcs',
      totalPrice: 100000,
    },
    totalOrderProducts: 3,
    totalOrderPrice: 100000,
    orderedAt: '2022-03-10T03:16:19.401Z',
    isCancellable: true,
    isOrderDone: false,
  },
  {
    id: '2',
    sellerName: 'PT. TIGARAKSA SATRIA TBK',
    statusValue: 'packed',
    statusLabel: 'Dikemas',
    product: {
      image: 'https://images.sinbad.co.id/odoo_img/product/118378.png',
      name: 'SGM Ananda 1',
      qty: '1',
      uom: 'pcs',
      totalPrice: 100000,
    },
    totalOrderProducts: 3,
    totalOrderPrice: 100000,
    orderedAt: '2022-03-10T03:16:19.401Z',
    cancelledAt: '2022-03-10T13:16:19.401Z',
    isCancellable: false,
    isOrderDone: false,
  },
  {
    id: '3',
    sellerName: 'PT. TIGARAKSA SATRIA TBK',
    statusValue: 'shipped',
    statusLabel: 'Dikirim',
    product: {
      image: 'https://images.sinbad.co.id/odoo_img/product/118378.png',
      name: 'SGM Ananda 1',
      qty: '1',
      uom: 'pcs',
      totalPrice: 100000,
    },
    totalOrderProducts: 3,
    totalOrderPrice: 100000,
    orderedAt: '2022-03-10T03:16:19.401Z',
    isCancellable: false,
    isOrderDone: false,
  },
  {
    id: '4',
    sellerName: 'PT. TIGARAKSA SATRIA TBK',
    statusValue: 'delivered',
    statusLabel: 'Tiba di Tujuan',
    product: {
      image: 'https://images.sinbad.co.id/odoo_img/product/118378.png',
      name: 'SGM Ananda 1',
      qty: '1',
      uom: 'pcs',
      totalPrice: 100000,
    },
    totalOrderProducts: 3,
    totalOrderPrice: 100000,
    orderedAt: '2022-03-10T03:16:19.401Z',
    doneAt: '2022-03-11T03:16:19.401Z',
    isCancellable: false,
    isOrderDone: true,
  },
];

export type State = {
  status: string;
  orderStatus: string;
  keyword: string;
  data: typeof mockData;
};
type HistoryListCTX = [state: State, setState: Dispatch<SetStateAction<State>>];

const defaultValue = {
  status: '',
  orderStatus: '',
  keyword: '',
  data: mockData,
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
