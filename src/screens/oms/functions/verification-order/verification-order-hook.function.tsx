/** === IMPORT PACKAGE HERE === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTION === */
/** => verification action */
const useVerficationOrderAction = () => {
  const dispatch = useDispatch();
  return {
    verificationOrderCreate: (
      contextDispatch: (action: any) => any,
      data: models.CreateProcessProps<{}>,
    ) => {
      dispatch(Actions.verificationOrderCreateProcess(contextDispatch, data));
    },
    verificationOrderDetail: (
      contextDispatch: (action: any) => any,
      id: string,
    ) => {
      dispatch(Actions.verificationOrderDetailProcess(contextDispatch, { id }));
    },
    verificationReset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.verificationOrderCreateReset(contextDispatch));
      dispatch(Actions.verificationOrderDetailReset());
    },
  };
};
/** => reserve data action */
const useReserveDataAction = () => {
  const dispatch = useDispatch();
  return {
    setReservedAt: (time: string) => {
      dispatch(Actions.setReservedAt({ reservedAt: time }));
    },
  };
};
/** === EXPORT === */
export { useVerficationOrderAction, useReserveDataAction };
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
