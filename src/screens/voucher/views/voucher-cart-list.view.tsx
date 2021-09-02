import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
import { VoucherFunc } from '../functions';
import VoucherStyle from '../styles/voucher.style';

const VoucherCartListView: FC = () => {
  const [supplierVoucherList, setSupplierVoucherList] = React.useState([]);
  const [sinbadVoucherList, setSinbadVoucherList] = React.useState([]);

  const renderSearchSection = () => {
    return (
      <View style={[VoucherStyle.searchSection, styles.shadowStyle]}>
        <View style={VoucherStyle.searchSectionTextField}>
          <SnbTextField.Text
            placeholder={'Cari kode voucher disini...'}
            type={'default'}
            onChangeText={() => {}}
            clearText={() => {}}
            value={''}
          />
        </View>
        <View style={VoucherStyle.searchSectionButton}>
          <SnbButton.Dynamic
            type={'primary'}
            title="Terapkan"
            size={'large'}
            onPress={() => {}}
            disabled={false}
          />
        </View>
      </View>
    );
  };

  const renderVoucherHeader = () => {
    return (
      <View style={VoucherStyle.voucherSectionHeader}>
        <View style={VoucherStyle.voucherSectionTitle}>
          <SnbIcon name={'settings'} color={color.green50} size={24} />
          <View style={VoucherStyle.voucherSectionTitleTextContainer}>
            <SnbText.H4 color={color.black80}>Sinbad Voucher</SnbText.H4>
            <SnbText.C2 color={color.black60}>8 Voucher Tersedia</SnbText.C2>
          </View>
        </View>
        <TouchableOpacity style={VoucherStyle.voucherSectionRightIcon}>
          <SnbText.B2 color={color.red50}>Lihat Semua</SnbText.B2>
          <SnbIcon name={'chevron_right'} color={color.red50} size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderVoucherList = () => {
    return (
      <View style={VoucherStyle.voucherCard}>
        <View>
          <View style={{ marginBottom: 8 }}>
            <SnbText.B4>Voucher Diskon SGM Rp 100.000</SnbText.B4>
          </View>
          <View style={{ marginBottom: 8 }}>
            <SnbText.C2 color={color.black80}>
              SINBAD mengadakan diskon hingga 5% untuk pembelian SGM 200GR...
            </SnbText.C2>
          </View>
          <SnbText.C1 color={color.black80}>
            Berakhir dalam 1 hari lagi!
          </SnbText.C1>
        </View>
        <View>
          
        </View>
      </View>
    );
  };

  const renderVoucherSection = () => {
    return (
      <View style={VoucherStyle.voucherSection}>
        {renderVoucherHeader()}
        {renderVoucherList()}
      </View>
    );
  };

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        type="red"
        title="Pakai Voucher"
        backAction={() => VoucherFunc.goBack()}
      />
      {renderSearchSection()}
      {renderVoucherSection()}
    </SnbContainer>
  );
};

export default VoucherCartListView;
