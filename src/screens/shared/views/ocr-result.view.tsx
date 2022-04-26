import { color, SnbButton } from '@sinbad/react-native-sinbad-ui';
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
  const { dispatchSupplier } = React.useContext(contexts.MerchantContext);
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
      <View style={{ height: 72 }}>
        <SnbButton.Multiple
          leftType={'secondary'}
          rightType={'primary'}
          leftTitle={'Ubah Foto'}
          rightTitle={'Simpan'}
          onPressLeft={() => {
            openCameraWithOCR('ktp');
          }}
          onPressRight={() => {
            const user = {
              name: value.nameOnKtp,
              idNo: value.idNumber,
            };
            editProfile(dispatchSupplier, { data: { user } });
          }}
          rightDisabled={value?.idNumber === '' || value?.nameOnKtp === ''}
          leftDisabled={false}
          rightLoading={false}
        />
      </View>
    </View>
  );
};
export default OCRResultView;
