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
import { goBack } from '../functions';
import { VoucherCartListStyles } from '../styles';
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
    ],
  },
};
/** === COMPONENT === */
const VoucherCartListView: FC = () => {
  /** === HOOK === */
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
            onChangeText={() => {}}
            clearText={() => {}}
            value={''}
          />
        </View>
        <View style={VoucherCartListStyles.searchSectionButton}>
          <SnbButton.Dynamic
            type={'primary'}
            title="Terapkan"
            size={'medium'}
            onPress={() => {}}
            disabled={false}
          />
        </View>
      </View>
    );
  };
  /** => voucher list */
  const renderVoucherList = () => {
    return (
      <View style={VoucherCartListStyles.voucherSection}>
        {dummies.data.supplierVouchers.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <View style={VoucherCartListStyles.voucherSectionHeader}>
                <View style={VoucherCartListStyles.voucherSectionTitle}>
                  <SnbIcon name={'settings'} color={color.green50} size={24} />
                  <View
                    style={
                      VoucherCartListStyles.voucherSectionTitleTextContainer
                    }>
                    <SnbText.H4 color={color.black80}>
                      {item.invoiceGroupName}
                    </SnbText.H4>
                    <SnbText.C2 color={color.black60}>
                      {`${dummies.data.supplierVouchers.length} Voucher Tersedia`}
                    </SnbText.C2>
                  </View>
                </View>
                <TouchableOpacity
                  style={VoucherCartListStyles.voucherSectionRightIcon}>
                  <SnbText.B2 color={color.red50}>Lihat Semua</SnbText.B2>
                  <SnbIcon
                    name={'chevron_right'}
                    color={color.red50}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
              {renderVoucherCard(item.voucherList)}
            </React.Fragment>
          );
        })}
      </View>
    );
  };
  /** => voucher card */
  const renderVoucherCard = (
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
        <TouchableOpacity key={index} style={VoucherCartListStyles.voucherCard}>
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
            <TouchableOpacity>
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
      <View
        style={[
          {
            flexDirection: 'row',
            padding: 16,
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: color.white,
          },
          styles.shadowStyle,
        ]}>
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
    <SnbContainer color="white">
      {renderHeader()}
      {renderSearchSection()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderVoucherList()}
      </ScrollView>
      {renderFooterSection()}
    </SnbContainer>
  );
};

export default VoucherCartListView;
