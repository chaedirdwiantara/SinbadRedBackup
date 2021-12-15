import { createContext, Dispatch } from 'react';
import {
  QuestState,
  questInitialState,
  questReducer,
} from '@reducer/quest/quest.reducer';

const QuestContext = createContext<{
  stateQuest: QuestState;
  dispatchQuest: Dispatch<any>;
}>({
  stateQuest: questInitialState,
  dispatchQuest: () => null,
});

export { QuestContext, questReducer, questInitialState };
