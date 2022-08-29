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
import { useEasyRegistration } from '@screen/account/functions';
import LoadingPage from '@core/components/LoadingPage';
import { LIST_LOCATION_VIEW } from '@screen/account/functions/screens_name';
import { useNavigation } from '@react-navigation/core';
import BottomSheetError from '@core/components/BottomSheetError';

const DataVerificationView: React.FC = () => {
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [errorIdNumber, setErrorIdNumber] = useState(false);
  const [address, setAddress] = useState('');
  const { useGetUserMedea, useUpdateUserMedea } = useEasyRegistration();
  const { getUserMedea, userMedeaData } = useGetUserMedea();
  const { updateUserMedea, updateUserMedeaData, updateUserMedeaReset } =
    useUpdateUserMedea();
  const { reset } = useNavigation();
  const [openModalError, setOpenModalError] = useState(false);

  //FUNCTION
  React.useEffect(() => {
    getUserMedea();
  }, []);

  React.useEffect(() => {
    if (userMedeaData?.data) {
      setStoreName(userMedeaData?.data?.buyerName);
      setOwnerName(userMedeaData?.data?.ownerName);
      setIdNumber(userMedeaData?.data?.idNo);
      setAddress(userMedeaData?.data?.address);
    }
  }, [userMedeaData]);

  React.useEffect(() => {
    if (updateUserMedeaData.data) {
      reset({ index: 0, routes: [{ name: LIST_LOCATION_VIEW }] });
      updateUserMedeaReset();
    }
    if (updateUserMedeaData.error) {
      setOpenModalError(true);
    }
  }, [updateUserMedeaData]);

  /** === CHECK ID NUMBER FORMAT === */
  const checkIdNoFormat = (idNumber: any) => {
    setIdNumber(idNumber);
    if (idNumber === '' || idNumber.length === 16) {
      setErrorIdNumber(false);
    } else {
      setErrorIdNumber(true);
    }
  };
  //HANDLE SUBMIT
  const handleSubmit = () => {
    const update = {
      ownerName: ownerName,
      buyerName: storeName,
      idNo: idNumber,
      address: address,
      ownerPhoneNumber: userMedeaData?.data?.ownerPhoneNumber,
    };
    updateUserMedea(update);
  };

  //VIEW
  const dataForm = () => {
    return (
      <View style={{ marginHorizontal: layout.spacing.lg }}>
        <View style={{ marginBottom: layout.spacing.lg }}>
          <SnbTextField2.Text
            type={'disabled'}
            value={userMedeaData?.data?.ownerPhoneNumber}
            labelText={'Nomor Handphone'}
            keyboardType={'default'}
            mandatory
            testID={'10'}
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
            testID={'10'}
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
            testID={'10'}
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
            testID={'10'}
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
            testID={'10'}
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
            disabled={
              !storeName ||
              !ownerName ||
              !idNumber ||
              !address ||
              errorIdNumber ||
              updateUserMedeaData.loading
            }
            size="medium"
            full
            loading={updateUserMedeaData.loading}
            testID={'10'}
          />
        </View>
      </View>
    );
  };
  return userMedeaData?.data ? (
    <SnbContainer color="white">
      <View>
        <SnbTopNav2.Type1 color="white" title="Verifikasi Data" />
      </View>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            marginVertical: layout.spacing.xl,
          }}>
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
      <BottomSheetError
        open={openModalError}
        error={updateUserMedeaData.error}
        closeAction={() => setOpenModalError(false)}
        retryAction={() => {
          updateUserMedeaReset();
          handleSubmit();
        }}
        isCloseable
      />
    </SnbContainer>
  ) : (
    <LoadingPage />
  );
};

export default DataVerificationView;
