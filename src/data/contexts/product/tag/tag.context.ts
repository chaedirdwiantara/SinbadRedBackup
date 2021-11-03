import { createContext, Dispatch } from 'react';

import {
  TagInitialProps,
  tagInitialState,
  tagReducer,
} from '@reducer/product/tag/tag.reducer';

const TagContext = createContext<{
  stateTag: TagInitialProps;
  dispatchTag: Dispatch<any>;
}>({
  stateTag: tagInitialState,
  dispatchTag: () => null,
});

export { TagContext, tagReducer, tagInitialState };
