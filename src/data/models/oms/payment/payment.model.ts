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
  storeId : number;
  paymentTypes : IPaymentType[]
  paymentChannels: IPaymentChannel[]
}
interface IPaymentChannelType {
  id: number;
  name: string;
  image: string;
  totalFee: number;
  status: string;
  message: string;
}

interface IPaymentType {
  paymentTypeId : number;
  name: string;
  term: string;
}

interface IPaymentChannel {
  paymentChannelId : number;
  name: string;
  term: string;
}

export interface IPaymentLastChannelDetailProps {
  buyerId : number;
  paymentTypeChannels : IPaymentTypeChannels[]
}

export interface ISelectedPaymentChannels {
  id:number;
  name: string;
  iconUrl: string;
}
interface IPaymentTypeChannels {
  invoiceGroupId : number;
  totalFee: number;
  totalPayment: number;
  paymentType: ILastPaymentTypeChannel[];
  paymentChannel: ILastPaymentTypeChannel[];
}

interface ILastPaymentTypeChannel {
  id : number;
  name: string;
  iconUrl: string;
}