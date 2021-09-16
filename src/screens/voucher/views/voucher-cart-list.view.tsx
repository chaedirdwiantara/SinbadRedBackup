import React, { FC } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbTextField,
  SnbButton,
  SnbIcon,
  color,
  SnbText,
  styles,
} from 'react-native-sinbad-ui';
import {
  goBack,
  goToVoucherCartListMore,
  goToVoucherDetail,
  handleSelectSinbadVoucher,
  handleSearchVoucher,
  handleSelectSupplierVoucher,
  useSearchKeyword,
  useVoucherList,
  useVoucherCartListAction,
} from '../functions';
import { VoucherCartListStyles } from '../styles';
import { contexts } from '@contexts';
/** === INTERFACE === */
/** === DUMMIES === */
const dummies = {
  data: {
    sinbadVouchers: [
      {
        voucherId: 12,
        voucherName: 'Voucher Tiga',
        shortDescription: 'desc',
        benefitRebate: 100000,
        expiredAt: '2021-07-31T16:59:00.000Z',
        remainingDay: 3,
      },
    ],
    supplierVouchers: [
      {
        invoiceGroupId: 3,
        invoiceGroupName: 'Exclusive Danone',
        voucherList: [
          {
            id: 343,
            voucherId: 171,
            voucherName: 'chrisvoucher',
            shortDescription: 'voucher SGM',
            remainingDay: 2,
            expiredAt: '2021-07-31T16:59:00.000Z',
            invoiceGroupId: 3,
            invoiceGroupName: 'Exclusive Danone',
            benefitRebate: 1000,
          },
        ],
      },
      {
        invoiceGroupId: 2,
        invoiceGroupName: 'Exclusive SGM',
        voucherList: [
          {
            id: 342,
            voucherId: 170,
            voucherName: 'chrisvoucher',
            shortDescription: 'voucher SGM',
            remainingDay: 2,
            expiredAt: '2021-07-31T16:59:00.000Z',
            invoiceGroupId: 3,
            invoiceGroupName: 'Exclusive Danone',
            benefitRebate: 1000,
          },
        ],
      },
    ],
  },
};
/** === COMPONENT === */
const VoucherCartListView: FC = () => {
  /** === HOOK === */
  const { stateVoucher, dispatchVoucher } = React.useContext(
    contexts.VoucherContext,
  );
  const voucherCartListAction = useVoucherCartListAction();
  const voucherState = stateVoucher.detail;
  console.log(voucherState);
  const { keyword, changeKeyword } = useSearchKeyword();
  const { supplierVoucher, sinbadVoucher, updateVoucherList } =
    useVoucherList();
  /** => effect */
  React.useEffect(() => {
    voucherCartListAction.detail(dispatchVoucher);
  }, []);
  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type4
        type="red"
        title="Pakai Voucher"
        backAction={() => goBack()}
        buttonTitle={'Reset'}
        buttonAction={() => {}}
      />
    );
  };
  /** => search section */
  const renderSearchSection = () => {
    return (
      <View style={[VoucherCartListStyles.searchSection, styles.shadowStyle]}>
        <View style={VoucherCartListStyles.searchSectionTextField}>
          <SnbTextField.Text
            placeholder={'Cari kode voucher disini...'}
            type={'default'}
            onChangeText={(value) => changeKeyword(value)}
            clearText={() => changeKeyword('')}
            value={keyword}
          />
        </View>
        <View style={VoucherCartListStyles.searchSectionButton}>
          <SnbButton.Dynamic
            type={'primary'}
            title="Terapkan"
            size={'medium'}
            onPress={() => handleSearchVoucher(keyword)}
            disabled={false}
          />
        </View>
      </View>
    );
  };
  /** => sinbad voucher list */
  const renderSinbadVoucherList = () => {
    return (
      <View style={VoucherCartListStyles.voucherSection}>
        <View style={VoucherCartListStyles.voucherSectionHeader}>
          <View style={VoucherCartListStyles.voucherSectionTitle}>
            <SnbIcon name={'settings'} color={color.green50} size={24} />
            <View
              style={VoucherCartListStyles.voucherSectionTitleTextContainer}>
              <SnbText.H4 color={color.black80}>Sinbad Voucher</SnbText.H4>
              <SnbText.C2 color={color.black60}>
                {`${dummies.data.sinbadVouchers.length} Voucher Tersedia`}
              </SnbText.C2>
            </View>
          </View>
          <TouchableOpacity
            style={VoucherCartListStyles.voucherSectionRightIcon}
            onPress={() =>
              goToVoucherCartListMore(dummies.data.sinbadVouchers)
            }>
            <SnbText.B2 color={color.red50}>Lihat Semua</SnbText.B2>
            <SnbIcon name={'chevron_right'} color={color.red50} size={24} />
          </TouchableOpacity>
        </View>
        {renderSinbadVoucherCard(dummies.data.sinbadVouchers)}
      </View>
    );
  };
  /** => sinbad voucher card */
  const renderSinbadVoucherCard = (
    voucherList: {
      voucherId: number;
      voucherName: string;
      shortDescription: string;
      remainingDay: number;
      expiredAt: string;
      benefitRebate: number;
    }[],
  ) => {
    return voucherList.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={VoucherCartListStyles.voucherCard}
          onPress={() => handleSelectSinbadVoucher(item.voucherId)}>
          <View style={VoucherCartListStyles.voucherCardLeftContent}>
            <View style={{ marginBottom: 8 }}>
              <SnbText.B4>{item.voucherName}</SnbText.B4>
            </View>
            <View style={{ marginBottom: 8 }}>
              <SnbText.C2 color={color.black80}>
                {item.shortDescription}
              </SnbText.C2>
            </View>
            <SnbText.C1 color={color.black80}>
              {`Berakhir dalam ${item.remainingDay} hari lagi!`}
            </SnbText.C1>
          </View>
          <View style={VoucherCartListStyles.voucherCardRightContent}>
            <SnbIcon name={'settings'} color={color.green50} size={24} />
            <TouchableOpacity onPress={() => goToVoucherDetail(item.voucherId)}>
              <SnbText.B2 color={color.green50}>Lihat Detail</SnbText.B2>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    });
  };
  /** => supplier voucher list */
  const renderSupplierVoucherList = () => {
    return dummies.data.supplierVouchers.map((item, index) => {
      return (
        <View key={index} style={VoucherCartListStyles.voucherSection}>
          <View style={VoucherCartListStyles.voucherSectionHeader}>
            <View style={VoucherCartListStyles.voucherSectionTitle}>
              <SnbIcon name={'settings'} color={color.green50} size={24} />
              <View
                style={VoucherCartListStyles.voucherSectionTitleTextContainer}>
                <SnbText.H4 color={color.black80}>
                  {item.invoiceGroupName}
                </SnbText.H4>
                <SnbText.C2 color={color.black60}>
                  {`${dummies.data.supplierVouchers.length} Voucher Tersedia`}
                </SnbText.C2>
              </View>
            </View>
            <TouchableOpacity
              style={VoucherCartListStyles.voucherSectionRightIcon}
              onPress={() => goToVoucherCartListMore(item.voucherList)}>
              <SnbText.B2 color={color.red50}>Lihat Semua</SnbText.B2>
              <SnbIcon name={'chevron_right'} color={color.red50} size={24} />
            </TouchableOpacity>
          </View>
          {renderSupplierVoucherCard(item.voucherList)}
        </View>
      );
    });
  };
  /** => supplier voucher card */
  const renderSupplierVoucherCard = (
    voucherList: {
      id: number;
      voucherId: number;
      voucherName: string;
      shortDescription: string;
      remainingDay: number;
      expiredAt: string;
      invoiceGroupId: number;
      invoiceGroupName: string;
      benefitRebate: number;
    }[],
  ) => {
    return voucherList.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={VoucherCartListStyles.voucherCard}
          onPress={() => handleSelectSupplierVoucher(item.id)}>
          <View style={VoucherCartListStyles.voucherCardLeftContent}>
            <View style={{ marginBottom: 8 }}>
              <SnbText.B4>{item.voucherName}</SnbText.B4>
            </View>
            <View style={{ marginBottom: 8 }}>
              <SnbText.C2 color={color.black80}>
                {item.shortDescription}
              </SnbText.C2>
            </View>
            <SnbText.C1 color={color.black80}>
              {`Berakhir dalam ${item.remainingDay} hari lagi!`}
            </SnbText.C1>
          </View>
          <View style={VoucherCartListStyles.voucherCardRightContent}>
            <SnbIcon name={'settings'} color={color.green50} size={24} />
            <TouchableOpacity onPress={() => goToVoucherDetail(item.id)}>
              <SnbText.B2 color={color.green50}>Lihat Detail</SnbText.B2>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    });
  };
  /** => footer section */
  const renderFooterSection = () => {
    return (
      <View style={[VoucherCartListStyles.footerSection, styles.shadowStyle]}>
        <View>
          <SnbText.B3 color={color.black60}>2 Voucher Terpilih</SnbText.B3>
          <SnbText.C1 color={color.yellow50}>
            Potensi Potongan: Rp 200.000
          </SnbText.C1>
        </View>
        <View>
          <SnbButton.Dynamic
            type={'primary'}
            title={'Gunakan Voucher'}
            onPress={() => {}}
            disabled={false}
            size={'small'}
          />
        </View>
      </View>
    );
  };
  /** => main */
  return (
    <SnbContainer color="grey">
      {renderHeader()}
      {renderSearchSection()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderSinbadVoucherList()}
        {renderSupplierVoucherList()}
      </ScrollView>
      {renderFooterSection()}
    </SnbContainer>
  );
};

export default VoucherCartListView;
