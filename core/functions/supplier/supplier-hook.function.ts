/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';

const useSupplierSegmentationAction = () => {
  const dispatch = useDispatch();

  return {
    fatch: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.supplierSegmentationProcess(contextDispatch, { id }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.supplierSegmentationReset());
    },
  };
};

export { useSupplierSegmentationAction };
