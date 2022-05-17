import { color, SnbButton2 } from '@sinbad/react-native-sinbad-ui';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { OCRResultContent } from './components';
import * as models from '@models';
import { MerchantHookFunc } from '@screen/merchant/function';
import { contexts } from '@contexts';
import { useCamera } from '@screen/auth/functions';

const OCRResultView: React.FC = () => {
  const { editProfile } = MerchantHookFunc.useEditProfile();
  const { dispatchSupplier, stateMerchant } = React.useContext(
    contexts.MerchantContext,
  );
  const [value, setValue] = React.useState<models.IOCRResult | any>(null);
  const { openCameraWithOCR } = useCamera();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          borderTopColor: color.black40,
          borderTopWidth: 0.5,
        }}>
        <ScrollView>
          <OCRResultContent
            value={value}
            onChangeValue={(result) => setValue(result)}
          />
        </ScrollView>
      </View>
      <View style={{ flexDirection: 'row', padding: 16 }}>
        <View style={{ flex: 1 }}>
          <SnbButton2.Primary
            title={'Ubah Foto'}
            onPress={() => openCameraWithOCR('ktp')}
            disabled={false}
            size="medium"
            full
            outline
          />
        </View>
        <View style={{ marginHorizontal: 8 }} />
        <View style={{ flex: 1 }}>
          <SnbButton2.Primary
            title={'Simpan'}
            onPress={() => {
              const user = {
                name: value.nameOnKtp,
                idNo: value.idNumber,
              };
              editProfile(dispatchSupplier, { data: { user } });
            }}
            disabled={value?.idNumber === '' || value?.nameOnKtp === ''}
            size="medium"
            full
            loading={false}
          />
        </View>
      </View>
    </View>
  );
};
export default OCRResultView;
