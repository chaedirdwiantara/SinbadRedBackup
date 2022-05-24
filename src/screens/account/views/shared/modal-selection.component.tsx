import React from 'react';
import {
  colorV2,
  SnbBottomSheet,
  SnbButton2,
  SnbProgress,
  SnbRadioButton,
  SnbText2,
  spacingV2 as layout,
} from '@sinbad/react-native-sinbad-ui';
import { FlatList, TouchableOpacity, View } from 'react-native';
import * as models from '@models';
import { useTextFieldSelect } from '@screen/auth/functions';
import { IRadioButton } from '@sinbad/react-native-sinbad-ui/lib/typescript/models/RadioButtonTypes';
import ErrorContent from './error-content.component';

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
  const { id, city, district, province } = selectedItem?.item || {};
  switch (type) {
    case 'listProvince': {
      if (province === item?.province) {
        status = 'selected';
      }
      label = item.province;
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
    case 'listVehicleAccessAmount': {
      if (id === item?.id) {
        status = 'selected';
      }
      label = `${item.value} Kendaraan`;
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
  const { listSelection, selectedItem, loadMoreSelection, getSelection } =
    useTextFieldSelect();
  const [tempSelectedItem, setTempSelectedItem] = React.useState<any>(null);

  React.useEffect(() => {
    setTempSelectedItem(selectedItem);
  }, [selectedItem]);

  function handleLoadMore() {
    const {
      data: { meta },
      isLoadMoreLoading,
    } = listSelection || {};
    if (meta?.page < meta?.totalPage && !isLoadMoreLoading) {
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
              ListEmptyComponent={() => {
                if (listSelection.loading) {
                  return <SnbProgress />;
                }
                if (listSelection.error?.message) {
                  return (
                    <ErrorContent
                      action={() => getSelection({ type, params })}
                      message={
                        listSelection.error?.message || 'Terjadi kesalahan'
                      }
                    />
                  );
                }
                return null;
              }}
              data={listSelection.data?.data}
              keyExtractor={(_, idx) => idx.toString()}
              contentContainerStyle={{ paddingHorizontal: layout.spacing.lg }}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={1}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    backgroundColor: colorV2.strokeColor.default,
                  }}
                />
              )}
              renderItem={({ item }) => {
                const { label, status } = handleRadioButtonStatus(
                  type,
                  item,
                  tempSelectedItem,
                );
                return (
                  <TouchableOpacity
                    onPress={() => setTempSelectedItem({ item, type })}
                    style={{
                      paddingVertical: layout.spacing.lg,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ flex: 1 }}>
                      <SnbText2.Paragraph.Default>
                        {label}
                      </SnbText2.Paragraph.Default>
                    </View>
                    <View style={{ marginHorizontal: layout.spacing.sm }} />
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
          <View style={{ padding: layout.spacing.lg }}>
            <SnbButton2.Primary
              title={setTitle(type)}
              onPress={() => onCloseModalSelection(tempSelectedItem)}
              disabled={
                tempSelectedItem === null || listSelection.data === null
              }
              full
              size="medium"
            />
          </View>
        </View>
      }
    />
  );
};

export default ModalSelection;
