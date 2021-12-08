import * as models from '@models';

export interface ICartMasterProductNotAvailable {
  productId: string;
  displayPrice: number;
  warehouseId: number;
  urlImages: string;
}

export interface IVoucherIdCartMaster {
  type: string;
  IvoucherId: number;
}

export interface ICartMaster extends models.CartSuccessProps {
  dataNotFound: ICartMasterProductNotAvailable[];
  dataEmptyStock: ICartMasterProductNotAvailable[];
  others: models.IOtherInformationStock[];
  voucherIds?: IVoucherIdCartMaster[];
}

export interface ICartDeleteProductPayload {
  productId: string;
}