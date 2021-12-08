/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { SnbContainer, SnbEmptyData } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT HERE === */
import { VoucherCartListMoreHeader } from './voucher-cart-list-more-header.view';
import { VoucherSearch } from '../../components/VoucherSearch';
import { VoucherList } from './voucher-list.view';
import { VoucherFooter } from '../../components/VoucherFooter';
/** === IMPORT INTERNAL FUNCTION HERE === */
import {
  useSearchKeyword,
  useSelectedSellerVoucher,
  useSelectedSinbadVoucher,
  useVoucherListMore,
  useVoucherLocalData,
} from '../../functions';
import { VoucherCartListStyles } from '../../styles';
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
  const voucherLocalDataAction = useVoucherLocalData();
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
          source={require('../../../../assets/images/voucher_empty.png')}
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
      <VoucherCartListMoreHeader
        resetAction={() => {
          resetSelectedSinbadVoucher();
          resetSelectedSellerVoucher();
          voucherLocalDataAction.reset();
        }}
        title={route.params.voucherGroupName}
      />
    );
  };
  /** => search section */
  const renderSearchSection = () => {
    return (
      <VoucherSearch
        keyword={keyword}
        handleChangeKeyword={changeKeyword}
        handleResetVoucherData={() =>
          setVoucherListData(route.params.voucherList)
        }
        handleSearchVoucher={() =>
          searchVoucherListData(voucherListData, keyword)
        }
      />
    );
  };
  /** => voucher list */
  const renderVoucherList = () => {
    if (voucherListData.length === 0) {
      return null;
    }
    return (
      <VoucherList
        selectedSinbadVoucher={selectedSinbadVoucher}
        selectedSellerVoucher={selectedSellerVoucher}
        setSelectedSinbadVoucher={setSelectedSinbadVoucher}
        setSelectedSellerVoucher={setSelectedSellerVoucher}
        voucherListData={voucherListData}
        voucherGroupName={route.params.voucherGroupName}
        voucherGroupType={route.params.voucherGroupType}
      />
    );
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
      <VoucherFooter
        selectedSellerVoucher={selectedSellerVoucher}
        selectedSinbadVoucher={selectedSinbadVoucher}
      />
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
