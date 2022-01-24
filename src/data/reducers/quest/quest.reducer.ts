import {
  questGeneralInitialState,
  questGeneralReducer,
  QuestGeneralInitialProps,
} from './quest-general/quest-general.reducer';
import {
  questTaskInitialState,
  questTaskReducer,
  QuestTaskInitialProps,
} from './quest-task/quest-task.reducer';
import {
  questVoucherInitialState,
  questVoucherReducer,
  QuestVoucherInitialProps,
} from './quest-voucher/quest-voucher.reducer';
/** === TYPE === */
export type QuestInitialProps = {
  questGeneral: QuestGeneralInitialProps;
  questTask: QuestTaskInitialProps;
  questVoucher: QuestVoucherInitialProps;
};
/** === INITIAL STATE === */
export const questInitialState = {
  questGeneral: questGeneralInitialState,
  questTask: questTaskInitialState,
  questVoucher: questVoucherInitialState,
};
/** === REDUCER === */
export const questReducer = (
  { questGeneral, questTask, questVoucher }: any,
  action: any,
) => ({
  questGeneral: questGeneralReducer(questGeneral, action),
  questTask: questTaskReducer(questTask, action),
  questVoucher: questVoucherReducer(questVoucher, action),
});
