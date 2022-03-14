import { useEffect, useContext } from 'react';
import { HistoryListContext } from '../../components/order-history-list';

const { Context } = HistoryListContext;

export const useInitialGetList = () => {
  const [state] = useContext(Context);
  useEffect(() => {
    // list history
    // get & reload by filter
  }, [state.keyword, state.orderStatus, state.status]);
};
