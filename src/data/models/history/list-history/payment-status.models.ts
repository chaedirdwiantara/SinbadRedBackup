import * as models from '@models';

export interface IPaymentStatusList {
  status: models.PaymentStatusQuery;
  title: string;
  detail: string;
}
