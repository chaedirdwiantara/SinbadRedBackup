import React, { FC } from 'react';
import {
  SnbText,
  SnbTopNav,
  SnbButton,
  SnbTextField,
  SnbTextFieldSelect,
  color,
} from 'react-native-sinbad-ui';
import { ScrollView, View, TouchableOpacity } from 'react-native';
/** === IMPORT STYLE HERE === */
import MerchantStyles from '../../styles/merchant.style';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { NavigationAction } from '@navigation';
import { contexts } from '@contexts';

interface Props {
  route: any;
}

const MerchantEditPartialView: FC<Props> = (props) => {
  //HOOK
  const { stateUser } = React.useContext(contexts.UserContext);
  /** function */
  const confirm = () => {
    console.log('press');
  };
  /** header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={props.route.params.title}
        backAction={() => NavigationAction.back()}
      />
    );
  };
  console.log('merchant:', stateUser);
  
  /** content */
  const renderContent = () => {
    return (
      <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <SnbTextFieldSelect
            placeholder={'Pilih Nama Bank'}
            type={'default'}
            value={'test'}
            onPress={() => console.log('press')}
            rightIcon={'chevron_right'}
            rightType={'icon'}
            labelText={'Nama Bank'}
            mandatory
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Nomor Rekening'}
            placeholder={'Masukan Nomor Rekening'}
            type={'default'}
            value={'largeArea'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
            mandatory
            helpText={'Pastikan nomor rekening benar'}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Nama Lengkap Pemilik Rekening'}
            placeholder={'Masukan Nama Lengkap Pemilik Rekening'}
            type={'default'}
            value={'largeArea'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SnbTextField.Text
            labelText={'Nama Cabang'}
            placeholder={'Masukan Nama Cabang'}
            type={'default'}
            value={'largeArea'}
            onChangeText={(text) => console.log(text)}
            clearText={() => console.log('clear')}
            helpText={'Cabang tempat pembukaan rekening'}
          />
        </View>
      </View>
    );
  };
  /** button */
  const renderButton = () => {
    return (
      <View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 16,
            backgroundColor: color.white,
          }}>
          <SnbText.B3 color={color.black40}>
            Dengan verifikasi, anda menyetujui{' '}
          </SnbText.B3>
          <TouchableOpacity
            style={{ paddingVertical: 8 }}
            onPress={() => console.log('press')}>
            <SnbText.B3 color={color.red50}>Syarat dan Ketentuan</SnbText.B3>
          </TouchableOpacity>
        </View>
        <View style={{ height: 75 }}>
          <SnbButton.Single
            title={'Verifikasi'}
            type={'primary'}
            onPress={() => confirm()}
            disabled={false}
          />
        </View>
      </View>
    );
  };
  /** this for main view */
  return (
    <View style={{ flex: 1 }}>
      {renderHeader()}
      <ScrollView contentContainerStyle={MerchantStyles.mainContainer}>
        {renderContent()}
      </ScrollView>
      {renderButton()}
    </View>
  );
};
export default MerchantEditPartialView;
