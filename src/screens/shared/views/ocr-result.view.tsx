import {
  SnbButton2,
  SnbToast,
  spacingV2 as layout,
} from '@sinbad/react-native-sinbad-ui';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { OCRResultContent } from './components';
import * as models from '@models';
import { MerchantHookFunc } from '@screen/merchant/function';
import { contexts } from '@contexts';
import { useCamera } from '@screen/auth/functions';
import { useEasyRegistration } from '@screen/account/functions';

interface Props {
  testID?: string;
}

const OCRResultView: React.FC<Props> = (props) => {
  const { editProfile } = MerchantHookFunc.useEditProfile();
  const { dispatchSupplier, stateMerchant } = React.useContext(
    contexts.MerchantContext,
  );
  const [value, setValue] = React.useState<models.IOCRResult | any>(null);
  const { openCamera } = useCamera();
  const { uploadSecureImage, uploadSecureImageReset, uploadImageSecureState } = useEasyRegistration();
  const { capturedImage } = useCamera()

  React.useEffect(() => {
    uploadSecureImageReset()
    return uploadSecureImageReset
  }, [])

  React.useEffect(() => {
    if (uploadImageSecureState?.data) {
      const user = {
        name: value?.nameOnKtp,
        idNo: value?.idNumber?.replace(/[^0-9]/g, ''),
        imageId: uploadImageSecureState?.data?.data?.id
      };
      editProfile(dispatchSupplier, { data: { user } });
    }
    if (uploadImageSecureState?.error) {
      SnbToast.show('Gagal upload foto KTP', 2000)
    }
  }, [uploadImageSecureState])

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
            onPress={() => openCamera('ktp')}
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
              uploadSecureImageReset()
              uploadSecureImage({ imageUrl: capturedImage.data?.url })
            }}
            disabled={
              value?.idNumber?.length < 16 ||
              value?.nameOnKtp === '' ||
              stateMerchant.profileEdit.loading ||
              uploadImageSecureState.loading
            }
            size="medium"
            full
            loading={stateMerchant.profileEdit.loading || uploadImageSecureState.loading}
            testID={props.testID}
          />
        </View>
      </View>
    </View>
  );
};
export default OCRResultView;
