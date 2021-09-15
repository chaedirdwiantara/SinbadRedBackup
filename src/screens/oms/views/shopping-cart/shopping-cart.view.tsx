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
} from 'react-native-sinbad-ui';
import { toCurrency } from '../../../../../core/functions/global/currency-format';
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
} from '../../functions';
import { ShoppingCartStyles } from '../../styles';
/** === TYPES === */
export type DeterminateCheckboxStatus = 'selected' | 'unselect';
export type CheckboxStatus = DeterminateCheckboxStatus | 'indeterminate';
export interface Product {
  name: string;
  qty: number;
  displayPrice: number;
  uom: string;
  imageUrl: string;
  selected: DeterminateCheckboxStatus;
  stock: number;
}
export interface Brand {
  name: string;
  products: Array<Product>;
  selected: CheckboxStatus;
  selectedCount: number;
}
export interface InvoiceGroup {
  name: string;
  brands: Array<Brand>;
}
/** === DUMMIES === */
const noImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';
const invoiceGroupDummies: Array<InvoiceGroup> = [
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
    useState<Array<InvoiceGroup>>(invoiceGroupDummies);
  const [allProductsSelected, setAllProductsSelected] =
    useState<CheckboxStatus>('unselect');
  const [productSelectedCount, setProductSelectedCount] = useState(0);
  const totalProducts = useMemo(() => getTotalProducts(invoiceGroups), []);
  const [isConfirmCheckoutDialogOpen, setIsConfirmCheckoutDialogOpen] =
    useState(false);
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
          <SnbText.H4>Voucher tidak tersedia</SnbText.H4>
        </View>
        <SnbText.B3>
          Untuk saat ini Sinbad Voucher belum dapat digunakan
        </SnbText.B3>
      </View>
      <View style={{ height: 80, borderStyle: 'dashed' }}>
        <SnbButton.Single
          type="primary"
          title="Tambah Produk"
          disabled={false}
          onPress={() => console.log('Add Product pressed')}
        />
      </View>
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
    product: Product,
    productIndex: number,
    brand: Brand,
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
              <SnbButton.Dynamic
                size="small"
                type="primary"
                iconName="remove"
                radius={100}
                disabled={product.qty === 0}
                buttonColor={color.black60}
                onPress={() =>
                  handleProductQuantityChange(
                    invoiceGroupIndex,
                    brandIndex,
                    productIndex,
                    'decrease',
                    [invoiceGroups, setInvoiceGroups],
                  )
                }
              />
              <View style={ShoppingCartStyles.qtyText}>
                <SnbText.B3>{product.qty}</SnbText.B3>
              </View>
              <SnbButton.Dynamic
                size="small"
                type="primary"
                iconName="add"
                radius={100}
                disabled={product.qty === product.stock}
                buttonColor={color.red50}
                onPress={() =>
                  handleProductQuantityChange(
                    invoiceGroupIndex,
                    brandIndex,
                    productIndex,
                    'increase',
                    [invoiceGroups, setInvoiceGroups],
                  )
                }
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
            <SnbIcon name="delete" color={color.black60} size={32} />
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
    brand: Brand,
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
    invoiceGroup: InvoiceGroup,
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
  /** => Confirmation Dialog */
  const renderConfirmationDialog = () => (
    <SnbDialog
      open={isConfirmCheckoutDialogOpen}
      title="Konfirmasi"
      content="Konfirmasi order dan lanjut ke Checkout?"
      ok={() => {
        goToVerificationOrder();
        setIsConfirmCheckoutDialogOpen(false);
      }}
      cancel={() => setIsConfirmCheckoutDialogOpen(false)}
    />
  );
  /** => Footer */
  const renderFooter = () => (
    <View style={ShoppingCartStyles.footer}>
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