import * as models from '@models';
export interface IPaymentTypeProcessProps extends models.ListProcessProps {
  invoiceGroupId: string;
  totalCartParcel: number;
  page: number;
}

export interface IPaymentChannelProcessProps extends models.ListProcessProps {
  invoiceGroupId: string;
  totalCartParcel: number;
  paymentTypeId: number;
  page: number;
}

export interface IPaymentTypeListSuccess {
  supplierId: number;
  paymentTypes: models.IPaymentTypesList[];
}

export interface IPaymentTypeListProcessAction {
  type: string;
  payload: IPaymentTypeProcessProps;
  contextDispatch: (action: any) => any;
}
export interface IPaymentTypesList {
  id: number;
  name: string;
  iconUrl: string;
  description: string;
  terms: string;
  availableStatus: boolean;
  promoPaymentAvailable?: boolean;
}

export interface IPaymentChannelsList {
  id: number;
  name: string;
  type: IPaymentChannelType[];
}

export interface IPaymentTermsAndConditionDetailProps {
  storeId: number;
  paymentTypes: IPaymentType[];
  paymentChannels: IPaymentChannel[];
}
interface IPaymentChannelType {
  id: number;
  name: string;
  image: string;
  totalFee: number;
  status: string;
  message: string;
}

export interface IPaymentType {
  paymentTypeId: number;
  name: string;
  term: string;
}

export interface IPaymentChannel {
  paymentChannelId: number;
  name: string;
  term: string;
}

export interface IPaymentLastChannelDetailProps {
  buyerId: number;
  paymentTypeChannels: IPaymentTypeChannels[];
}

export interface ISelectedPaymentType {
  id: number;
  name: string;
  iconUrl: string;
}
interface IPaymentTypeChannels {
  invoiceGroupId: number;
  totalFee: number;
  totalPayment: number;
  paymentType: ILastPaymentTypeChannel[];
  paymentChannel: ILastPaymentTypeChannel[];
}

interface ILastPaymentTypeChannel {
  id: number;
  name: string;
  iconUrl: string;
}

export interface IPaymentChannels {
  id: number;
  name: string;
  image: string;
  totalFee: number;
  status: string;
  message: string;
  totalPayment: number;
  promoPaymentAvailable: boolean | null;
  promPaymentDescription: string | null;
  promoPaymentAmount: number | null;
}
export interface IPaymentChannelsModal {
  invoiceGroupId: number | null;
  paymentType: ISelectedPaymentType | null;
  paymentChannels: IPaymentChannels[];
}

export interface IUpdatePaymentType {
  type: string;
  payload: ISelectedPaymentType;
}

export interface IMergePaymentChannels {
  type: string;
  payload: IPaymentChannelsModal;
}
