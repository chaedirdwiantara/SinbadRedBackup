import * as models from '@models';
/** => update verification cart payload */
export interface UpdateVerificationCart {
  type: string;
  payload: models.CartSuccessProps;
}
