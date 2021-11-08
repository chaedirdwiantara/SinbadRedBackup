/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useState, useMemo, Fragment } from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbCheckbox,
  SnbButton,
  SnbIcon,
  color,
  SnbDialog,
  SnbDivider,
  SnbNumberCounter,
} from 'react-native-sinbad-ui';
import { toCurrency } from '../../../../../core/functions/global/currency-format';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import {
  CheckboxStatus,
  CartProduct,
  CartBrand,
  CartInvoiceGroup,
} from '@models';
import { useVerficationOrderAction } from '../../functions/verification-order/verification-order-hook.function';
import { useCountAllVoucherAction } from '@screen/voucher/functions/voucher-hook.function';
import {
  goToVerificationOrder,
  getTotalProducts,
  handleSelectedProductChange,
  goBack,
  handleProductQuantityChange,
  handleProductDelete,
  handleSelectedBrandChange,
  handleAllSelectedProductsChange,
  getTotalPrice,
  goToVoucherCartList,
  goToCategory,
} from '../../functions';
import { countPotentialDiscount } from '@screen/voucher/functions';
import { ShoppingCartStyles } from '../../styles';
import { useDataFlagRTDB, useDataVoucher } from '@core/redux/Data';
import { RecommendationHomeView } from '@screen/recommendation/views';
import { useCheckFlagByTask } from '@core/functions/firebase/flag-rtdb.function';
import { usePrevious } from '@core/functions/hook/prev-value';
/** === DUMMIES === */
const noImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';
const invoiceGroupDummies: Array<CartInvoiceGroup> = [
  {
    name: 'TRS DNE',
    brands: [
      {
        name: 'SGM',
        selected: 'unselect',
        selectedCount: 0,
        products: [
          {
            name: 'SGM ANANDA 1 1000GR GA',
            qty: 1,
            stock: 5,
            displayPrice: 76097,
            selected: 'unselect',
            imageUrl: noImage,
            uom: 'Pcs',
          },
        ],
      },
    ],
  },
  {
    name: 'Lakme',
    brands: [
      {
        name: 'Lakme',
        selected: 'unselect',
        selectedCount: 0,
        products: [
          {
            name: 'LAKME CC CREAM ALMOND',
            qty: 1,
            stock: 2,
            displayPrice: 77891,
            selected: 'unselect',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400566.png',
            uom: 'Pcs',
          },
          {
            name: 'LAKME BLUR PERFECT CREAMER',
            qty: 1,
            stock: 10,
            displayPrice: 150000,
            selected: 'unselect',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67201003.png',
            uom: 'Pcs',
          },
        ],
      },
      {
        name: 'Lakme 2',
        selected: 'unselect',
        selectedCount: 0,
        products: [
          {
            name: ' LAKME ABSOLUTE LIQUID CONCEALER IVORY FAIR ',
            qty: 1,
            stock: 4,
            displayPrice: 98782,
            selected: 'unselect',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67145109.png',
            uom: 'Pcs',
          },
          {
            name: 'LAKME BIPHASED MAKEUP REMOVER ',
            qty: 1,
            stock: 12,
            displayPrice: 72000,
            selected: 'unselect',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/21158106.png',
            uom: 'Pcs',
          },
        ],
      },
    ],
  },
];
const userName = 'Edward';
const address =
  'Jl. Kemang III No.18, RT.12/RW.2, Bangka, Kec. Mampang Prpt.,Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12730';
