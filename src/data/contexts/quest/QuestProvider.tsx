import React, { FC, useReducer, useMemo } from 'react';
import { QuestContext, questReducer, questInitialState } from './quest.context';

const QuestProvider: FC = ({ children }) => {
  const [stateQuest, dispatchQuest] = useReducer(
    questReducer,
    questInitialState,
  );
  const valueProvider = useMemo(
    () => ({
      stateQuest,
      dispatchQuest,
    }),
    [stateQuest, dispatchQuest],
  );

  return (
    <QuestContext.Provider value={valueProvider}>
      {children}
    </QuestContext.Provider>
  );
};

export { QuestProvider, QuestContext };
