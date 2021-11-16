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
  SnbEmptyData,
} from 'react-native-sinbad-ui';
import {
  goBack,
  goToVoucherDetail,
  useSearchKeyword,
  useSelectedSellerVoucher,
  useSelectedSinbadVoucher,
  countPotentialDiscount,
  useVoucherListMore,
} from '../functions';
import { VoucherCartListStyles } from '../styles';
import * as models from '@models';
import SvgIcon from '@svg';
import { toCurrency } from '@core/functions/global/currency-format';
import { camelize } from '@core/functions/global/camelize';
import * as Actions from '@actions';
import { useDispatch } from 'react-redux';
import { contexts } from '@contexts';
/** === COMPONENT === */
const VoucherCartListMoreView: FC = ({ route }: any) => {
  /** === HOOK === */
  const { stateVoucher } = React.useContext(contexts.VoucherContext);
  const voucherCartListState = stateVoucher.voucherCart.detail;
  const {
    selectedSellerVoucher,
    setSelectedSellerVoucher,
    resetSelectedSellerVoucher,
  } = useSelectedSellerVoucher();
  const {
    selectedSinbadVoucher,
    setSelectedSinbadVoucher,
    resetSelectedSinbadVoucher,
  } = useSelectedSinbadVoucher();
  const { voucherListData, setVoucherListData, searchVoucherListData } =
    useVoucherListMore();
  const { keyword, changeKeyword } = useSearchKeyword();
  const dispatch = useDispatch();
  /** => effect */
  React.useEffect(() => {
    setVoucherListData(route.params.voucherList);
    setSelectedSinbadVoucher(route.params.selectedSinbadVoucher);
    setSelectedSellerVoucher(route.params.selectedSellerVoucher);
  }, []);
  /** === VIEW === */
  /** => empty */
  const renderEmpty = (messageTitle: string, messageBody: string) => {
    const image = () => {
      return (
        <Image
          source={require('../../../assets/images/voucher_empty.png')}
          style={VoucherCartListStyles.emptyImage}
        />
      );
    };
    return (
      <View style={VoucherCartListStyles.singleContainer}>
        <SnbEmptyData
          title={messageTitle}
          subtitle={messageBody}
          image={image()}
        />
      </View>
    );
  };
  /** => header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type4
        type="red"
        title={route.params.voucherGroupName}
        backAction={() => goBack()}
        buttonTitle={'Reset'}
        buttonAction={() => {
          resetSelectedSinbadVoucher();
          resetSelectedSellerVoucher();
          dispatch(Actions.saveSelectedVouchers(null));
        }}
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
            clearText={() => {
              changeKeyword('');
              setVoucherListData(route.params.voucherList);
            }}
            enter={() => searchVoucherListData(voucherListData, keyword)}
            value={keyword}
          />
        </View>
        <View style={VoucherCartListStyles.searchSectionButton}>
          <SnbButton.Dynamic
            testID={'voucherCartListMoreView.searchButton'}
            type={'primary'}
            title="Terapkan"
            size={'medium'}
            onPress={() => searchVoucherListData(voucherListData, keyword)}
            disabled={false}
          />
        </View>
      </View>
    );
  };
  /** => voucher list */
  const renderVoucherList = () => {
    if (voucherListData.length === 0) {
      return null;
    }
    return (
      <View style={VoucherCartListStyles.voucherSection}>
        <View style={VoucherCartListStyles.voucherSectionHeader}>
          <View style={VoucherCartListStyles.voucherSectionTitle}>
            <SnbIcon name={'local_offer'} color={color.green50} size={24} />
            <View
              style={VoucherCartListStyles.voucherSectionTitleTextContainer}>
              <SnbText.H4 color={color.black80}>
                {route.params.voucherGroupName}
              </SnbText.H4>
              <SnbText.C2 color={color.black60}>
                {`${voucherListData.length} Voucher Tersedia`}
              </SnbText.C2>
            </View>
          </View>
        </View>
        {route.params.voucherGroupType === 'sinbad_voucher'
          ? renderSinbadVoucherCard(voucherListData)
          : renderSellerVoucherCard(voucherListData)}
      </View>
    );
  };
  /** => sinbad voucher card */
  const renderSinbadVoucherCard = (
    voucherList: models.SinbadVoucherProps[],
  ) => {
    return voucherList.map((item, index) => {
      const isIdActive = selectedSinbadVoucher?.voucherId === item.voucherId;
      return (
        <TouchableOpacity
          testID={`voucherCartListMoreView.sinbadVoucherCardTouchable${index}`}
          key={index}
          style={VoucherCartListStyles.voucherCard}
          onPress={() => setSelectedSinbadVoucher(item)}>
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
            <SvgIcon
              name={isIdActive ? 'selected_voucher' : 'unselect_voucher'}
              size={24}
            />
            <TouchableOpacity
              testID={`voucherCartListMoreView.sinbadVoucherDetailTouchable${index}`}
              onPress={() => goToVoucherDetail(item.voucherId, 'sinbad')}>
              <SnbText.B2 color={color.green50}>Lihat Detail</SnbText.B2>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    });
  };
  /** => seller voucher card */
  const renderSellerVoucherCard = (
    voucherList: models.SellerVoucherListProps[],
  ) => {
    return voucherList.map((item, index) => {
      const isIdActive = selectedSellerVoucher.some(
        (element) => element.id === item.id,
      );
      const isInvoiceGroupIdActive = selectedSellerVoucher.some(
        (element) => element.invoiceGroupId === item.invoiceGroupId,
      );
      return (
        <TouchableOpacity
          testID={`voucherCartListMoreView.${camelize(
            item.invoiceGroupName,
          )}CardTouchable${index}`}
          key={index}
          style={VoucherCartListStyles.voucherCard}
          onPress={() => {
            if (isInvoiceGroupIdActive) {
              if (!isIdActive) {
                const tempArray = selectedSellerVoucher.filter((element) => {
                  return item.invoiceGroupId !== element.invoiceGroupId;
                });
                tempArray.push(item);
                setSelectedSellerVoucher(tempArray);
              }
            } else {
              const tempArray = [...selectedSellerVoucher];
              tempArray.push(item);
              setSelectedSellerVoucher(tempArray);
            }
          }}>
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
            <SvgIcon
              name={isIdActive ? 'selected_voucher' : 'unselect_voucher'}
              size={24}
            />
            <TouchableOpacity
              testID={`voucherCartListMoreView.${camelize(
                item.invoiceGroupName,
              )}DetailTouchable${index}`}
              onPress={() => goToVoucherDetail(item.voucherId, 'seller')}>
              <SnbText.B2 color={color.green50}>Lihat Detail</SnbText.B2>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    });
  };
  /** => footer section */
  const renderFooterSection = () => {
    if (
      (selectedSinbadVoucher === null && selectedSellerVoucher.length === 0) ||
      voucherCartListState.data === null
    ) {
      return null;
    }
    return (
      <View style={[VoucherCartListStyles.footerSection, styles.shadowStyle]}>
        <View>
          <SnbText.B3 color={color.black60}>{`${
            countPotentialDiscount(selectedSinbadVoucher, selectedSellerVoucher)
              .totalSelectedVoucher
          } Voucher Terpilih`}</SnbText.B3>
          <SnbText.C1 color={color.yellow50}>
            {`Potensi Potongan: ${toCurrency(
              countPotentialDiscount(
                selectedSinbadVoucher,
                selectedSellerVoucher,
              ).totalDiscount,
            )}`}
          </SnbText.C1>
        </View>
        <View>
          <SnbButton.Dynamic
            testID={'voucherCartListView.useVoucherButton'}
            type={'primary'}
            title={'Gunakan Voucher'}
            onPress={() => {
              dispatch(
                Actions.saveSelectedVouchers({
                  sinbadVoucher: selectedSinbadVoucher,
                  sellerVouchers: selectedSellerVoucher,
                }),
              );
              goBack();
            }}
            disabled={false}
            size={'small'}
          />
        </View>
      </View>
    );
  };
  /** => voucher section */
  const renderVoucherSection = () => {
    if (voucherListData.length === 0) {
      return renderEmpty(
        'Voucher Tidak Ditemukan',
        'Voucher yang anda cari tidak ditemukan',
      );
    } else {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderVoucherList()}
        </ScrollView>
      );
    }
  };
  /** => main */
  return (
    <SnbContainer color="grey">
      {renderHeader()}
      {renderSearchSection()}
      {renderVoucherSection()}
      {renderFooterSection()}
    </SnbContainer>
  );
};

export default VoucherCartListMoreView;