/** === COMPONENT === */
const OmsShoppingCartView: FC = () => {
  /** === HOOKS === */
  const [invoiceGroups, setInvoiceGroups] =
    useState<Array<CartInvoiceGroup>>(invoiceGroupDummies);
  const [allProductsSelected, setAllProductsSelected] =
    useState<CheckboxStatus>('unselect');
  const [productSelectedCount, setProductSelectedCount] = useState(0);
  const totalProducts = useMemo(() => getTotalProducts(invoiceGroups), []);
  const [isConfirmCheckoutDialogOpen, setIsConfirmCheckoutDialogOpen] =
    useState(false);

  /**
   * VERIFICATION-ORDER SECTION
   */
  const { stateVerificationOrder, dispatchVerificationOrder } =
    React.useContext(contexts.VerificationOrderContext);
  const { verificationOrderDetail } = useVerficationOrderAction();

  /**
   * VOUCHER SECTION
   * - fetch `voucher-cart-list/count` to get total voucher
   */
  const { count } = useCountAllVoucherAction();
  const { stateVoucher, dispatchVoucher } = React.useContext(
    contexts.VoucherContext,
  );
  const voucherData = useDataVoucher();
  /** fetch for count available voucher */
  React.useEffect(() => {
    // this need an improvement after the cart integrated
    count(dispatchVoucher);
  }, []);

  /**
   * RTDB SECTION
   * - listen flag potentialDiscountId, isPotentialDiscountLoading
   * - fetch `potensial-discount` endpoint if data ready
   */
  const dataFlag = useDataFlagRTDB();
  const prevPotentionDiscountLoading = usePrevious(
    dataFlag.isPotentialDiscountLoading,
  );
  useCheckFlagByTask('potentialDiscountId');
  useCheckFlagByTask('isPotentialDiscountLoading');
  React.useEffect(() => {
    if (
      prevPotentionDiscountLoading === true &&
      dataFlag.isPotentialDiscountLoading === false
    ) {
      if (dataFlag.potentialDiscountId) {
        verificationOrderDetail(
          dispatchVerificationOrder,
          dataFlag.potentialDiscountId,
        );
        goToVerificationOrder();
      }
    }
  }, [dataFlag.isPotentialDiscountLoading]);
  /** === VIEW === */
  /** => Header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Keranjang'}
        backAction={() => goBack()}
      />
    );
  };
  /** => Empty Cart */
  const renderEmptyCart = () => (
    <Fragment>
      <View style={{ padding: 16, alignItems: 'center', marginBottom: 24 }}>
        <Image
          source={require('../../../../assets/images/oms_empty_cart.png')}
          width={180}
          style={{ marginTop: 24, marginBottom: 16 }}
        />
        <View style={{ marginBottom: 4 }}>
          <SnbText.H4>Keranjang Kosong</SnbText.H4>
        </View>
        <SnbText.B3 align={'center'}>
          Yuk, Isi keranjang kamu dengan produk - produk di Sinbad
        </SnbText.B3>
      </View>
      <View style={{ height: 80, borderStyle: 'dashed' }}>
        <SnbButton.Single
          type="primary"
          title="Tambah Produk"
          disabled={false}
          onPress={goToCategory}
        />
      </View>
      <RecommendationHomeView />
    </Fragment>
  );
  /** => Shipping Address */
  const renderShippingAddress = () => (
    <View style={ShoppingCartStyles.cardContainer}>
      <View style={ShoppingCartStyles.topCardSlot}>
        <SnbText.B4>Alamat Pengiriman</SnbText.B4>
      </View>
      <View style={ShoppingCartStyles.verticalBottomCardSlot}>
        <View style={{ marginBottom: 6 }}>
          <SnbText.B4>{userName}</SnbText.B4>
        </View>
        <View style={{ marginBottom: 6 }}>
          <SnbText.C2>Alamat 1 (default)</SnbText.C2>
        </View>
        <SnbText.B3>{address}</SnbText.B3>
      </View>
    </View>
  );
  /** => Product */
  const renderProduct = (
    product: CartProduct,
    productIndex: number,
    brand: CartBrand,
    brandIndex: number,
    invoiceGroupIndex: number,
  ) => {
    const productPrice = toCurrency(product.displayPrice);
    return (
      <View
        style={{
          ...ShoppingCartStyles.horizontalBottomCardSlot,
          paddingBottom: 18,
          borderBottomWidth: productIndex === brand.products.length - 1 ? 0 : 1,
          borderStyle: 'solid',
          borderBottomColor: color.black10,
        }}
        key={product.name}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 20, marginLeft: 4 }}>
            <SnbCheckbox
              status={product.selected}
              onPress={() =>
                handleSelectedProductChange(
                  invoiceGroupIndex,
                  brandIndex,
                  productIndex,
                  product.selected === 'selected' ? 'unselect' : 'selected',
                  [invoiceGroups, setInvoiceGroups],
                  [productSelectedCount, setProductSelectedCount],
                  setAllProductsSelected,
                  totalProducts,
                )
              }
            />
          </View>
          <Image
            source={{ uri: product.imageUrl }}
            style={{ marginRight: 8, width: 77, height: 77 }}
          />
          <View>
            <View style={{ marginBottom: 12, maxWidth: 160 }}>
              <SnbText.B4>{product.name}</SnbText.B4>
            </View>
            <View style={{ marginBottom: 12 }}>
              <SnbText.B4 color={color.red50}>{productPrice}</SnbText.B4>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <SnbNumberCounter
                value={product.qty}
                onIncrease={() =>
                  handleProductQuantityChange(
                    invoiceGroupIndex,
                    brandIndex,
                    productIndex,
                    'increase',
                    [invoiceGroups, setInvoiceGroups],
                  )
                }
                onDecrease={() =>
                  handleProductQuantityChange(
                    invoiceGroupIndex,
                    brandIndex,
                    productIndex,
                    'decrease',
                    [invoiceGroups, setInvoiceGroups],
                  )
                }
                minusDisabled={product.qty === 1}
                plusDisabled={product.qty === product.stock}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() =>
              handleProductDelete(
                invoiceGroupIndex,
                brandIndex,
                productIndex,
                invoiceGroups,
              )
            }>
            <SnbIcon name="delete_outline" color={color.black60} size={32} />
          </TouchableOpacity>
          {product.stock <= 3 && (
            <SnbText.B3
              color={
                color.red50
              }>{`Tersisa ${product.stock} ${product.uom}`}</SnbText.B3>
          )}
        </View>
      </View>
    );
  };
  /** => Brand */
  const renderBrand = (
    brand: CartBrand,
    brandIndex: number,
    invoiceGroupIndex: number,
  ) => (
    <Fragment key={brand.name}>
      <View
        style={{
          ...ShoppingCartStyles.topCardSlot,
          borderStyle: 'solid',
          borderTopWidth: brandIndex === 0 ? 0 : 1,
          borderTopColor: color.black10,
        }}>
        <View style={{ marginRight: 20, marginLeft: 4 }}>
          <SnbCheckbox
            status={brand.selected}
            onPress={() =>
              handleSelectedBrandChange(
                invoiceGroupIndex,
                brandIndex,
                brand.selected === 'indeterminate' ||
                  brand.selected === 'unselect'
                  ? 'selected'
                  : 'unselect',
                [invoiceGroups, setInvoiceGroups],
                [productSelectedCount, setProductSelectedCount],
                setAllProductsSelected,
                totalProducts,
              )
            }
          />
        </View>
        <SnbText.B4>{brand.name}</SnbText.B4>
      </View>
      {brand.products.map((product, productIndex) =>
        renderProduct(
          product,
          productIndex,
          brand,
          brandIndex,
          invoiceGroupIndex,
        ),
      )}
    </Fragment>
  );
  /** => Invoice Group */
  const renderInvoiceGroup = (
    invoiceGroup: CartInvoiceGroup,
    invoiceGroupIndex: number,
  ) => (
    <View style={ShoppingCartStyles.cardContainer} key={invoiceGroup.name}>
      <View style={ShoppingCartStyles.topCardSlot}>
        <SnbText.B4>{invoiceGroup.name}</SnbText.B4>
      </View>
      {invoiceGroup.brands.map((brand, brandIndex) =>
        renderBrand(brand, brandIndex, invoiceGroupIndex),
      )}
    </View>
  );
  /** => Invoice Group List */
  const renderInvoiceGroupList = () => (
    <Fragment>
      {invoiceGroups.map((invoiceGroup, invoiceGroupIndex) =>
        renderInvoiceGroup(invoiceGroup, invoiceGroupIndex),
      )}
    </Fragment>
  );
  const renderConfirmationDialog = () => (
    <SnbDialog
      open={isConfirmCheckoutDialogOpen}
      title="Konfirmasi"
      content="Konfirmasi order dan lanjut ke Checkout?"
      ok={() => {}}
      cancel={() => setIsConfirmCheckoutDialogOpen(false)}
      loading={stateVerificationOrder.detail.loading}
    />
  );
  /** => voucher tag */
  const renderVoucherTag = () => {
    const { countVoucher } = stateVoucher;
    if (
      countVoucher.detail.data?.total !== 0 &&
      countVoucher.detail.loading !== true
    ) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => goToVoucherCartList()}
            style={ShoppingCartStyles.voucherTagContainer}>
            <View style={ShoppingCartStyles.voucherTagLeftContainer}>
              <View style={ShoppingCartStyles.voucherTagIconContainer}>
                <SnbIcon name={'local_offer'} size={16} color={color.white} />
              </View>
              <View style={{ justifyContent: 'center' }}>
                {voucherData.dataVouchers !== null ? (
                  <>
                    <SnbText.C1
                      color={color.green50}>{`Potensi potongan ${toCurrency(
                      countPotentialDiscount(
                        voucherData.dataVouchers.sinbadVoucher,
                        voucherData.dataVouchers.sellerVouchers,
                      ).totalDiscount,
                      {
                        withPrefix: false,
                        withFraction: false,
                      },
                    )}`}</SnbText.C1>
                    <SnbText.C2 color={color.green50}>{`${
                      countPotentialDiscount(
                        voucherData.dataVouchers.sinbadVoucher,
                        voucherData.dataVouchers.sellerVouchers,
                      ).totalSelectedVoucher
                    } Voucher terpilih`}</SnbText.C2>
                  </>
                ) : (
                  <SnbText.B3
                    color={
                      color.green50
                    }>{`Anda memiliki ${stateVoucher.countVoucher.detail.data?.total} voucher`}</SnbText.B3>
                )}
              </View>
            </View>
            <View style={ShoppingCartStyles.voucherTagRightContainer}>
              <SnbText.B2 color={color.red50}>Lihat Semua</SnbText.B2>
              <SnbIcon name={'chevron_right'} size={24} color={color.red50} />
            </View>
          </TouchableOpacity>
          <SnbDivider />
        </View>
      );
    }
  };
  /** => Footer */
  const renderFooter = () => (
    <View style={ShoppingCartStyles.footerContainer}>
      {renderVoucherTag()}
      <View style={ShoppingCartStyles.footerBody}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SnbCheckbox
            status={allProductsSelected}
            onPress={() =>
              handleAllSelectedProductsChange(
                allProductsSelected === 'indeterminate' ||
                  allProductsSelected === 'unselect'
                  ? 'selected'
                  : 'unselect',
                [invoiceGroups, setInvoiceGroups],
                setProductSelectedCount,
                setAllProductsSelected,
                totalProducts,
              )
            }
          />
          <View style={{ marginLeft: 10 }}>
            <SnbText.B3>Pilih Semua</SnbText.B3>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 10, alignItems: 'flex-end' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 4,
              }}>
              <View style={{ marginRight: 6 }}>
                <SnbText.B3>Total:</SnbText.B3>
              </View>
              <SnbText.B2 color={color.red50}>
                {toCurrency(getTotalPrice(invoiceGroups))}
              </SnbText.B2>
            </View>
            <SnbText.C1>{`${productSelectedCount} barang dipilih`}</SnbText.C1>
          </View>
          <SnbButton.Dynamic
            type="primary"
            title="Checkout"
            size="small"
            onPress={() => setIsConfirmCheckoutDialogOpen(true)}
          />
        </View>
      </View>
    </View>
  );
  /** => Main */
  return (
    <SnbContainer color="white">
      {renderHeader()}
      {invoiceGroups.length > 0 ? (
        <Fragment>
          <ScrollView>
            {renderShippingAddress()}
            {renderInvoiceGroupList()}
          </ScrollView>
          {renderFooter()}
        </Fragment>
      ) : (
        renderEmptyCart()
      )}
      {renderConfirmationDialog()}
    </SnbContainer>
  );
};

export default OmsShoppingCartView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
