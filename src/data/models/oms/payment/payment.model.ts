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
  
  interface IPaymentChannelType {
    id: number;
    name: string;
    image: string;
    totalFee: number;
    status: string;
    message: string;
  }