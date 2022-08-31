/** === IMPORT INTERNAL === */
import { serializeQs } from '@core/functions/global/query-string';
import apiMappingV3 from '@core/services/apiMappingV3';
import * as models from '@models';

/** === CONSTANT === */
const thankyoupageInvoice = 'orders';
const orderSellerInvoice = 'order-sellers';

/** === FUNCTIONS === */

// get consolidate order history
export const getInvoice = ({
  orderCode,
  id,
  type,
}: {
  id: string;
  type: string;
  orderCode: string;
}) => {
  const params = serializeQs({
    orderCode,
    orderSellerId: id,
  });

  if (type === 'thankyoupage-Invoice') {
    return apiMappingV3<models.InvoiceProcessProps>(
      'auth',
      `${thankyoupageInvoice}/invoice/${id}`,
      'buyer-order',
      'v1',
      'DETAIL',
    );
  }

  if (type === 'orderhistory-Invoice') {
    return apiMappingV3<models.InvoiceProcessProps>(
      'auth',
      `${orderSellerInvoice}/invoice/?${params}`,
      'buyer-order',
      'v1',
      'DETAIL',
    );
  }
};
