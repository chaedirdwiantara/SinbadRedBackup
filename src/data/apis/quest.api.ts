/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
const getList = (
  payload: models.ListProcessProps<models.QuestListProcessProps>,
) => {
  const path = `quests?status=${payload.status}&$limit=${payload.limit}&$skip=${payload.skip}`;
  return apiMapping<models.QuestListItem[]>(
    'auth',
    path,
    'quests',
    'v1',
    'LIST',
  );
};

const getDetail = (payload: models.QuestDetailProcessProps) => {
  const path = `quests/${payload.id}`;
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

const getDetailTask = (payload: models.QuestDetailProcessProps) => {
  const path = `quest-tasks/${payload.id}`;
  return apiMapping<models.QuestTaskDetailItem>(
    'auth',
    path,
    'quests',
    'v1',
    'DETAIL',
  );
};

const getValidateVoucherCode = (
  payload: models.QuestValidateVoucherProcessProps,
) => {
  const path = `/task-codes/verification?code=${payload.code}`;
  return apiMapping<models.QuestValidateVoucherItem>(
    'auth',
    path,
    'quests',
    'v1',
    'DETAIL',
  );
};

const submitVoucher = (payload: object) => {
  const path = 'task-codes/verification';
  return apiMapping('auth', path, 'quests', 'v1', 'CREATE', payload);
};

export const QuestApi = {
  getList,
  getDetail,
  updateTask,
  getDetailTask,
  getValidateVoucherCode,
  submitVoucher,
};
