import React, { useEffect } from 'react';
import {
  colorV2,
  SnbContainer,
  SnbProgress,
  SnbRadioButton,
  SnbText2,
  SnbTextField2,
  SnbTopNav2,
  spacingV2 as layout,
  borderV2,
} from '@sinbad/react-native-sinbad-ui';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { renderIF, useInput } from '@screen/auth/functions';
import * as models from '@models';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ErrorContent } from '../shared';
import { BUYER_CATEGORY_VIEW } from '@screen/account/functions/screens_name';
import { useEasyRegistration } from '@screen/account/functions';

const Content: React.FC = () => {
  const search = useInput('', 'string-only');
  const [selectedLocation, setSelectedLocation] =
    React.useState<models.ISearchLocationsData | null>(null);
  const {
    searchLocation,
    searchLocationState,
    loadMoreSearchLocation,
    resetSearchLocation,
  } = useEasyRegistration();
  const { replace, goBack }: any = useNavigation();
  const { params }: any = useRoute();

  useEffect(() => {
    resetSearchLocation();
  }, []);

  useEffect(() => {
    if (search.value?.length > 1) {
      searchLocation(search.value);
    }
  }, [search.value]);

  useEffect(() => {
    if (selectedLocation) {
      if (params?.setLocation) {
        params.setLocation(selectedLocation);
        goBack();
      } else {
        replace(BUYER_CATEGORY_VIEW, { selectedLocation });
      }
    }
  }, [selectedLocation]);

  function renderLocation({ item }: any) {
    const { city, district, urban } = item;
    const locationName = `${city}, ${district}, ${urban}`;

    return (
      <TouchableOpacity
        onPress={() => setSelectedLocation(item)}
        style={{
          paddingVertical: layout.spacing.lg,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{ flex: 1 }}>
          <SnbText2.Body.Default>{locationName}</SnbText2.Body.Default>
        </View>
        <View style={{ marginHorizontal: layout.spacing.xxsm }} />
        <SnbRadioButton
          onPress={() => setSelectedLocation(item)}
          status={selectedLocation?.id === item.id ? 'selected' : 'unselect'}
        />
      </TouchableOpacity>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: layout.spacing.lg }}>
        <SnbTextField2.Text
          {...search}
          placeholder="Cari Kota/Kabupaten, Kec. dan Kelurahan"
          prefixIconName="search"
        />
      </View>
      <View style={{ flex: 1 }}>
        {renderIF(
          searchLocationState?.loading,
          <SnbProgress />,
          <FlatList
            data={searchLocationState.data?.data || []}
            contentContainerStyle={{ paddingHorizontal: layout.spacing.lg }}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={renderLocation}
            onEndReached={() => {
              const { meta, isLoadMoreLoading } = searchLocationState.data;
              if (meta?.page < meta?.totalPage && !isLoadMoreLoading) {
                loadMoreSearchLocation(
                  search.value,
                  searchLocationState.data?.meta?.page + 1,
                  searchLocationState.data?.meta?.perPage,
                );
              }
            }}
            onEndReachedThreshold={0.1}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 0.5,
                  backgroundColor: colorV2.strokeColor.disable,
                }}
              />
            )}
            ListEmptyComponent={() => {
              if (searchLocationState?.error) {
                return (
                  <ErrorContent
                    message={searchLocationState?.error?.message}
                    action={() => search.value && searchLocation(search.value)}
                  />
                );
              }
              return null;
            }}
            ListFooterComponent={() => {
              if (searchLocationState?.isLoadMoreLoading) {
                return <SnbProgress />;
              }
              return null;
            }}
          />,
        )}
      </View>
      <View
        style={{
          marginHorizontal: layout.spacing.lg,
          marginBottom: layout.spacing.md,
          marginTop: layout.spacing.sm,
          backgroundColor: colorV2.special.blue10,
          padding: layout.spacing.md,
          borderRadius: borderV2.radius.sm,
        }}>
        <SnbText2.Paragraph.Small color={colorV2.textColor.link} align="center">
          Gunakan fitur pencarian jika lokasi Anda tidak ada pada daftar di
          atas.
        </SnbText2.Paragraph.Small>
      </View>
    </View>
  );
};

const ListLocationView: React.FC = () => {
  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type1 title="Lokasi Toko" color="white" />
      <Content />
    </SnbContainer>
  );
};

export default ListLocationView;
