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
  goToVoucherCartListMore,
  goToVoucherDetail,
  useSearchKeyword,
  useVoucherList,
  useVoucherCartListAction,
  useSelectedSupplierVoucher,
  useSelectedSinbadVoucher,
  countPotentialDiscount,
} from '../functions';
import { VoucherCartListStyles } from '../styles';
import { contexts } from '@contexts';
import * as models from '@models';
import SvgIcon from '@svg';
import { toCurrency } from '@core/functions/global/currency-format';
import { camelize } from '@core/functions/global/camelize';
import * as Actions from '@actions';
import { useDispatch } from 'react-redux';
import { useDataVoucher } from '@core/redux/Data';
import LoadingPage from '@core/components/LoadingPage';
import BottomModalError from '@core/components/BottomModalError';
/** === COMPONENT === */
const VoucherCartListView: FC = () => {
  /** === HOOK === */
  const { stateVoucher, dispatchVoucher } = React.useContext(
    contexts.VoucherContext,
  );
  const {
    selectedSupplierVoucher,
    setSelectedSupplierVoucher,
    resetSelectedSupplierVoucher,
  } = useSelectedSupplierVoucher();
  const {
    selectedSinbadVoucher,
    setSelectedSinbadVoucher,
    resetSelectedSinbadVoucher,
  } = useSelectedSinbadVoucher();
  const {
    supplierVoucher,
    sinbadVoucher,
    updateVoucherList,
    searchVoucher,
    resetVoucherData,
  } = useVoucherList();
  const [isErrorModalOpen, setErrorModalOpen] = React.useState(false);
  const { keyword, changeKeyword } = useSearchKeyword();
  const voucherCartListAction = useVoucherCartListAction();
  const voucherCartListState = stateVoucher.voucherCart.detail;
  const voucherData = useDataVoucher();
  const dispatch = useDispatch();
  /** => effect */
  React.useEffect(() => {
    voucherCartListAction.list(dispatchVoucher);
    if (voucherData.dataVouchers !== null) {
      setSelectedSinbadVoucher(voucherData.dataVouchers.sinbadVoucher);
      setSelectedSupplierVoucher(voucherData.dataVouchers.supplierVouchers);
    }
    return () => {
      voucherCartListAction.reset(dispatchVoucher);
    };
  }, []);
  React.useEffect(() => {
    if (voucherData.dataVouchers !== null) {
      setSelectedSinbadVoucher(voucherData.dataVouchers.sinbadVoucher);
      setSelectedSupplierVoucher(voucherData.dataVouchers.supplierVouchers);
    } else if (voucherData.dataVouchers === null) {
      setSelectedSinbadVoucher(null);
      setSelectedSupplierVoucher([]);
    }
  }, [voucherData.dataVouchers]);
  React.useEffect(() => {
    console.log('test', voucherCartListState);
    // if fetching success
    if (voucherCartListState.data !== null) {
      updateVoucherList(
        voucherCartListState.data.supplierVouchers,
        voucherCartListState.data.sinbadVouchers,
      );
    }
    // if fetching error
    if (voucherCartListState.error !== null) {
      console.log('error');
      setErrorModalOpen(true);
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
        buttonAction={() => {
          resetSelectedSinbadVoucher();
          resetSelectedSupplierVoucher();
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
              resetVoucherData();
            }}
            enter={() => searchVoucher(keyword)}
            value={keyword}
          />
        </View>
        <View style={VoucherCartListStyles.searchSectionButton}>
          <SnbButton.Dynamic
            testID={'voucherCartListView.searchButton'}
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
            <SnbIcon name={'local_offer'} color={color.green50} size={24} />
            <View
              style={VoucherCartListStyles.voucherSectionTitleTextContainer}>
              <SnbText.H4 color={color.black80}>Sinbad Voucher</SnbText.H4>
              <SnbText.C2 color={color.black60}>
                {`${sinbadVoucher.length} Voucher Tersedia`}
              </SnbText.C2>
            </View>
          </View>
          {sinbadVoucher.length > 3 ? (
            <TouchableOpacity
              testID={'voucherCartListView.sinbadVoucherSeeMore'}
              style={VoucherCartListStyles.voucherSectionRightIcon}
              onPress={() =>
                goToVoucherCartListMore({
                  voucherList: sinbadVoucher,
                  voucherGroupName: 'Sinbad Voucher',
                  voucherGroupType: 'sinbad_voucher',
                  selectedSupplierVoucher: selectedSupplierVoucher,
                  selectedSinbadVoucher: selectedSinbadVoucher,
                })
              }>
              <SnbText.B2 color={color.red50}>Lihat Semua</SnbText.B2>
              <SnbIcon name={'chevron_right'} color={color.red50} size={24} />
            </TouchableOpacity>
          ) : (
            <View />
          )}
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
      if (index < 3) {
        const isIdActive = selectedSinbadVoucher?.voucherId === item.voucherId;
        return (
          <TouchableOpacity
            testID={`voucherCartListView.sinbadVoucherCardTouchable${index}`}
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
                testID={`voucherCartListView.sinbadVoucherDetailTouchable${index}`}
                onPress={() => goToVoucherDetail(item.voucherId, 'supplier')}>
                <SnbText.B2 color={color.green50}>Lihat Detail</SnbText.B2>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      }
    });
  };
  /** => supplier voucher list */
  const renderSupplierVoucherList = () => {
    return supplierVoucher.map((item, index) => {
      return (
        <View key={index} style={VoucherCartListStyles.voucherSection}>
          <View style={VoucherCartListStyles.voucherSectionHeader}>
            <View style={VoucherCartListStyles.voucherSectionTitle}>
              <SnbIcon name={'local_offer'} color={color.green50} size={24} />
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
            {item.voucherList.length > 3 ? (
              <TouchableOpacity
                testID={`voucherCartListView.${camelize(
                  item.invoiceGroupName,
                )}SeeMore`}
                style={VoucherCartListStyles.voucherSectionRightIcon}
                onPress={() =>
                  goToVoucherCartListMore({
                    voucherList: item.voucherList,
                    voucherGroupName: item.invoiceGroupName,
                    voucherGroupType: 'supplier_voucher',
                    selectedSupplierVoucher: selectedSupplierVoucher,
                    selectedSinbadVoucher: selectedSinbadVoucher,
                  })
                }>
                <SnbText.B2 color={color.red50}>Lihat Semua</SnbText.B2>
                <SnbIcon name={'chevron_right'} color={color.red50} size={24} />
              </TouchableOpacity>
            ) : (
              <View />
            )}
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
      if (index < 3) {
        const isIdActive = selectedSupplierVoucher.some(
          (element) => element.id === item.id,
        );
        const isInvoiceGroupIdActive = selectedSupplierVoucher.some(
          (element) => element.invoiceGroupId === item.invoiceGroupId,
        );
        return (
          <TouchableOpacity
            testID={`voucherCartListView.${camelize(
              item.invoiceGroupName,
            )}CardTouchable${index}`}
            key={index}
            style={VoucherCartListStyles.voucherCard}
            onPress={() => {
              if (isInvoiceGroupIdActive) {
                if (!isIdActive) {
                  const tempArray = selectedSupplierVoucher.filter(
                    (element) => {
                      return item.invoiceGroupId !== element.invoiceGroupId;
                    },
                  );
                  tempArray.push(item);
                  setSelectedSupplierVoucher(tempArray);
                }
              } else {
                const tempArray = [...selectedSupplierVoucher];
                tempArray.push(item);
                setSelectedSupplierVoucher(tempArray);
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
                testID={`voucherCartListView.${camelize(
                  item.invoiceGroupName,
                )}DetailTouchable${index}`}
                onPress={() => goToVoucherDetail(item.id, 'supplier')}>
                <SnbText.B2 color={color.green50}>Lihat Detail</SnbText.B2>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      }
    });
  };
  /** => footer section */
  const renderFooterSection = () => {
    if (
      (selectedSinbadVoucher === null &&
        selectedSupplierVoucher.length === 0) ||
      voucherCartListState.data === null
    ) {
      return null;
    }
    return (
      <View style={[VoucherCartListStyles.footerSection, styles.shadowStyle]}>
        <View>
          <SnbText.B3 color={color.black60}>{`${
            countPotentialDiscount(
              selectedSinbadVoucher,
              selectedSupplierVoucher,
            ).totalSelectedVoucher
          } Voucher Terpilih`}</SnbText.B3>
          <SnbText.C1 color={color.yellow50}>
            {`Potensi Potongan: ${toCurrency(
              countPotentialDiscount(
                selectedSinbadVoucher,
                selectedSupplierVoucher,
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
                  supplierVouchers: selectedSupplierVoucher,
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
  /** => voucher section */
  const renderVoucherSection = () => {
    if (
      voucherCartListState.data?.sinbadVouchers.length === 0 &&
      voucherCartListState.data?.supplierVouchers.length === 0
    ) {
      return renderEmpty(
        'Voucher Tidak Tersedia',
        'Tidak ada voucher yang tersedia untuk saat ini',
      );
    } else if (
      sinbadVoucher.length === 0 &&
      supplierVoucher.length === 0 &&
      keyword !== ''
    ) {
      return renderEmpty(
        'Voucher Tidak Ditemukan',
        'Voucher yang anda cari tidak ditemukan',
      );
    } else {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderSinbadVoucherList()}
          {renderSupplierVoucherList()}
        </ScrollView>
      );
    }
  };
  /** => error modal */
  const renderErrorModal = () => {
    return (
      <BottomModalError
        isOpen={isErrorModalOpen}
        errorTitle={'Terjadi kesalahan'}
        errorSubtitle={'Silahkan mencoba kembali'}
        errorImage={require('../../../assets/images/cry_sinbad.png')}
        buttonTitle={'Ok'}
        buttonOnPress={() => {
          setErrorModalOpen(false);
        }}
      />
    );
  };
  /** => main */
  return (
    <SnbContainer color="grey">
      {renderHeader()}
      {renderSearchSection()}
      {!voucherCartListState.loading && voucherCartListState.data !== null ? (
        renderVoucherSection()
      ) : (
        <LoadingPage />
      )}
      {renderFooterSection()}
      {/* modal */}
      {renderErrorModal()}
    </SnbContainer>
  );
};

export default VoucherCartListView;
