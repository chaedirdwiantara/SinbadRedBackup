/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
const getList = (
  payload: models.ListProcessProps<models.QuestListProcessProps>,
) => {
  console.log(payload, 'payloadQuest');
  const path = `quests?limit=${payload.limit}&skip=${payload.skip}&status=${payload.status}&buyerId=${payload.buyerId}`;
  return apiMapping<models.QuestListItem[]>(
    'auth',
    path,
    'quests',
    'v1',
    'LIST',
  );
};

export const QuestApi = {
  getList,
};
