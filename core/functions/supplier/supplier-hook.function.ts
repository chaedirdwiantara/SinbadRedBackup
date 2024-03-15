/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';
import * as models from '@models';

export const useSupplierSegmentationAction = () => {
  const dispatch = useDispatch();

  return {
    fetch: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.supplierSegmentationProcess(contextDispatch, { id }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.supplierSegmentationReset(contextDispatch));
    },
  };
};

export const useSendDataToSupplierActions = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.SendDataSupplierPayload,
    ) => {
      dispatch(Actions.sendDataToSupplierProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.sendDataToSupplierReset(contextDispatch));
    },
  };
};

export const useSupplierSegmentationDetailAction = () => {
  const dispatch = useDispatch();

  return {
    fetch: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(
        Actions.supplierSegmentationDetailProcess(contextDispatch, { id }),
      );
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.supplierSegmentationDetailReset(contextDispatch));
    },
  };
};

export const useRegisterSupplierActions = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.SendDataSupplierPayload,
    ) => {
      dispatch(Actions.registerSupplierProcess(contextDispatch, { data }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.registerSupplierReset(contextDispatch));
    },
  };
};
