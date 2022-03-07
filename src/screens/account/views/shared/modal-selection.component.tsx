import React from 'react';
import {
  color,
  SnbBottomSheet,
  SnbButton,
  SnbRadioButton,
  SnbText,
} from '@sinbad/react-native-sinbad-ui';
import { FlatList, TouchableOpacity, View } from 'react-native';
import * as models from '@models';
import { useTextFieldSelect } from '@screen/auth/functions';
import { IRadioButton } from '@sinbad/react-native-sinbad-ui/lib/typescript/models/RadioButtonTypes';

interface Props {
  open: boolean;
  type: models.ITypeList;
  onCloseModalSelection: (result?: any) => void;
}

function setTitle(type: models.ITypeList) {
  let title = '';
  switch (type) {
    case 'listVehicleAccess': {
      title = 'Pilih Akses Jalan';
      break;
    }
    case 'listVehicleAccessAmount': {
      title = 'Pilih Jumlah Akses Jalan';
      break;
    }
    case 'listProvince': {
      title = 'Pilih Provinsi';
      break;
    }
    case 'listCity': {
      title = 'Pilih Kota';
      break;
    }
    case 'listDistrict': {
      title = 'Pilih Kecamatan';
      break;
    }
    case 'listUrban': {
      title = 'Pilih Desa/Kelurahan';
      break;
    }
  }

  return title;
}
const ModalSelection: React.FC<Props> = ({
  type,
  open,
  onCloseModalSelection,
}) => {
  const { listSelection, selectedItem, onSelectedItem } = useTextFieldSelect();

  return (
    <SnbBottomSheet
      open={open}
      title={setTitle(type)}
      closeAction={() => onCloseModalSelection()}
      actionIcon="close"
      size="halfscreen"
      content={
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={listSelection.data}
              keyExtractor={(_, idx) => idx.toString()}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              ItemSeparatorComponent={() => (
                <View style={{ height: 1, backgroundColor: color.black10 }} />
              )}
              renderItem={({ item }) => {
                let status: IRadioButton = 'unselect';
                let label = '';
                const { id, city, district, urban } = selectedItem?.item || {};
                switch (type) {
                  case 'listCity': {
                    if (city === item?.city) {
                      status = 'selected';
                    }
                    label = item.city;
                    break;
                  }
                  case 'listDistrict': {
                    if (district === item?.district) {
                      status = 'selected';
                    }
                    label = item.district;
                    break;
                  }
                  case 'listUrban': {
                    if (urban === item?.urban) {
                      status = 'selected';
                    }
                    label = item.urban;
                    break;
                  }
                  default: {
                    if (id === item?.id) {
                      status = 'selected';
                    }
                    label = item.name;
                    break;
                  }
                }
                return (
                  <TouchableOpacity
                    onPress={() => onSelectedItem({ item, type })}
                    style={{
                      paddingVertical: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ flex: 1 }}>
                      <SnbText.B1>{label}</SnbText.B1>
                    </View>
                    <View style={{ marginHorizontal: 4 }} />
                    <SnbRadioButton
                      onPress={() => onSelectedItem({ item, type })}
                      status={status}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={{ height: 72 }}>
            <SnbButton.Single
              title={setTitle(type)}
              onPress={() => onCloseModalSelection(selectedItem)}
              disabled={selectedItem === null}
              type="primary"
            />
          </View>
        </View>
      }
    />
  );
};

export default ModalSelection;
