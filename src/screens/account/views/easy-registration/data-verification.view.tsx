import React, { useState } from 'react';
import {
  SnbContainer,
  SnbTopNav2,
  SnbButton2,
  SnbTextField2,
  spacingV2 as layout,
  SnbText2,
  colorV2,
} from 'react-native-sinbad-ui';
import { View, Image, ScrollView } from 'react-native';
import { Images } from 'src/assets';
import { useOTP } from '@screen/auth/functions';

const DataVerificationView: React.FC = () => {
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [errorIdNumber, setErrorIdNumber] = useState(false);
  const [address, setAddress] = useState('');
  const { getLocationPermissions } = useOTP();

  //FUNCTION
  /** === CHECK ID NUMBER FORMAT === */
  const checkIdNoFormat = (idNumber: any) => {
    setIdNumber(idNumber);
    if (idNumber === '' || idNumber.length === 16) {
      setErrorIdNumber(false);
    } else {
      setErrorIdNumber(true);
    }
  };
  const handleSubmit = () => {
    getLocationPermissions();
  };

  //VIEW
  const dataForm = () => {
    return (
      <View style={{ marginHorizontal: layout.spacing.lg }}>
        <View style={{ marginBottom: layout.spacing.lg }}>
          <SnbTextField2.Text
            type={'disabled'}
            value={'082288360129'}
            labelText={'Nomor Handphone'}
            keyboardType={'default'}
            mandatory
          />
        </View>
        <View style={{ marginBottom: layout.spacing.lg }}>
          <SnbTextField2.Text
            type={'default'}
            value={storeName}
            maxLength={50}
            onChangeText={(text) => {
              setStoreName(text);
            }}
            placeholder={'Masukkan nama toko Anda'}
            labelText={'Nama Toko'}
            keyboardType={'default'}
            mandatory
          />
        </View>
        <View style={{ marginBottom: layout.spacing.lg }}>
          <SnbTextField2.Text
            type={'default'}
            value={ownerName}
            maxLength={50}
            onChangeText={(text) => {
              setOwnerName(text);
            }}
            placeholder={'Masukkan nama Anda'}
            labelText={'Nama Pemilik'}
            keyboardType={'default'}
            mandatory
          />
        </View>
        <View style={{ marginBottom: layout.spacing.lg }}>
          <SnbTextField2.Text
            type={errorIdNumber ? 'error' : 'default'}
            value={idNumber}
            maxLength={16}
            onChangeText={(text) => {
              const cleanNumber = text.replace(/[^0-9]/g, '');
              checkIdNoFormat(cleanNumber);
            }}
            placeholder={'Masukkan nomor KTP Anda'}
            labelText={'Nomor KTP'}
            keyboardType={'number-pad'}
            mandatory
            valMsgError={'Nomor KTP harus 16 digit'}
          />
        </View>
        <View>
          <SnbTextField2.Area
            type={'default'}
            value={address}
            maxLength={200}
            onChangeText={(text) => {
              setAddress(text);
            }}
            placeholder={'Masukkan alamat Anda'}
            labelText={'Alamat'}
            keyboardType={'default'}
            mandatory
          />
        </View>
      </View>
    );
  };
  const buttonConfirm = () => {
    return (
      <View style={{ flexDirection: 'row', padding: layout.spacing.lg }}>
        <View style={{ flex: 1 }}>
          <SnbButton2.Primary
            title={'Lanjut'}
            onPress={() => handleSubmit()}
            disabled={!storeName || !ownerName || !idNumber || !address}
            size="medium"
            full
          />
        </View>
      </View>
    );
  };
  return (
    <SnbContainer color="white">
      <View>
        <SnbTopNav2.Type1 color="white" title="Verifikasi Data" />
      </View>
      <ScrollView>
        <View
          style={{ alignItems: 'center', marginVertical: layout.spacing.xl }}>
          <Image
            source={Images.loginSuccess}
            style={{ height: 220, width: 220 }}
            resizeMode="contain"
          />
        </View>
        <View style={{ margin: layout.spacing.lg, alignItems: 'center' }}>
          <SnbText2.Body.Default>
            Nomor Handphone Sudah Terdaftar
          </SnbText2.Body.Default>
          <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
            Pastikan data dibawah ini benar merupakan data Anda
          </SnbText2.Paragraph.Default>
        </View>
        {dataForm()}
      </ScrollView>
      {buttonConfirm()}
    </SnbContainer>
  );
};

export default DataVerificationView;
