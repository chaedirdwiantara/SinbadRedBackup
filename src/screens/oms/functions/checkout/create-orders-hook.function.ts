import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDataCheckout } from '@core/redux/Data';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';

/** === FUNCTION === */
/** => Create Orders */
const useCreateOrders = () => {
  const dispatch = useDispatch();
  const dataCheckout: models.CheckoutDataMaster = useDataCheckout();

  const createOrdersData: any = {
    cartId: dataCheckout.cartId,
    data: [],
    verification: {},
  };

  dataCheckout.invoices.map((invoice) => {
    const dataInvoice = {
      // => Mapping Invoice Group
      invoiceGroupId: invoice.invoiceGroupId,
      paymentTypeId: invoice.paymentType?.id,
      paymentChannelId: invoice.paymentChannel?.id,
      paylaterTypeId: invoice.paylaterType?.id, // Not defined on Interface
      brands: [] as any,
      //   supplierId: ?
      //   portfolioId: ?
      //   invoiceGroupName: ?
      //   sellerId: ?
      //   channelId: ?
      //   groupId: ?
      //   typeId: ?
      //   clusterId: ?
    };

    // Mapping Order Brand Products
    invoice.brands.map((brand) => {
      const dataBrands = {
        brandId: brand.brandId,
        brandName: brand.brandName,
        product: brand.products, // Missing warehouseId
      };
      dataInvoice.brands.push(dataBrands);
    });

    createOrdersData.verification = {
      promosSeller: invoice.promoSellers,
      vouchersSeller: invoice.vouchers,
    };

    // Push Order Brand Products
    createOrdersData.data.push(dataInvoice);
  });

  return {
    create: (contextDispatch: (actions: any) => any) => {
      console.log('Checkout Master', dataCheckout);
      console.log('Create Orders', createOrdersData);
      //   dispatch(Actions.createOrdersProcess(contextDispatch, { data }));
    },
  };
};

export { useCreateOrders };
