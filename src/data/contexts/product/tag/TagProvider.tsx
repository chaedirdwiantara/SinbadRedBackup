import React, { FC, useReducer, useMemo } from 'react';

import { TagContext, tagReducer, tagInitialState } from './tag.context';

const TagProvider: FC = ({ children }) => {
  const [stateTag, dispatchTag] = useReducer(tagReducer, tagInitialState);
  const contextValue = useMemo(
    () => ({
      stateTag,
      dispatchTag,
    }),
    [stateTag, dispatchTag],
  );

  return (
    <TagContext.Provider value={contextValue}>{children}</TagContext.Provider>
  );
};

export { TagProvider, TagContext };
