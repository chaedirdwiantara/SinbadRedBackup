import {
  SnbButton2,
  spacingV2 as layout,
} from '@sinbad/react-native-sinbad-ui';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { OCRResultContent } from './components';
import * as models from '@models';
import { MerchantHookFunc } from '@screen/merchant/function';
import { contexts } from '@contexts';
import { useCamera } from '@screen/auth/functions';
import { useOCR } from '@screen/auth/functions/global-hooks.functions';

interface Props {
  testID?: string;
}

const OCRResultView: React.FC<Props> = (props) => {
  const { editProfile } = MerchantHookFunc.useEditProfile();
  const { dispatchSupplier, stateMerchant } = React.useContext(
    contexts.MerchantContext,
  );
  const [value, setValue] = React.useState<models.IOCRResult | any>(null);
  const { openCameraWithOCR } = useCamera();
  const { ocrImageState } = useOCR()
  const { stateUser } = React.useContext(contexts.UserContext);
  const ownerData = stateUser.detail.data?.ownerData?.profile;

  React.useEffect(() => {
    if (ownerData) {
      setValue({
        idNumber: ownerData?.idNo,
        nameOnKtp: ownerData?.name
      });
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <OCRResultContent
            value={value}
            onChangeValue={(result) => setValue(result)}
          />
        </ScrollView>
      </View>
      <View style={{ flexDirection: 'row', padding: layout.spacing.lg }}>
        <View style={{ flex: 1 }}>
          <SnbButton2.Primary
            title={'Ubah Foto'}
            onPress={() => {
              openCameraWithOCR('ktp')
            }}
            disabled={stateMerchant.profileEdit.loading}
            size="medium"
            full
            outline
            testID={props.testID}
          />
        </View>
        <View style={{ marginHorizontal: layout.spacing.sm }} />
        <View style={{ flex: 1 }}>
          <SnbButton2.Primary
            title={'Simpan'}
            onPress={() => {
              const user = {
                name: value.nameOnKtp,
                idNo: value.idNumber,
                imageId: ocrImageState?.data?.uploadImageData?.data?.id
              };
              editProfile(dispatchSupplier, { data: { user } });
            }}
            disabled={
              value?.idNumber === '' ||
              value?.idNumber?.length < 16 ||
              value?.nameOnKtp === '' ||
              stateMerchant.profileEdit.loading
            }
            size="medium"
            full
            loading={stateMerchant.profileEdit.loading}
            testID={props.testID}
          />
        </View>
      </View>
    </View>
  );
};
export default OCRResultView;