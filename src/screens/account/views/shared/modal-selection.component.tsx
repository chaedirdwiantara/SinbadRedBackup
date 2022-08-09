import React from 'react';
import {
  colorV2,
  FooterButton,
  SnbBottomSheet2,
  SnbBottomSheetPart,
  SnbIcon,
  SnbProgress,
  SnbText2,
  spacingV2 as layout,
} from '@sinbad/react-native-sinbad-ui';
import { FlatList, LogBox, TouchableOpacity, View } from 'react-native';
import * as models from '@models';
import { useTextFieldSelect } from '@screen/auth/functions';
import { IRadioButton } from '@sinbad/react-native-sinbad-ui/lib/typescript/models/RadioButtonTypes';
import ErrorContent from './error-content.component';
import { testProps } from '@core/functions/global/test-props';
import { camelize } from '@core/functions/global/camelize';
interface Props {
  ref: any;
  type: models.ITypeList;
  onCloseModalSelection: (result?: any) => void;
  params?: string;
  testID?: string
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

const ModalSelection: React.FC<Props> = React.forwardRef(({
  type,
  onCloseModalSelection,
  params,
  testID
}, ref: any) => {
  const { listSelection, selectedItem, loadMoreSelection, getSelection } =
    useTextFieldSelect();
  const [tempSelectedItem, setTempSelectedItem] = React.useState<any>(null);

  LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.'])
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
    <SnbBottomSheet2
      ref={ref}
      type="m-l"
      snap={false}
      name={`modal-selection-${type}`}
      title={
        <SnbBottomSheetPart.Title title={setTitle(type)} titleType="center" />
      }
      navigation={
        <SnbBottomSheetPart.Navigation
          iconRight1Name="x"
          onRight1Action={() => {
            onCloseModalSelection();
            setTempSelectedItem(null);
          }}
        />
      }
      close={() => {
        onCloseModalSelection();
        setTempSelectedItem(null);
      }}
      button={
        <FooterButton.Single
          testID={testID}
          title={setTitle(type)}
          buttonPress={() => {
            onCloseModalSelection(tempSelectedItem);
            setTempSelectedItem(null);
          }}
          disabled={tempSelectedItem === null || listSelection.data === null}
        />
      }
      content={
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <FlatList
              ListEmptyComponent={() => {
                if (listSelection.loading) {
                  return (
                    <View style={{ padding: layout.spacing.lg }}>
                      <SnbProgress />
                    </View>
                  );
                }
                if (listSelection.error) {
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
                    {...testProps(`btn-${camelize(label)}.${testID}`)}
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
                    <SnbIcon
                      name={
                        status === 'selected'
                          ? 'radio_button'
                          : 'radio_button_outline'
                      }
                      size={22}
                      color={
                        status === 'selected'
                          ? colorV2.iconColor.red
                          : colorV2.iconColor.default
                      }
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {listSelection.isLoadMoreLoading && <SnbProgress />}
        </View>
      }
    />
  );
});

export default ModalSelection;
