import { useNavigation, useRoute } from '@react-navigation/native';
import { useTextFieldSelect } from '@screen/auth/functions';
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {
  SnbContainer,
  SnbText,
  SnbTopNav,
  color,
  SnbProgress,
} from 'react-native-sinbad-ui';

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
          <SnbText.B2>Data tidak ditemukan</SnbText.B2>
        </View>
      </View>
    );
  };

  return (
    <SnbContainer color="white">
      <SafeAreaView style={{ flex: 1 }}>
        {params.type === 'listNumOfEmployee' ? (
          <SnbTopNav.Type3
            type="red"
            backAction={goBack}
            title={'Jumlah Karyawan'}
          />
        ) : (
          <SnbTopNav.Type7
            type="red"
            placeholder="Pilih jumlah karyawan"
            enter={() => searchData()}
            backAction={goBack}
            clearText={() => {
              setSearch('');
              setClearSearch(true);
            }}
            onChangeText={(text) => setSearch(text)}
            value={search}
          />
        )}

        <FlatList
          data={listSelection.data}
          keyExtractor={(el, index) => index.toString()}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent:
              listSelection.data?.length === 0 || listSelection.error
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
              index % 2 === 0 ? color.black5 : color.white;
            return (
              <TouchableOpacity
                style={{ padding: 16, backgroundColor }}
                onPress={() => onSelectedItem({ item, type: params?.type })}>
                <SnbText.B3>
                  {item?.amount ||
                    item?.name ||
                    item?.city ||
                    item?.district ||
                    item?.urban}
                </SnbText.B3>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </SnbContainer>
  );
};

export default ListAndSearchView;
