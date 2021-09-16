import React, { FC } from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbTextField,
  SnbButton,
  SnbIcon,
  color,
  SnbText,
  styles,
  SnbProgress,
} from 'react-native-sinbad-ui';
import {
  goBack,
  goToVoucherCartListMore,
  goToVoucherDetail,
  handleSelectSinbadVoucher,
  handleSelectSupplierVoucher,
  useSearchKeyword,
  useVoucherList,
  useVoucherCartListAction,
} from '../functions';
import { VoucherCartListStyles } from '../styles';
import { contexts } from '@contexts';
import * as models from '@models';
/** === COMPONENT === */
const VoucherCartListView: FC = () => {
  /** === HOOK === */
  const { stateVoucher, dispatchVoucher } = React.useContext(
    contexts.VoucherContext,
  );
  const { supplierVoucher, sinbadVoucher, updateVoucherList, searchVoucher } =
    useVoucherList();
  const { keyword, changeKeyword } = useSearchKeyword();
  const voucherCartListAction = useVoucherCartListAction();
  const voucherCartListState = stateVoucher.detail;
  console.log(voucherCartListState);
  /** => effect */
  React.useEffect(() => {
    voucherCartListAction.detail(dispatchVoucher);
  }, []);
  React.useEffect(() => {
    if (voucherCartListState.data !== null) {
      updateVoucherList(
        voucherCartListState.data.supplierVouchers,
        voucherCartListState.data.sinbadVouchers,
      );
    }
  }, [voucherCartListState]);
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
            onPress={() => searchVoucher(keyword)}
            disabled={false}
          />
        </View>
      </View>
    );
  };
  /** => sinbad voucher list */
  const renderSinbadVoucherList = () => {
    if (sinbadVoucher.length === 0) {
      return null;
    }
    return (
      <View style={VoucherCartListStyles.voucherSection}>
        <View style={VoucherCartListStyles.voucherSectionHeader}>
          <View style={VoucherCartListStyles.voucherSectionTitle}>
            <SnbIcon name={'settings'} color={color.green50} size={24} />
            <View
              style={VoucherCartListStyles.voucherSectionTitleTextContainer}>
              <SnbText.H4 color={color.black80}>Sinbad Voucher</SnbText.H4>
              <SnbText.C2 color={color.black60}>
                {`${sinbadVoucher.length} Voucher Tersedia`}
              </SnbText.C2>
            </View>
          </View>
          <TouchableOpacity
            style={VoucherCartListStyles.voucherSectionRightIcon}
            onPress={() => goToVoucherCartListMore(sinbadVoucher)}>
            <SnbText.B2 color={color.red50}>Lihat Semua</SnbText.B2>
            <SnbIcon name={'chevron_right'} color={color.red50} size={24} />
          </TouchableOpacity>
        </View>
        {renderSinbadVoucherCard(sinbadVoucher)}
      </View>
    );
  };
  /** => sinbad voucher card */
  const renderSinbadVoucherCard = (
    voucherList: models.SinbadVoucherProps[],
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
    return supplierVoucher.map((item, index) => {
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
                  {`${item.voucherList.length} Voucher Tersedia`}
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
    voucherList: models.SupplierVoucherListProps[],
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
  /** => empty */
  const renderEmpty = () => {
    return (
      <View style={VoucherCartListStyles.singleContainer}>
        <Image
          source={require('../../../assets/images/voucher_empty.png')}
          style={{
            height: 190,
            width: undefined,
            aspectRatio: 10 / 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <View style={{ marginTop: 16 }}>
          <SnbText.H4>Voucher Tidak Tersedia</SnbText.H4>
        </View>
        <View>
          <SnbText.B3>
            Tidak ada voucher yang tersedia untuk saat ini
          </SnbText.B3>
        </View>
      </View>
    );
  };
  /** => loading */
  const renderLoading = () => {
    return (
      <View style={VoucherCartListStyles.singleContainer}>
        <SnbProgress size={40} />
      </View>
    );
  };
  /** => voucher section */
  const renderVoucherSection = () => {
    if (
      voucherCartListState.data?.sinbadVouchers.length === 0 &&
      voucherCartListState.data?.supplierVouchers.length === 0
    ) {
      return renderEmpty();
    } else {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderSinbadVoucherList()}
          {renderSupplierVoucherList()}
        </ScrollView>
      );
    }
  };
  /** => main */
  return (
    <SnbContainer color="grey">
      {renderHeader()}
      {renderSearchSection()}
      {!voucherCartListState.loading && voucherCartListState.data !== null
        ? renderVoucherSection()
        : renderLoading()}
      {renderFooterSection()}
    </SnbContainer>
  );
};

export default VoucherCartListView;
