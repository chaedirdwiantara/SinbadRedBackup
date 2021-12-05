/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbTextField, SnbButton, styles } from 'react-native-sinbad-ui';
import { VoucherCartListStyles } from '../styles';
/** === INTERFACE === */
interface VoucherSearchProps {
  keyword: string;
  handleChangeKeyword: (value: string) => void;
  handleResetVoucherData: () => void;
  handleSearchVoucher: (value: string) => void;
}
/** === COMPONENT ===  */
export const VoucherSearch: FC<VoucherSearchProps> = ({
  keyword,
  handleChangeKeyword,
  handleResetVoucherData,
  handleSearchVoucher,
}) => (
  <View style={[VoucherCartListStyles.searchSection, styles.shadowStyle]}>
    <View style={VoucherCartListStyles.searchSectionTextField}>
      <SnbTextField.Text
        placeholder={'Cari kode voucher disini...'}
        type={'default'}
        onChangeText={(value) => handleChangeKeyword(value)}
        clearText={() => {
          handleChangeKeyword('');
          handleResetVoucherData();
        }}
        enter={() => handleSearchVoucher(keyword)}
        value={keyword}
      />
    </View>
    <View style={VoucherCartListStyles.searchSectionButton}>
      <SnbButton.Dynamic
        testID={'voucherCartListView.searchButton'}
        type={'primary'}
        title="Terapkan"
        size={'medium'}
        onPress={() => handleSearchVoucher(keyword)}
        disabled={false}
      />
    </View>
  </View>
);
