/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
const getList = (
  payload: models.ListProcessProps<models.QuestListProcessProps>,
) => {
  const path = `quests?buyerId=${payload.buyerId}&status=${payload.status}&$limit=${payload.limit}&$skip=${payload.skip}`;
  return apiMapping<models.QuestListItem[]>(
    'auth',
    path,
    'quests',
    'v1',
    'LIST',
  );
};

const getDetail = (payload: models.QuestDetailProcessProps) => {
  const path = `quests/${payload.id}?buyerId=${payload.buyerId}`;
  return apiMapping<models.QuestDetailItem>(
    'auth',
    path,
    'quests',
    'v1',
    'DETAIL',
  );
};

const updateTask = (payload: object) => {
  const path = 'task-buyer-progress';
  return apiMapping('auth', path, 'quests', 'v1', 'UPDATE', payload);
};

export const QuestApi = {
  getList,
  getDetail,
  updateTask,
};
