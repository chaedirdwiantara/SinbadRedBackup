import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDataCheckout, useDataReserve } from '@core/redux/Data';
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

  // => Mapping Invoice Group
  dataCheckout.invoices.map((invoice) => {
    const dataInvoice = {
      //   sellerId: ? <to be update>
      invoiceGroupId: invoice.invoiceGroupId,
      //   invoiceGroupName: ? <to be update>
      paymentTypeId: invoice.paymentType?.id,
      paymentChannelId: invoice.paymentChannel?.id,
      paylaterTypeId: null,
      brands: [] as any,
      //   portfolioId: ? -> Optional for sinbad White
      //   channelId: ? <to be update>
      //   groupId: ? <to be update>
      //   typeId: ? <to be update>
      //   clusterId: ? <to be update>
    };

    // Mapping Order Brand Products
    invoice.brands.map((brand) => {
      const dataBrands = {
        brandId: brand.brandId,
        brandName: brand.brandName,
        product: brand.products, // Missing warehouseId <to be updated>
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

const useExpiredTime = () => {
  const [isOpen, setOpen] = useState(false);
  const reserveData = useDataReserve();

  const calculateExpiredTime = () => {
    const dateReserved = new Date(reserveData.reservedAt as string);
    const dateCurrent = new Date();

    const timeReserved = dateReserved.getTime() / 1000 + 600;
    const timeNow = dateCurrent.getTime() / 1000;

    if (timeReserved >= timeNow) {
      setOpen(false);
      return false;
    } else {
      setOpen(true);
      return true;
    }
  };

  return {
    check: () => calculateExpiredTime(),
    setOpen: (value: boolean) => setOpen(value),
    isOpen,
  };
};

export { useCreateOrders, useExpiredTime };
