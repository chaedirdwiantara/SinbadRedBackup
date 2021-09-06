import React, { FC } from 'react';
import {
  SnbTextField,
  SnbTextFieldSelect,
  SnbButton,
} from 'react-native-sinbad-ui';
import { ScrollView, View } from 'react-native';
/** === IMPORT STYLE HERE === */
import MerchantStyles from '../../styles/merchant.style';

interface Props {
  type: any;
  showButton: boolean;
}

const MerchantEditPartialView: FC<Props> = (props) => {
  /**
   * ================================
   * SWITCH VIEW
   * ================================
   */
  const switchView = () => {
    switch (props.type) {
      case 'merchantOwnerName':
        return renderOwnerName();
      case 'merchantOwnerEmail':
        return renderOwnerEmail();
      case 'merchantOwnerIdNo':
        return renderOwnerIdNo();
      case 'merchantOwnerTaxNo':
        return renderOwnerTaxNo();
      case 'merchantOwnerPhoneNo':
        return renderOwnerPhoneNo();
      case 'merchantCompletenessInformation':
        return renderCompletenessInformationMerchant();
      //   case 'merchantAddress':
      //     return renderAddressMerchant();
      //   case 'merchantOwnerImageId':
      //     return renderOwnerImageId();
      //   case 'merchantOwnerImageSelfie':
      //     return renderOwnerImageSelfie();
      //   case 'merchantOwnerImageTax':
      //     return renderOwnerImageTax();
      case 'merchantAccountName':
        return renderMerchantAccountName();
      case 'merchantAccountPhoneNo':
        return renderMerchantAccountPhoneNo();
      //   case 'merchantAccountImage':
      //     return renderMerchantAccountImage();
      default:
        break;
    }
  };
  /** === VIEW === */
  /**
   * ==================================
   * RENDER OWNER DATA
   * ===================================
   */
  /** === RENDER OWNER NAME === */
  const renderOwnerName = () => {
    return (
      <View style={{ marginTop: 16, marginHorizontal: 16 }}>
        <SnbTextField.Text
          labelText={'Nama Lengkap Pemilik'}
          placeholder={'Masukan Nama Lengkap Pemilik'}
          type={'default'}
          value={''}
          onChangeText={(text) => console.log(text)}
          clearText={() => console.log('clear')}
        />
      </View>
    );
  };
  /** === RENDER OWNER EMAIL === */
  const renderOwnerEmail = () => {
    return (
      <View style={{ marginTop: 16, marginHorizontal: 16 }}>
        <SnbTextField.Text
          labelText={'E-mail'}
          placeholder={'Masukan E-mail'}
          type={'default'}
          value={''}
          onChangeText={(text) => console.log(text)}
          clearText={() => console.log('clear')}
        />
      </View>
    );
  };
  /** === RENDER OWNER NO HANDPHONE === */
  const renderOwnerPhoneNo = () => {
    return (
      <View style={{ marginTop: 16, marginHorizontal: 16 }}>
        <SnbTextField.Text
          labelText={'Nomor Handphone'}
          placeholder={'Masukan nomor handphone Anda'}
          type={'default'}
          value={''}
          onChangeText={(text) => console.log(text)}
          clearText={() => console.log('clear')}
        />
      </View>
    );
  };
  /** === RENDER OWNER NO KTP === */
  const renderOwnerIdNo = () => {
    return (
      <View style={{ marginTop: 16, marginHorizontal: 16 }}>
        <SnbTextField.Text
          labelText={'Nomor Kartu Tanda Penduduk (KTP)'}
          placeholder={'Masukan No.KTP maks. 16 Digit'}
          type={'default'}
          value={''}
          onChangeText={(text) => console.log(text)}
          clearText={() => console.log('clear')}
        />
      </View>
    );
  };
  /** === RENDER OWNER NO NPWP === */
  const renderOwnerTaxNo = () => {
    return (
      <View style={{ marginTop: 16, marginHorizontal: 16 }}>
        <SnbTextField.Text
          labelText={'Nomor Pokok Wajib Pajak (NPWP) Pemilik'}
          placeholder={'Masukan No.NPWP maks.15 Digit'}
          type={'default'}
          value={''}
          onChangeText={(text) => console.log(text)}
          clearText={() => console.log('clear')}
        />
      </View>
    );
  };
  /**
   * =====================================
   * RENDER ACCOUNT MERCHANT (AKUN TOKO)
   * =====================================
   */
  /** === RENDER MERCHANT ACCOUNT NAME === */
  const renderMerchantAccountName = () => {
    return (
      <View style={{ marginTop: 16, marginHorizontal: 16 }}>
        <SnbTextField.Text
          labelText={'Nama Toko'}
          placeholder={'Masukan Nama Toko'}
          type={'default'}
          value={''}
          onChangeText={(text) => console.log(text)}
          clearText={() => console.log('clear')}
        />
      </View>
    );
  };
  /** === RENDER MERCHANT ACCOUNT PHONE NUMBER === */
  const renderMerchantAccountPhoneNo = () => {
    return (
      <View style={{ marginTop: 16, marginHorizontal: 16 }}>
        <SnbTextField.Text
          labelText={'Nomor Handphone Toko'}
          placeholder={'Masukan Nomor Handphone Toko'}
          type={'default'}
          value={''}
          onChangeText={(text) => console.log(text)}
          clearText={() => console.log('clear')}
        />
      </View>
    );
  };
  /** === RENDER COMPLETENESS MERCHANT INFORMATION DETAIL === */
  const renderCompletenessInformationMerchant = () => {
    return (
      <View style={{ marginTop: 16, marginHorizontal: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <SnbTextFieldSelect
            placeholder={'Pilih Jumlah Karyawan'}
            type={'default'}
            value={''}
            onPress={() => console.log('press')}
            rightIcon={'chevron_right'}
            rightType={'icon'}
            labelText={'Jumlah Karyawan'}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Ukuran Toko'}
            placeholder={'Masukan Ukuran Toko'}
            type={'default'}
            value={''}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Top Brand Selling'}
            placeholder={'Masukan Top Brand Selling'}
            type={'default'}
            value={''}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Wanted Brand'}
            placeholder={'Masukan Wanted Brand'}
            type={'default'}
            value={''}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextFieldSelect
            placeholder={'Pilih Akses Jalan'}
            type={'default'}
            value={''}
            onPress={() => console.log('press')}
            rightIcon={'chevron_right'}
            rightType={'icon'}
            labelText={'Akses Jalan'}
          />
        </View>
        <View>
          <SnbTextField.Text
            labelText={'Jumlah Akses Jalan'}
            placeholder={'Masukan Jumlah Akses Jalan'}
            type={'default'}
            value={''}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
      </View>
    );
  };
  /** === RENDER BUTTON === */
  const renderButton = () => {
    const labelVerify =
      props.type === 'merchantOwnerEmail' ||
      props.type === 'merchantOwnerPhoneNo';

    return props.showButton ? (
      <SnbButton.Single
        title={labelVerify ? 'Verifikasi' : 'Simpan'}
        type={'primary'}
        onPress={() => console.log('press')}
        disabled={false}
      />
    ) : (
      <View />
    );
  };
  /** this for main view */
  return (
    <View>
      <ScrollView style={MerchantStyles.mainContainer}>
        {switchView()}
        <View style={{ paddingBottom: 50 }} />
      </ScrollView>
      {renderButton()}
      {/* {renderButtonOpenCamera()} */}
      {/* {this.state.showModalError && this.renderModalError()} */}
    </View>
  );
};
export default MerchantEditPartialView;
