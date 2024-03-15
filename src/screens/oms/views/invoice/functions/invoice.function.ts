/** === IMPORT PACKAGE === */
import { useDispatch } from "react-redux";
/** === IMPORT INTERNAL === */
import * as Actions from "@actions";
import * as models from "@models";
/** === FUNCTIONS === */
const callProcessAction = (
  contextDispatch: (action: any) => any,
  payload: models.InvoiceProcessProps
) => {
  return Actions.InvoiceProcess(contextDispatch, {
    ...payload,
  });
};

export const invoiceAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      payload: models.InvoiceProcessProps
    ) => {
      contextDispatch(Actions.InvoiceReset(dispatch));
      dispatch(callProcessAction(contextDispatch, payload));
    },
    refresh: (
      contextDispatch: (action: any) => any,
      payload: models.InvoiceProcessProps
    ) => {
      contextDispatch(Actions.InvoiceRefresh());
      dispatch(callProcessAction(contextDispatch, payload));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.InvoiceReset(dispatch));
    },
  };
};
