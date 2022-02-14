import React, { useEffect } from 'react';
import {
  color,
  SnbContainer,
  SnbProgress,
  SnbRadioButton,
  SnbText,
  SnbTextField,
  SnbTopNav,
} from '@sinbad/react-native-sinbad-ui';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { renderIF, useInput } from '@screen/auth/functions';
import { useEasyRegistration } from '@screen/auth/functions/easy-registration-hooks';
import * as models from '@models';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BUYER_CATEGORY_VIEW } from '@screen/auth/functions/screens_name';

const Content: React.FC = () => {
  const search = useInput();
  const [selectedLocation, setSelectedLocation] =
    React.useState<models.ISearchLocationsData | null>(null);
  const { searchLocation, searchLocationState } = useEasyRegistration();
  const { replace, goBack }: any = useNavigation();
  const { params }: any = useRoute();

  useEffect(() => {
    if (search.value) {
      searchLocation(search.value);
    }
  }, [search.value]);

  useEffect(() => {
    if (selectedLocation) {
      if (params?.setLocation) {
        params?.setLocation(selectedLocation);
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
          paddingVertical: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{ flex: 1 }}>
          <SnbText.B1>{locationName}</SnbText.B1>
        </View>
        <View style={{ marginHorizontal: 4 }} />
        <SnbRadioButton
          onPress={() => setSelectedLocation(item)}
          status={selectedLocation?.id === item.id ? 'selected' : 'unselect'}
        />
      </TouchableOpacity>
    );
  }
  return (
    <View style={{ flex: 1, borderTopWidth: 1, borderColor: color.black10 }}>
      <View style={{ padding: 16 }}>
        <SnbTextField.Text
          {...search}
          placeholder="Cari Kota/Kabupaten, Kec. atau Desa"
          prefixIconName="search"
        />
      </View>
      <View style={{ flex: 1 }}>
        {renderIF(
          searchLocationState?.loading,
          <SnbProgress />,
          <FlatList
            data={searchLocationState?.data}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={renderLocation}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: color.black10 }} />
            )}
          />,
        )}
      </View>
      <View
        style={{
          marginHorizontal: 16,
          marginBottom: 12,
          marginTop: 8,
          backgroundColor: color.blue10,
          padding: 12,
          borderRadius: 8,
        }}>
        <SnbText.B3 color={color.blue50} align="center">
          Tidak menemukan yang anda cari, gunakan pencarian secara rinci untuk
          lokasi toko anda
        </SnbText.B3>
      </View>
    </View>
  );
};

const ListLocationView: React.FC = () => {
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type1 title="Lokasi Toko" type="white" />
      <Content />
    </SnbContainer>
  );
};

export default ListLocationView;
