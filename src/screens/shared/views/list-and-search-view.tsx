import { useNavigation, useRoute } from '@react-navigation/native';
import { useTextFieldSelect } from '@screen/auth/functions';
import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View, Image } from 'react-native';
import {
  SnbContainer,
  SnbText2,
  SnbTopNav2,
  colorV2,
  SnbProgress,
} from 'react-native-sinbad-ui';

function setPlaceholder(type: string) {
  switch (type) {
    case 'listBank':
      return 'Cari Nama Bank';
    default:
      return 'Cari di Sinbad';
  }
}

const ListAndSearchView = () => {
  const { goBack } = useNavigation();
  const { params }: any = useRoute();
  const { getSelection, listSelection, selectedItem, onSelectedItem } =
    useTextFieldSelect();
  const [search, setSearch] = useState('');
  const [clearSearch, setClearSearch] = useState(false);

  React.useEffect(() => {
    const data = {
      ...params,
      meta: { ...params.meta, keyword: search },
    };
    getSelection(data);
  }, []);

  React.useEffect(() => {
    if (selectedItem !== null) {
      goBack();
    }
  }, [selectedItem]);

  const searchData = () => {
    const data = {
      type: params.type,
      params: params.params,
      meta: { keyword: search, limit: 100 },
    };
    getSelection(data);
  };

  useEffect(() => {
    if (search === '' && clearSearch) {
      searchData();
      setClearSearch(false);
    }
  }, [clearSearch]);

  const renderEmpty = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{ height: 180, width: undefined, aspectRatio: 1 / 1 }}
          source={require('../../../assets/images/sinbad_image/cry_sinbad.png')}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 16,
          }}>
          <SnbText2.Body.Default>Data tidak ditemukan</SnbText2.Body.Default>
        </View>
      </View>
    );
  };

  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type6
        color="white"
        placeholder={setPlaceholder(params.type)}
        onEnter={() => searchData()}
        backAction={goBack}
        onClearText={() => {
          setSearch('');
          setClearSearch(true);
        }}
        onChangeText={(text) => setSearch(text)}
        inputValue={search}
      />

      <FlatList
        data={listSelection.data?.data}
        keyExtractor={(el, index) => index.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent:
            listSelection.data?.data?.length === 0 || listSelection.error
              ? 'center'
              : 'flex-start',
        }}
        ListEmptyComponent={() => {
          const { data, error } = listSelection;
          if (data?.length === 0 || error) {
            return renderEmpty();
          } else {
            return (
              <View style={{ marginVertical: 48 }}>
                <SnbProgress size={40} />
                <View style={{ marginVertical: 8 }} />
              </View>
            );
          }
        }}
        renderItem={({ item, index }) => {
          const backgroundColor =
            index % 2 === 0 ? colorV2.bgColor.light : colorV2.bgColor.neutral;
          return (
            <TouchableOpacity
              style={{ padding: 16, backgroundColor }}
              onPress={() => onSelectedItem({ item, type: params?.type })}>
              <SnbText2.Paragraph.Default>
                {item?.amount || item?.name}
              </SnbText2.Paragraph.Default>
            </TouchableOpacity>
          );
        }}
      />
    </SnbContainer>
  );
};

export default ListAndSearchView;
