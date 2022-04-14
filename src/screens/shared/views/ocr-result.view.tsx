import {
  color,
  SnbButton,
  SnbContainer,
  SnbTopNav,
} from '@sinbad/react-native-sinbad-ui';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { OCRResultContent } from './components';
import * as models from '@models';
import { useNavigation, useRoute } from '@react-navigation/native';

const Content: React.FC = () => {
  const { params } = useRoute();
  const [value, setValue] = React.useState<models.IOCRResult | any>(null);

  React.useEffect(() => {
    setValue(params);
  }, []);

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
          onPressLeft={() => {}}
          onPressRight={() => {}}
          rightDisabled={value?.idNumber === '' || value?.nameOnKTP === ''}
          leftDisabled={false}
          rightLoading={false}
        />
      </View>
    </View>
  );
};
const OCRResultView: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={goBack} title="Foto KTP" type="white" />
      <Content />
    </SnbContainer>
  );
};

export default OCRResultView;
