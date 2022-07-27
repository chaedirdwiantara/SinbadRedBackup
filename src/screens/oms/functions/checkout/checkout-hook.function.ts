/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { contexts } from '@contexts';
import { useContext } from 'react';
/** === FUNCTION === */
/** => checkout action */
const useCheckoutAction = () => {
  const { stateCart } = useContext(contexts.CartContext);
  const { stateVoucher } = useContext(contexts.VoucherContext);
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      cartMaster: models.CartMaster,
    ) => {
      if (
        stateCart.postCheckProduct.data !== null &&
        stateCart.postCheckSeller.data !== null &&
        stateCart.postCheckStock.data !== null &&
        stateCart.checkBuyer.data !== null &&
        stateVoucher.checkSinbadVoucher.data !== null
      ) {
        const cartsTemp: models.CheckoutCartPayload[] = cartMaster.sellers.map(
          (seller) => {
            const products: models.CheckoutProductData[] = seller.products
              .filter((product) => product.selected)
              .map((product) => {
                let priceRules: models.ProductPriceRules | null = null;
                if (product.priceRules.length > 0) {
                  const priceRulesFirstItem = product.priceRules[0];
                  if (product.qty < priceRulesFirstItem.minQty) {
                    priceRules = null;
                  } else {
                    for (let x = 0; x < product.priceRules.length; x++) {
                      const isLast = x === product.priceRules.length - 1;
                      if (!isLast) {
                        if (
                          product.qty >= product.priceRules[x].minQty &&
                          product.qty < product.priceRules[x + 1].minQty
                        ) {
                          priceRules = product.priceRules[x];
                          break;
                        }
                      } else {
                        priceRules = product.priceRules[x];
                      }
                    }
                  }
                }

                return {
                  productId: product.productId,
                  externalProductCode: product.externalProductCode || '',
                  warehouseId: product.warehouseId,
                  warehouseName: product.warehouseName || '',
                  externalWarehouseCode: product.externalWarehouseCode || '',
                  categoryId: product.categoryId,
                  brandId: product.brandId || '',
                  brandName: product.brandName || '',
                  productName: product.productName,
                  productImageUrl: product.productImageUrl,
                  qty: product.qty,
                  qtyPerBox: product.qtyPerBox,
                  uomLabel: product.uomLabel,
                  taxPercentage: product.taxPercentage,
                  leadTime: product.leadTime || 0,
                  priceAfterTax:
                    priceRules !== null
                      ? priceRules.priceAfterTax
                      : product.priceAfterTax,
                  priceBeforeTax:
                    priceRules !== null
                      ? priceRules.priceBeforeTax
                      : product.priceBeforeTax,
                  taxPrice:
                    priceRules !== null
                      ? priceRules.taxPrice
                      : product.taxPrice,
                };
              });

            const foundCheckVoucher =
              stateVoucher.checkSinbadVoucher.data?.carts.find(
                (checkVoucher) => {
                  return checkVoucher.sellerId === seller.sellerId;
                },
              );

            return {
              sellerId: seller.sellerId,
              sellerName: seller.sellerName,
              sellerTaxNo: seller.sellerTaxNo,
              fullSellerAddress: seller.fullSellerAddress,
              sellerAdminId: seller.sellerAdminId,
              sellerAdminName: seller.sellerAdminName,
              sellerAdminEmail: seller.sellerAdminEmail,
              sinbadVoucherDiscountParcel:
                foundCheckVoucher?.sinbadVoucherDiscountParcel || 0,
              products,
            };
          },
        );

        const carts = cartsTemp.filter((cart) => {
          return cart.products.length > 0;
        });

        dispatch(
          Actions.checkoutProcess(contextDispatch, {
            data: {
              buyerAddress: {
                longitude: stateCart.checkBuyer.data.longitude,
                latitude: stateCart.checkBuyer.data.latitude,
                province: stateCart.checkBuyer.data.province,
                city: stateCart.checkBuyer.data.city,
                district: stateCart.checkBuyer.data.district,
                urban: stateCart.checkBuyer.data.urban,
                zipCode: stateCart.checkBuyer.data.zipCode,
                address: stateCart.checkBuyer.data.address,
                noteAddress: stateCart.checkBuyer.data.noteAddress,
                locationId: stateCart.checkBuyer.data.locationId,
              },
              buyerName: stateCart.checkBuyer.data.buyerName,
              buyerCode: stateCart.checkBuyer.data.buyerCode,
              buyerTaxNo: stateCart.checkBuyer.data.buyerTaxNo,
              userFullName: stateCart.checkBuyer.data.userFullname,
              userPhoneNumber: stateCart.checkBuyer.data.userPhoneNumber,
              ownerFullName: stateCart.checkBuyer.data.ownerFullname,
              ownerPhoneNumber: stateCart.checkBuyer.data.ownerPhoneNumber,
              ownerId: stateCart.checkBuyer.data.ownerId,
              ownerIdNo: stateCart.checkBuyer.data.ownerIdNo,
              sinbadVoucherId: null,
              sinbadVoucherDiscountOrder:
                stateVoucher.checkSinbadVoucher.data.sinbadVoucherDiscountOrder,
              carts,
            },
          }),
        );
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.checkoutReset(contextDispatch));
    },
  };
};
/** => payment detail accordion */
const usePaymentDetailAccorrdion = () => {
  const [active, setActive] = React.useState<number | null>(null);
  return {
    changeActive: (index: number) => {
      if (index === active) {
        setActive(null);
      } else {
        setActive(index);
      }
    },
    active,
  };
};
/** => get TNC content */
const useGetTncContent = () => {
  const dispatch = useDispatch();
  return {
    tncContentGet: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.checkoutTNCProcess(contextDispatch, { id }));
    },
    tncContentReset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.checkoutTNCReset());
    },
  };
};
/** === EXPORT === */
export { useCheckoutAction, usePaymentDetailAccorrdion, useGetTncContent };
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: eryz (team)
 * createDate: 16022022
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
