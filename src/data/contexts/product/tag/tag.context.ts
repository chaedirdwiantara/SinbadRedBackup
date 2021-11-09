import { createContext, Dispatch } from 'react';

import {
  TagState,
  tagInitialState,
  tagReducer,
} from '@reducer/product/tag/tag.reducer';

const TagContext = createContext<{
  stateTag: TagState;
  dispatchTag: Dispatch<any>;
}>({
  stateTag: tagInitialState,
  dispatchTag: () => null,
});

export { TagContext, tagReducer, tagInitialState };
