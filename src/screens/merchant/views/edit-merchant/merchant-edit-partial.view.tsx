import React, { FC } from 'react';
import {
  SnbTextField,
  SnbTextFieldSelect,
  SnbButton,
  SnbUploadPhotoRules,
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
      case 'merchantOwnerImageId':
        return renderOwnerImageId();
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
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
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
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
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
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
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
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
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
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
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
  /** === RENDER OWNER IMAGE ID === */
  const renderOwnerImageId = () => {
    return (
      <View style={{ flex: 1 }}>
        <SnbUploadPhotoRules
          rulesTitle="Pastikan Foto Selfie dengan KTP Anda Sesuai Ketentuan"
          imgSrc="https://s3-alpha-sig.figma.com/img/c574/249b/f08ded42c46f8427961fd40b348661e1?Expires=1631491200&Signature=KeYeygi5MdQe~mRDLUAh8eA44ZDz50Ky9cGKdf3uDZr7MqCPw7aFNCska4DaY-GnI29-ENc177K-m5YK3FDUnbgb6UKzQDuULdIqlZucpBhGIPqRBFTvr0b-5lC7dZmv97j6UJ3~ketFJf7H8GdPxPFdDwegMoYPOSqPscb1E46iU1h8iM8Uu~1Rq5~2t8qp~EX6mwrLabvJWTc0rywhHhpzpV~Vi6qGn3Rx0U9JAvBbA7rUjG4HWGa5t0kcLIRZ~shAQDMPKp2FGsg2z-Na7xPqur5h6VLSGTpD6V909BpYx2FxfFyFiw76Ug2s82tgm4iY0bnsf6cg-dHMS2sgxg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          title="Unggah Foto KTP"
          rules={[
            'Pastikan KTP sesuai dengan identitas Anda',
            'KTP Tidak silau dan tidak buram',
            'Pastikan KTP bisa terbaca dengan jelas',
            'Hindari Tangan Menutupi KTP',
          ]}
          action={() => {}}
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
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
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
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
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
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
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
      <View style={{ height: 75 }}>
        <SnbButton.Single
          title={labelVerify ? 'Verifikasi' : 'Simpan'}
          type={'primary'}
          onPress={() => console.log('press')}
          disabled={false}
        />
      </View>
    ) : (
      <View />
    );
  };
  /** this for main view */
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={MerchantStyles.mainContainer}>
        {switchView()}
        {renderButton()}
      </ScrollView>

      {/* {renderButtonOpenCamera()} */}
      {/* {this.state.showModalError && this.renderModalError()} */}
    </View>
  );
};
export default MerchantEditPartialView;
