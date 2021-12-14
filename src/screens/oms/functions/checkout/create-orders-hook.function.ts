import React from 'react';
import { useDispatch } from 'react-redux';
import { useDataCheckout, useDataReserve } from '@core/redux/Data';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { contexts } from '@contexts';

/** === FUNCTION === */
/** => Create Orders */
const useCreateOrders = () => {
  const [isOpen, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const dataCheckout: models.CheckoutDataMaster = useDataCheckout();
  const { statePromo } = React.useContext(contexts.PromoContext);

  const transformData = (contextDispatch: any) => {
    const createOrdersData: any = {
      cartId: dataCheckout.cartId,
      data: [],
      verification: {},
    };

    // => Mapping Invoice Group
    dataCheckout.invoices.map((invoice) => {
      const dataInvoice = {
        sellerId: invoice.sellerId,
        invoiceGroupId: invoice.invoiceGroupId,
        invoiceGroupName: invoice.invoiceGroupName,
        paymentTypeId: invoice.paymentType?.id,
        paymentChannelId: invoice.paymentChannel?.id,
        paylaterTypeId: null,
        brands: [] as any,
        portfolioId: null,
        channelId: invoice.channelId,
        groupId: invoice.groupId,
        typeId: invoice.typeId,
        clusterId: invoice.clusterId,
      };

      // Mapping Order Brand Products
      invoice.brands.map((brand) => {
        const dataBrands = {
          brandId: brand.brandId,
          brandName: brand.brandName,
          products: brand.products,
        };
        dataInvoice.brands.push(dataBrands);
      });

      // Push Order Brand Products
      createOrdersData.data.push(dataInvoice);
    });

    createOrdersData.verification.promosSeller =
      statePromo.reserveDiscount.detail.data?.discountVerification.promosSeller;
    createOrdersData.verification.vouchersSeller =
      statePromo.reserveDiscount.detail.data?.discountVerification.vouchersSeller;

    dispatch(
      Actions.createOrdersProcess(contextDispatch, { data: createOrdersData }),
    );
  };

  return {
    create: (contextDispatch: (actions: any) => any) =>
      transformData(contextDispatch),
    get: () => console.log('Get Order Id'),
    setOpen: (value: boolean) => setOpen(value),
    reset: (contextDispatch: (action: any) => any) =>
      dispatch(Actions.createOrdersReset(contextDispatch)),
    isOpen,
  };
};

const useExpiredTime = () => {
  const [isOpen, setOpen] = React.useState(false);
  const reserveData = useDataReserve();

  const calculateExpiredTime = () => {
    const dateReserved = new Date(reserveData.reservedAt as string);
    const dateCurrent = new Date();

    const timeReserved = dateReserved.getTime() / 1000 + 300;
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
