/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect, useState, useContext } from 'react';
import { ScrollView } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
import LoadingPage from '@core/components/LoadingPage';
import { contexts } from '@contexts';
/** === IMPORT EXTERNAL COMPONENT === */
import { CheckoutHeader } from './checkout-header.view';
import { CheckoutAddressView } from './checkout-address.view';
import { CheckoutInvoiceGroupView } from './checkout-invoice-group.view';
import ModalBottomErrorExpiredTime from './expired-time.modal.view';
import { CheckoutBottomView } from './checkout-bottom.view';
import {
  useGetCartAction,
  useCartMasterAction,
  useCheckProductAction,
  useCheckSellerAction,
  useCheckStockAction,
  useRemoveCartProductAction,
  useCartLocalData,
  useOmsGeneralFailedState,
  useGetTotalCartAction,
  useCartBuyerAddressAction,
  useCancelStockAction,
  useUpdateCartAction,
} from '../../functions';
import { goToShoppingCart } from '@core/functions/product';

/** === COMPONENT === */
const OmsCheckoutView: FC = () => {
  /** => ACTION */
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const getCartAction = useGetCartAction();
  const cartMasterAction = useCartMasterAction();
  const checkProductAction = useCheckProductAction();
  const checkSellerAction = useCheckSellerAction();
  const checkStockAction = useCheckStockAction();
  const removeCartProductAction = useRemoveCartProductAction();
  const totalCartActions = useGetTotalCartAction();
  const cartBuyerAddressAction = useCartBuyerAddressAction();
  const cancelCartAction = useCancelStockAction();
  const updateCartAction = useUpdateCartAction();

  /** === HOOK === */
  const [isExpiredSession, setExpiredSession] = useState(false);
  // const { stateCheckout } = useContext(contexts.CheckoutContext);
  // const data = stateCheckout.checkout.data;

  /** === DUMMY === */
  const data = {
    id: '53c9b0000000000000000000',
    userId: 2,
    cartId: '62173bc2cf4b811334e2d5c4',
    buyerId: 1,
    sellers: [
      {
        sellerId: 1,
        sellerName: 'Seller 1',
        products: [
          {
            productId: '53c9b0000000000000000000',
            warehouseId: 3,
            warehouseName: 'ATAPI DC Kemang',
            categoryId: 'e3a76d0b-4aa9-4588-8bdd-2840236e5ec4',
            brandId: '33d200000000000000000000',
            brandName: 'ATAPI SGM',
            productName: 'Bintang',
            productImageUrl:
              'https://images.k24klik.com/product/large/apotek_online_k24klik_2021080901503023085_FAW-Hero-Image-Thumbnail-SGM-Eksplor-Gain-Optigrow-1-Plus-Vanila-400g-01.png',
            qty: 10,
            minQty: 3,
            multipleQty: 10,
            qtyPerBox: 40,
            uomLabel: 'PCS',
            isPriceAfterTax: true,
            taxPercentage: 10,
            lastUsedPrice: 13707.099609375, //price
            leadTime: 10,
            price: 100000,
            priceRules: {
              minQty: 8,
              maxQty: 10,
              price: 1212121,
            },
          },
          {
            productId: '53c9b0000000000000000002',
            warehouseId: 4,
            warehouseName: 'ATAPI DC Kemang',
            categoryId: 'e3a76d0b-4aa9-4588-8bdd-2840236e5ec5',
            brandId: '33d200000000000000000003',
            brandName: 'ATAPI SGM',
            productName: 'Guinness',
            productImageUrl:
              'https://images.k24klik.com/product/large/apotek_online_k24klik_2021080901503023085_FAW-Hero-Image-Thumbnail-SGM-Eksplor-Gain-Optigrow-1-Plus-Vanila-400g-01.png',
            qty: 10,
            minQty: 3,
            multipleQty: 10,
            qtyPerBox: 40,
            uomLabel: 'PCS',
            isPriceAfterTax: true,
            taxPercentage: 10,
            lastUsedPrice: 13707.099609375, //price
            leadTime: 10,
            price: 100000,
            priceRules: {
              minQty: 8,
              maxQty: 10,
              price: 1212121,
            },
          },
        ],
      },
      {
        sellerId: 2,
        sellerName: 'Seller 2',
        products: [
          {
            productId: '53c9b0000000000000000001',
            warehouseId: 3,
            warehouseName: 'ATAPI DC Cianjur',
            categoryId: 'e3a76d0b-4aa9-4588-8bdd-2840236e5ec5',
            brandId: '33d200000000000000000001',
            brandName: 'MADU TJ',
            productName: 'ATAPI MADU TIGA RAKSA',
            productImageUrl:
              'https://s1.bukalapak.com/img/1586409473/large/Madu_TJ_murni_500_gram.jpg.webp',
            qty: 20,
            minQty: 3,
            multipleQty: 10,
            qtyPerBox: 40,
            uomLabel: 'PCS',
            isPriceAfterTax: true,
            taxPercentage: 10,
            lastUsedPrice: 15707.099609375, //price
            leadTime: 10,
            price: 120000,
            priceRules: {
              minQty: 8,
              maxQty: 10,
              price: 1212121,
            },
          },
        ],
      },
    ],
    buyerName: 'Toko Ahmad',
    buyerAddress: {
      longtitude: '106°49′35.76',
      latitude: '6°10′30.00',
      province: 'DKI Jakarta',
      city: 'Jakarta Selatan',
      district: 'Jakarta',
      urban: 'Jakarta',
      zipCode: '445351',
      address: 'Jalan Jakarta',
      noteAddress: 'pagar putih',
      locationId: '53c9b0000000000000000000',
    },
  };

  /** => set expired time  */
  const dateCurrent = new Date();
  const timeNow = dateCurrent.getTime() / 1000;
  const addTime = dateCurrent.getTime() / 1000 + 300000;
  const timeToExpired = addTime - timeNow;
  useEffect(() => {
    setTimeout(() => {
      setExpiredSession(true);
    }, timeToExpired);
  }, []);

  /** handle back to cart */
  const handleBackToCart = () => {
    checkProductAction.reset(dispatchCart);
    checkSellerAction.reset(dispatchCart);
    checkStockAction.reset(dispatchCart);
    getCartAction.reset(dispatchCart);
    removeCartProductAction.reset(dispatchCart);
    cartMasterAction.reset();
    cartBuyerAddressAction.reset(dispatchCart);
    updateCartAction.reset(dispatchCart);
    setExpiredSession(false);
    goToShoppingCart();
  };

  return (
    <SnbContainer color="grey">
      <CheckoutHeader
        backAction={() => {
          // backToCartModal.setOpen(true);
        }}
      />
      {/* {checkoutLoading ? (
        <LoadingPage />
      ) : ( */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <CheckoutAddressView
          buyerAddress={data.buyerAddress}
          buyerName={data.buyerName}
        />
        <CheckoutInvoiceGroupView data={data} />
      </ScrollView>

      <ModalBottomErrorExpiredTime
        isOpen={isExpiredSession}
        close={handleBackToCart}
      />

      <CheckoutBottomView
        data={data}
        // openTCModal={() => paymentTCModal.setOpen(true)}
        // openErrorWarning={() => errorWarningModal.setOpen(true)}
        // closeErrorWarning={() => errorWarningModal.setOpen(false)}
        // checkExpiredTime={handleCheckExpiredSession}
      />

      {/* )} */}
    </SnbContainer>
  );
};

export default OmsCheckoutView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: ryan (voyager)
 * createDate: 10092021
 * updatedBy: Andi Chaedir Dwiantara (valkyrie)
 * updatedDate: 08032022
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
