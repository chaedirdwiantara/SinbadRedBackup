import * as models from '@models';

export interface SendDataSupplierProps {
  supplierId: number;
}

export interface SendDataSupplierDataProps
  extends models.CreateItemSuccessProps {}

export interface SendDataSupplierSuccessProps
  extends models.CreateSuccessProps {}
