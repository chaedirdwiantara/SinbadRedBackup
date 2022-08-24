import { useNavigation } from '@react-navigation/core';
import { useTextFieldSelect } from '@screen/auth/functions';
import React from 'react';
import { View } from 'react-native';
import {
  FooterButton,
  SnbBottomSheet2Ref,
  SnbContainer,
  SnbTopNav2,
  spacingV2 as layout,
} from 'react-native-sinbad-ui';
import { ModalSelection } from '../shared';
import * as models from '@models';
import { useLocations } from '@screen/auth/functions/global-hooks.functions';
import TextFieldSelect from '../textfield-select-2.component';

const Content = () => {
  const { resetSelectedItem, resetGetSelection, getSelection, onSelectedItem } =
    useTextFieldSelect();
  const [province, setProvince] = React.useState<any>(null);
  const [city, setCity] = React.useState<any>(null);
  const [district, setDistrict] = React.useState<any>(null);
  const [urban, setUrban] = React.useState<any>(null);
  const { goBack } = useNavigation();
  const [type, setType] = React.useState<models.ITypeList>('');
  const refModalSelection = React.useRef<SnbBottomSheet2Ref>()
  const [params, setParams] = React.useState('');
  const { getLocation, locations, resetLocation } = useLocations();
  const [modalSelectionTestId, setModalSelectionTestId] = React.useState('')


  React.useEffect(() => {
    if (type === 'listProvince' && province) {
      onSelectedItem({ item: province, type: 'listProvince' });
    }
  }, [type]);

  React.useEffect(() => {
    if (locations.data?.id) {
      goBack();
      resetLocation();
    }

    return resetLocation;
  }, [locations]);

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={{ flex: 1 }}>
        <View style={{ padding: layout.spacing.lg }}>
          <TextFieldSelect
            testID={'14.1'}
            labelText="Provinsi"
            placeholder="Pilih Provinsi"
            mandatory
            value={province?.province || ''}
            type="default"
            onPress={() => {
              setModalSelectionTestId('14.2')
              setType('listProvince');
              getSelection({ type: 'listProvince' });
              refModalSelection.current?.open();
            }}
            rightType="icon"
            rightIcon="chevron_right"
          />
          <View style={{ marginVertical: layout.spacing.md }} />
          <TextFieldSelect
            testID={'14.1'}
            labelText="Kota"
            placeholder="Pilih Kota"
            mandatory
            value={city?.city || ''}
            type="default"
            onPress={() => {
              if (province) {
                setModalSelectionTestId('14.3')
                const cityParams = `province=${province?.province || ''}`;
                setType('listCity');
                setParams(cityParams);
                city && onSelectedItem({ item: city, type: 'listCity' });
                getSelection({
                  type: 'listCity',
                  params: cityParams,
                });
                refModalSelection.current?.open();
              }
            }}
            rightType="icon"
            rightIcon="chevron_right"
          />
          <View style={{ marginVertical: layout.spacing.md }} />
          <TextFieldSelect
            testID={'14.1'}
            labelText="Kecamatan"
            placeholder="Pilih Kecamatan"
            mandatory
            value={district?.district || ''}
            type="default"
            onPress={() => {
              if (city?.city) {
                setModalSelectionTestId('14.4')
                const districtParams = `province=${province?.province}&city=${city?.city || ''
                  }`;
                setType('listDistrict');
                setParams(districtParams);
                district &&
                  onSelectedItem({ type: 'listDistrict', item: district });
                getSelection({
                  type: 'listDistrict',
                  params: districtParams,
                });
                refModalSelection.current?.open();
              }
            }}
            rightType="icon"
            rightIcon="chevron_right"
          />
          <View style={{ marginVertical: layout.spacing.md }} />
          <TextFieldSelect
            testID={'14.1'}
            labelText="Desa/Kelurahan"
            placeholder="Pilih Desa/Kelurahan"
            value={urban?.urban || ''}
            mandatory
            type="default"
            onPress={() => {
              if (district?.district) {
                setModalSelectionTestId('14.5')
                const urbanParams = `province=${province?.province || ''
                  }&city=${city?.city || ''}&district=${district?.district || ''
                  }`;
                setType('listUrban');
                setParams(urbanParams);
                getSelection({
                  type: 'listUrban',
                  params: urbanParams,
                });
                urban && onSelectedItem({ type: 'listUrban', item: urban });
                refModalSelection.current?.open();
              }
            }}
            rightType="icon"
            rightIcon="chevron_right"
          />
          <View style={{ marginVertical: layout.spacing.md }} />
          <TextFieldSelect
            testID={'14.1'}
            labelText="Kode Pos"
            placeholder="Lihat Kode Pos"
            mandatory
            value={urban?.zipCode || ''}
            type="default"
            onPress={() => { }}
            rightType="icon"
            rightIcon="chevron_right"
          />
        </View>
      </View>
      <FooterButton.Single
        title="Simpan Lokasi Manual"
        loadingButton={locations.loading}
        buttonPress={() => {
          getLocation({
            params: `province=${province.province}&city=${city.city}&district=${district.district}&urban=${urban.urban}`,
          });
        }}
        disabled={
          !province || !city || !district || !urban || locations.loading
        }
      />
      <ModalSelection
        testID={modalSelectionTestId}
        type={type}
        ref={refModalSelection}
        params={params}
        onCloseModalSelection={(result) => {
          if (result) {
            onSelectedItem(result);
            switch (result?.type) {
              case 'listProvince': {
                setProvince(result.item);
                setCity(null);
                setDistrict(null);
                setUrban(null);
                break;
              }
              case 'listCity': {
                setCity(result.item);
                setDistrict(null);
                setUrban(null);
                break;
              }
              case 'listDistrict': {
                setDistrict(result.item);
                setUrban(null);
                break;
              }
              case 'listUrban': {
                setUrban(result.item);
                break;
              }
              default:
                break;
            }
          }
          resetGetSelection();
          resetSelectedItem();
          refModalSelection.current?.close()
        }}
      />
    </View>
  );
};

const InputManualLocationModalView = () => {
  const { goBack } = useNavigation();
  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        backAction={goBack}
        title="Lokasi Manual"
        color="white"
      />
      <Content />
    </SnbContainer>
  );
};

export default InputManualLocationModalView;
