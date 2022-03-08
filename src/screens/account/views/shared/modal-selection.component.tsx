import React from 'react';
import {
  color,
  SnbBottomSheet,
  SnbButton,
  SnbProgress,
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
  params?: string;
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

function handleRadioButtonStatus(
  type: models.ITypeList,
  item: any,
  selectedItem: any,
) {
  let status: IRadioButton = 'unselect';
  let label = '';
  const { id, city, name, district, province } = selectedItem?.item || {};

  switch (type) {
    case 'listProvince': {
      if (name === item?.name) {
        status = 'selected';
      }
      if (province === item?.name) {
        status = 'selected';
      }
      label = item.name;
      break;
    }
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
      if (id === item?.id) {
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
  return { label, status };
}

const ModalSelection: React.FC<Props> = ({
  type,
  open,
  onCloseModalSelection,
  params,
}) => {
  const { listSelection, selectedItem, loadMoreSelection } =
    useTextFieldSelect();
  const [tempSelectedItem, setTempSelectedItem] =
    React.useState<any>(selectedItem);

  function handleLoadMore() {
    const {
      data: { data, meta },
      isLoadMoreLoading,
    } = listSelection || {};
    if (data?.length < meta?.total && !isLoadMoreLoading) {
      loadMoreSelection({
        type,
        meta: { page: meta?.page + 1 },
        params,
      });
    }
  }

  return (
    <SnbBottomSheet
      isSwipeable
      open={open}
      title={setTitle(type)}
      closeAction={() => onCloseModalSelection()}
      actionIcon="close"
      size="halfscreen"
      content={
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={listSelection.data?.data}
              keyExtractor={(_, idx) => idx.toString()}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={1}
              ItemSeparatorComponent={() => (
                <View style={{ height: 1, backgroundColor: color.black10 }} />
              )}
              renderItem={({ item, index }) => {
                const { label, status } = handleRadioButtonStatus(
                  type,
                  item,
                  tempSelectedItem,
                );
                return (
                  <TouchableOpacity
                    onPress={() => setTempSelectedItem({ item, type })}
                    style={{
                      paddingVertical: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ flex: 1 }}>
                      <SnbText.B1>
                        {index + 1}. {label}
                      </SnbText.B1>
                    </View>
                    <View style={{ marginHorizontal: 4 }} />
                    <SnbRadioButton
                      onPress={() => setTempSelectedItem({ item, type })}
                      status={status}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {listSelection.isLoadMoreLoading && <SnbProgress />}
          <View style={{ height: 72 }}>
            <SnbButton.Single
              title={setTitle(type)}
              onPress={() => onCloseModalSelection(tempSelectedItem)}
              disabled={tempSelectedItem === null}
              type="primary"
            />
          </View>
        </View>
      }
    />
  );
};

export default ModalSelection;
