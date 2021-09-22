import React, { FC } from 'react';
import {
  SnbTextField,
  SnbTextFieldSelect,
  SnbButton,
  SnbUploadPhotoRules,
  SnbText,
} from 'react-native-sinbad-ui';
import { ScrollView, View } from 'react-native';
/** === IMPORT STYLE HERE === */
import MerchantStyles from '../../styles/merchant.style';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';

interface Props {
  type: any;
  showButton: boolean;
}

const MerchantEditPartialView: FC<Props> = (props) => {
  /** === HOOK === */
  const { stateUser } = React.useContext(contexts.UserContext);
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
      case 'merchantAddress':
        return renderAddressMerchant();
      case 'merchantOwnerImageId':
        return renderOwnerImageId();
      case 'merchantOwnerImageSelfie':
        return renderOwnerImageSelfie();
      case 'merchantOwnerImageTax':
        return renderOwnerImageTax();
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
          rulesTitle="Pastikan Foto KTP Anda Sesuai Ketentuan"
          imgSrc="https://s3-alpha-sig.figma.com/img/4e9b/f869/7b2c7d944da2051c0422f41d9b920d88?Expires=1632096000&Signature=PcMkPhandytpXueLoKbXpj9CUT-4LYOkuxWsfeCUMeMhVNynnb66TmCR6JFZWx-5DLmy0fS0Q6KbGajNdAGbG7DD0Oa76~Z0~1F7K7eItCqYgyCwUL8SGpc~frmLBUqLTqs-NqOea0vPqJifZL-d-nt7IK3XWQ97~IYjB5ujfx87JbeE-k1U-YkQsYjV7zr00rdg4h-gekAhYW0rHN~-4Hm6P8qjFGIaY3p3X4leIanac8HYnx~bpQHIY8HMA-Fz69TxpmamCyKuhau2HwOMcvW2EcYbr4424YrsQUhnNYmsIw7BTckpMk2NYKTXG~3vSzisYypLJQxHItfBZEi0VQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
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
  /** === RENDER OWNER IMAGE Selfie === */
  const renderOwnerImageSelfie = () => {
    return (
      <View style={{ flex: 1 }}>
        <SnbUploadPhotoRules
          rulesTitle="Pastikan Foto Selfie dengan KTP Anda Sesuai Ketentuan"
          imgSrc="https://s3-alpha-sig.figma.com/img/c574/249b/f08ded42c46f8427961fd40b348661e1?Expires=1631491200&Signature=KeYeygi5MdQe~mRDLUAh8eA44ZDz50Ky9cGKdf3uDZr7MqCPw7aFNCska4DaY-GnI29-ENc177K-m5YK3FDUnbgb6UKzQDuULdIqlZucpBhGIPqRBFTvr0b-5lC7dZmv97j6UJ3~ketFJf7H8GdPxPFdDwegMoYPOSqPscb1E46iU1h8iM8Uu~1Rq5~2t8qp~EX6mwrLabvJWTc0rywhHhpzpV~Vi6qGn3Rx0U9JAvBbA7rUjG4HWGa5t0kcLIRZ~shAQDMPKp2FGsg2z-Na7xPqur5h6VLSGTpD6V909BpYx2FxfFyFiw76Ug2s82tgm4iY0bnsf6cg-dHMS2sgxg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          title="Unggah Foto Diri dengan KTP Owner"
          rules={[
            'Posisikan KTP di bawah dagu Anda',
            'KTP Tidak silau dan tidak buram',
            'Pastikan KTP bisa terbaca dengan jelas',
            'Hindari Tangan Menutupi KTP',
          ]}
          action={() => {}}
        />
      </View>
    );
  };
  /** === RENDER OWNER IMAGE TAX === */
  const renderOwnerImageTax = () => {
    return (
      <View style={{ flex: 1 }}>
        <SnbUploadPhotoRules
          rulesTitle="Pastikan Foto NPWP Anda Sesuai Ketentuan"
          imgSrc="https://s3-alpha-sig.figma.com/img/4f9b/2a06/d04d4acef65a83217d814ed9aa953a31?Expires=1632096000&Signature=Wl0ScvJmSsWpSqCsSvjBsKVjEUc53NoEawaVNBGALvYfoCwe5P2hyo45Ba2NSThzZbPaDrpRV7Gl7MVSwhkSqoh8cbMoJcAQp0ic2UwKW6cP0oYcNfFiE77QeU7zJo5kbhr1J3RRYVMnZ0nvYUqgBjrVtt6utz7AjkGNDqVyWAReTUOsEM4BHNUAioWtFAbdZAjsqRVp2H6SkuEKjVum90HnG0xHeOVdp5HGo3CB96s~y7aqrhlxb3Z-NISSbYmxYdDeH0RmDNo8sao-xzB5HWcYR1Uiy-60bQSOQXjFjsu9V~D72rT3ERNYvDu2Ez8VneDD3oGZuT7abW1RcT1wXg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          title="Unggah Foto NPWP"
          rules={[
            'Pastikan NPWP sesuai dengan identitas Anda',
            'NPWP Tidak silau dan tidak buram',
            'Pastikan NPWP bisa terbaca dengan jelas',
            'Hindari Tangan Menutupi NPWP',
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
    const storeData =
      stateUser.detail.data?.storeData.storeInformation.storeDetailCompleteness;
    return (
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <SnbTextFieldSelect
            placeholder={'Pilih Jumlah Karyawan'}
            type={'default'}
            value={
              storeData?.numberOfEmployee ? storeData?.numberOfEmployee : ''
            }
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
            value={storeData?.largeArea ? storeData?.largeArea : ''}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Top Brand Selling'}
            placeholder={'Masukan Top Brand Selling'}
            type={'default'}
            value={storeData?.topSellingBrand ? storeData?.topSellingBrand : ''}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Wanted Brand'}
            placeholder={'Masukan Wanted Brand'}
            type={'default'}
            value={storeData?.mostWantedBrand ? storeData?.mostWantedBrand : ''}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextFieldSelect
            placeholder={'Pilih Akses Jalan'}
            type={'default'}
            value={
              storeData?.vehicleAccessibility
                ? storeData?.vehicleAccessibility
                : ''
            }
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
            type={'number'}
            value={
              storeData?.vehicleAccessibilityAmount
                ? `${storeData?.vehicleAccessibilityAmount}`
                : ''
            }
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
      </View>
    );
  };
  /** === RENDER MERCHANT ADDRESS (ALAMAT TOKO) === */
  const renderAddressMerchant = () => {
    const dataAddress = stateUser.detail.data?.storeData.storeAddress;
    return (
      <View style={{ marginTop: 16, marginHorizontal: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <SnbText.B1>map</SnbText.B1>
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Area
            labelText={'Alamat'}
            placeholder={'-'}
            type={'default'}
            value={dataAddress?.address ? dataAddress?.address : '-'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Area
            labelText={'Catatan Alamat'}
            placeholder={'-'}
            type={'default'}
            value={dataAddress?.noteAddress ? dataAddress?.noteAddress : '-'}
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
      </ScrollView>
      {renderButton()}
      {/* {renderButtonOpenCamera()} */}
      {/* {this.state.showModalError && this.renderModalError()} */}
    </View>
  );
};
export default MerchantEditPartialView;
