import { createContext, Dispatch } from 'react';
import {
  QuestInitialProps,
  questInitialState,
  questReducer,
} from '@reducer/quest/quest.reducer';

const QuestContext = createContext<{
  stateQuest: QuestInitialProps;
  dispatchQuest: Dispatch<any>;
}>({
  stateQuest: questInitialState,
  dispatchQuest: () => null,
});

export { QuestContext, questReducer, questInitialState };
