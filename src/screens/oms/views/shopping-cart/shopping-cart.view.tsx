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
import { CartProduct, CartBrand, CartInvoiceGroup } from '@models';
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
import { useDataVoucher } from '@core/redux/Data';
import { RecommendationHomeView } from '@screen/recommendation/views';
/** === DUMMIES === */
const noImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';
const invoiceGroupDummies: Array<CartInvoiceGroup> = [
  {
    invoiceGroupId: '1',
    invoiceGroupName: 'TRS DNE',
    cartParcelId: '1',
    portfolioId: '1',
    supplierId: 1,
    channelId: 1,
    groupId: 1,
    typeId: 1,
    clusterId: 1,
    brands: [
      {
        brandId: '1',
        brandName: 'SGM',
        selected: false,
        selectedCount: 0,
        products: [
          {
            productId: '1',
            productName: 'SGM ANANDA 1 1000GR GA',
            urlImages: noImage,
            stock: 5,
            selected: false,
            qty: 1,
            displayPrice: 76097,
            priceBeforeTax: 76097,
            priceAfterTax: 76097,
            warehouseId: 2,
            uom: 'Pcs',
          },
        ],
      },
    ],
  },
  {
    invoiceGroupId: '2',
    invoiceGroupName: 'Lakme',
    cartParcelId: '1',
    portfolioId: '1',
    supplierId: 1,
    channelId: 1,
    groupId: 1,
    typeId: 1,
    clusterId: 1,
    brands: [
      {
        brandId: '2',
        brandName: 'Lakme',
        selected: false,
        selectedCount: 0,
        products: [
          {
            productId: '2',
            productName: 'LAKME CC CREAM ALMOND',
            urlImages:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400566.png',
            stock: 2,
            selected: false,
            qty: 1,
            displayPrice: 77891,
            priceBeforeTax: 77891,
            priceAfterTax: 77891,
            warehouseId: 2,
            uom: 'Pcs',
          },
          {
            productId: '3',
            productName: 'LAKME BLUR PERFECT CREAMER',
            urlImages:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67201003.png',
            stock: 10,
            selected: false,
            qty: 1,
            displayPrice: 150000,
            priceBeforeTax: 150000,
            priceAfterTax: 150000,
            warehouseId: 2,
            uom: 'Pcs',
          },
        ],
      },
      {
        brandId: '3',
        brandName: 'Lakme 2',
        selected: false,
        selectedCount: 0,
        products: [
          {
            productId: '4',
            productName: ' LAKME ABSOLUTE LIQUID CONCEALER IVORY FAIR ',
            qty: 1,
            stock: 4,
            displayPrice: 98782,
            priceBeforeTax: 98782,
            priceAfterTax: 98782,
            warehouseId: 2,
            selected: false,
            urlImages:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67145109.png',
            uom: 'Pcs',
          },
          {
            productId: '5',
            productName: 'LAKME BIPHASED MAKEUP REMOVER ',
            qty: 1,
            stock: 12,
            displayPrice: 72000,
            priceBeforeTax: 72000,
            priceAfterTax: 72000,
            warehouseId: 2,
            selected: false,
            urlImages:
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
    useState<boolean>(false);
  const [productSelectedCount, setProductSelectedCount] = useState(0);
  const totalProducts = useMemo(() => getTotalProducts(invoiceGroups), []);
  const [isConfirmCheckoutDialogOpen, setIsConfirmCheckoutDialogOpen] =
    useState(false);
  /** => this example */
  const { verificationOrderCreate } = useVerficationOrderAction();
  const { stateVerificationOrder, dispatchVerificationOrder } =
    React.useContext(contexts.VerificationOrderContext);
  const { count } = useCountAllVoucherAction();
  const { stateVoucher, dispatchVoucher } = React.useContext(
    contexts.VoucherContext,
  );
  const voucherData = useDataVoucher();
  React.useEffect(() => {
    count(dispatchVoucher);
  }, []);
  React.useEffect(() => {
    if (stateVerificationOrder.create.data !== null) {
      setIsConfirmCheckoutDialogOpen(false);
      goToVerificationOrder();
    }
  }, [stateVerificationOrder.create.data]);
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
        key={product.productName}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 20, marginLeft: 4 }}>
            <SnbCheckbox
              status={product.selected ? 'selected' : 'unselect'}
              onPress={() =>
                handleSelectedProductChange(
                  invoiceGroupIndex,
                  brandIndex,
                  productIndex,
                  product.selected ? false : true,
                  [invoiceGroups, setInvoiceGroups],
                  [productSelectedCount, setProductSelectedCount],
                  setAllProductsSelected,
                  totalProducts,
                )
              }
            />
          </View>
          <Image
            source={{ uri: product.urlImages }}
            style={{ marginRight: 8, width: 77, height: 77 }}
          />
          <View>
            <View style={{ marginBottom: 12, maxWidth: 160 }}>
              <SnbText.B4>{product.productName}</SnbText.B4>
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
    <Fragment key={brand.brandName}>
      <View
        style={{
          ...ShoppingCartStyles.topCardSlot,
          borderStyle: 'solid',
          borderTopWidth: brandIndex === 0 ? 0 : 1,
          borderTopColor: color.black10,
        }}>
        <View style={{ marginRight: 20, marginLeft: 4 }}>
          <SnbCheckbox
            status={brand.selected ? 'selected' : 'unselect'}
            onPress={() =>
              handleSelectedBrandChange(
                invoiceGroupIndex,
                brandIndex,
                brand.selected === false ? true : false,
                [invoiceGroups, setInvoiceGroups],
                [productSelectedCount, setProductSelectedCount],
                setAllProductsSelected,
                totalProducts,
              )
            }
          />
        </View>
        <SnbText.B4>{brand.brandName}</SnbText.B4>
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
    <View
      style={ShoppingCartStyles.cardContainer}
      key={invoiceGroup.invoiceGroupName}>
      <View style={ShoppingCartStyles.topCardSlot}>
        <SnbText.B4>{invoiceGroup.invoiceGroupName}</SnbText.B4>
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
  /** => Confirmation Dialog */
  // const renderConfirmationDialog = () => (
  //   <SnbDialog
  //     open={isModalOpen}
  //     title="Konfirmasi"
  //     content="Konfirmasi order dan lanjut ke Checkout?"
  //     ok={() => {
  //       goToVerificationOrder();
  //       setIsConfirmCheckoutDialogOpen(false);
  //     }}
  //     cancel={() => setIsConfirmCheckoutDialogOpen(false)}
  //   />
  // );
  const renderConfirmationDialog = () => (
    <SnbDialog
      open={isConfirmCheckoutDialogOpen}
      title="Konfirmasi"
      content="Konfirmasi order dan lanjut ke Checkout?"
      ok={() =>
        verificationOrderCreate(dispatchVerificationOrder, {
          data: {
            _id: 1,
            data: [
              {
                invoiceGroupId: '1',
                portfolioId: null,
                brands: [
                  {
                    brandId: '0684fb26-00bf-11ec-9a03-0242ac130003',
                    products: [
                      {
                        productId: '9536f526-2447-11ec-9621-0242ac130002',
                        qty: 2,
                        displayPrice: 201000,
                        priceBeforeTax: 201000,
                        priceAfterTax: 221100,
                        warehouseId: 1,
                      },
                      {
                        productId: '997fd26a-2447-11ec-9621-0242ac130002',
                        qty: 1,
                        displayPrice: 216000,
                        priceBeforeTax: 216000,
                        priceAfterTax: 237600,
                        warehouseId: 1,
                      },
                      {
                        productId: '19d816be-24db-11ec-9621-0242ac130002',
                        qty: 2,
                        displayPrice: 240000,
                        priceBeforeTax: 240000,
                        priceAfterTax: 264000,
                        warehouseId: 1,
                      },
                      {
                        productId: '32039060-24db-11ec-9621-0242ac130002',
                        qty: 2,
                        displayPrice: 204000,
                        priceBeforeTax: 204000,
                        priceAfterTax: 224400,
                        warehouseId: 1,
                      },
                    ],
                  },
                ],
                supplierId: 1,
                channelId: 1,
                groupId: 1,
                typeId: 1,
                clusterId: 1,
              },
            ],
            isActiveStore: false,
            voucherIds: [],
            storeId: 1,
            salesId: 1,
            platform: 'sinbad_app',
            userId: 1,
          },
        })
      }
      cancel={() => setIsConfirmCheckoutDialogOpen(false)}
      loading={stateVerificationOrder.create.loading}
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
            status={allProductsSelected ? 'selected' : 'unselect'}
            onPress={() =>
              handleAllSelectedProductsChange(
                allProductsSelected === false ? true : false,
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
