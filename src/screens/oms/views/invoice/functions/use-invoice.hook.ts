import { useCallback } from "react";
import { invoiceAction } from "./invoice.function";
import { useGetNavParams } from "@core/functions/navigation/navigation-hook.function";
import { useInvoiceContext } from "src/data/contexts/oms/invoice/useInvoiceContext";

export const useInvoice = (type: string) => {
  const { params } = useGetNavParams();
  const { dispatchInvoice } = useInvoiceContext();
  const { fetch, reset } = invoiceAction();

  const get = useCallback(() => {
    fetch(dispatchInvoice, {
      id: params?.id,
      orderCode: params?.orderCode,
      type,
    });
  }, [params?.id]);

  const clear = useCallback(() => {
    reset(dispatchInvoice);
  }, []);

  return { get, clear };
};
