import { useContext } from 'react';

import { TagContext } from './tag.context';

export const useTagContext = () => {
  const context = useContext(TagContext);

  if (context === undefined) {
    throw new Error('useTagContext was used outside of TagProvider');
  }

  return context;
};
