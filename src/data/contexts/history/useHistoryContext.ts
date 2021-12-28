import { useContext } from 'react';

import { HistoryContext } from './history.context';

export const useHistoryContext = () => {
  const context = useContext(HistoryContext);

  if (context === undefined) {
    throw new Error('useHistoryContext was used outside of HistoryProvider');
  }

  return context;
};
