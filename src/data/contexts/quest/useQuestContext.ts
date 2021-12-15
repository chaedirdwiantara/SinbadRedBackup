import { useContext } from 'react';
import { QuestContext } from './quest.context';

export const useQuestContext = () => {
  const context = useContext(QuestContext);

  if (context === undefined) {
    throw new Error('useQuestContext was used outside of QuestProvider');
  }
  return context;
};
