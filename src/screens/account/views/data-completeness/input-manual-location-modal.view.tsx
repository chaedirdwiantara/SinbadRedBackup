import { useNavigation } from '@react-navigation/core';
import { useTextFieldSelect } from '@screen/auth/functions';
import { useLocations } from '@screen/auth/functions/global-hooks.functions';
import React from 'react';
import { View } from 'react-native';
import {
  SnbButton,
  SnbContainer,
  SnbTextFieldSelect,
  SnbTopNav,
} from 'react-native-sinbad-ui';
import { ModalSelection } from '../shared';
import * as models from '@models';

const Content = () => {
  const {
    selectedItem,
    resetSelectedItem,
    resetGetSelection,
    getSelection,
    onSelectedItem,
  } = useTextFieldSelect();
  const [province, setProvince] = React.useState<any>(null);
  const [city, setCity] = React.useState<any>(null);
  const [district, setDistrict] = React.useState<any>(null);
  const [urban, setUrban] = React.useState<any>(null);
  const { getLocation, locations } = useLocations();
  const { goBack } = useNavigation();
  const [type, setType] = React.useState<models.ITypeList>('');
  const [openModalSelection, setOpenModalSelection] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (locations.data?.length > 0) {
      goBack();
    }
  }, [locations]);

  React.useEffect(() => {
    switch (selectedItem?.type) {
      case 'listProvince': {
        setProvince(selectedItem.item);
        setCity(null);
        setDistrict(null);
        setUrban(null);
        break;
      }
      case 'listCity': {
        setCity(selectedItem.item);
        setDistrict(null);
        setUrban(null);
        break;
      }
      case 'listDistrict': {
        setDistrict(selectedItem.item);
        setUrban(null);
        break;
      }
      case 'listUrban': {
        setUrban(selectedItem.item);
        break;
      }
      default:
        break;
    }
  }, [selectedItem]);

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <SnbTextFieldSelect
            labelText="Provinsi"
            placeholder="Pilih Provinsi"
            mandatory
            value={province?.name || ''}
            type="default"
            onPress={() => {
              setType('listProvince');
              getSelection({ type: 'listProvince' });
              setOpenModalSelection(true);
              province &&
                onSelectedItem({ item: province, type: 'listProvince' });
            }}
            rightType="icon"
            rightIcon="chevron_right"
          />
          <View style={{ marginVertical: 12 }} />
          <SnbTextFieldSelect
            labelText="Kota"
            placeholder="Pilih Kota"
            mandatory
            value={city?.city || ''}
            type="default"
            onPress={() => {
              if (province) {
                setType('listCity');
                setOpenModalSelection(true);
                getSelection({
                  type: 'listCity',
                  params: `province=${province?.name || ''}`,
                });
                city && onSelectedItem({ item: city, type: 'listCity' });
              }
            }}
            rightType="icon"
            rightIcon="chevron_right"
          />
          <View style={{ marginVertical: 12 }} />
          <SnbTextFieldSelect
            labelText="Kecamatan"
            placeholder="Pilih Kecamatan"
            mandatory
            value={district?.district || ''}
            type="default"
            onPress={() => {
              if (city?.city) {
                setType('listDistrict');
                setOpenModalSelection(true);
                getSelection({
                  type: 'listDistrict',
                  params: `province=${province?.name}&city=${city?.city || ''}`,
                });
                district &&
                  onSelectedItem({ type: 'listDistrict', item: district });
              }
            }}
            rightType="icon"
            rightIcon="chevron_right"
          />
          <View style={{ marginVertical: 12 }} />
          <SnbTextFieldSelect
            labelText="Desa/Kelurahan"
            placeholder="Pilih Desa/Kelurahan"
            value={urban?.urban || ''}
            mandatory
            type="default"
            onPress={() => {
              if (district?.district) {
                setType('listUrban');
                getSelection({
                  type: 'listUrban',
                  params: `province=${province?.name || ''}&city=${
                    city?.city || ''
                  }&district=${district?.district || ''}`,
                });
                urban && onSelectedItem({ type: 'listUrban', item: urban });
                setOpenModalSelection(true);
              }
            }}
            rightType="icon"
            rightIcon="chevron_right"
          />
          <View style={{ marginVertical: 12 }} />
          <SnbTextFieldSelect
            labelText="Kode Pos"
            placeholder="Lihat Kode Pos"
            mandatory
            value={urban?.zipCode || ''}
            type="default"
            onPress={() => {}}
            rightType="icon"
            rightIcon="chevron_right"
          />
        </View>
      </View>
      <View style={{ height: 72 }}>
        <SnbButton.Single
          title="Simpan Lokasi Manual"
          loading={locations.loading}
          onPress={() => {
            getLocation({
              params: `province=${province.name}&city=${city.city}&district=${district.district}&urban=${urban.urban}`,
              meta: {
                limit: 10,
                skip: 0,
              },
            });
          }}
          disabled={!province || !city || !district || !urban}
          type="primary"
        />
      </View>
      <ModalSelection
        type={type}
        open={openModalSelection}
        onCloseModalSelection={(result: any) => {
          if (result) {
          }
          setOpenModalSelection(false);
          resetGetSelection();
          resetSelectedItem();
        }}
      />
    </View>
  );
};

const InputManualLocationModalView = () => {
  const { goBack } = useNavigation();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={goBack} title="Lokasi Manual" type="white" />
      <Content />
    </SnbContainer>
  );
};

export default InputManualLocationModalView;
