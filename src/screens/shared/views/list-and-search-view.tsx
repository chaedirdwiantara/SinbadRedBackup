import { useNavigation, useRoute } from '@react-navigation/native';
import { useTextFieldSelect } from '@screen/auth/functions';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
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

  React.useEffect(() => {
    const data = {
      type: params.type,
      params: params.params,
      meta: { keyword: search },
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
      meta: { keyword: search },
    };
    getSelection(data);
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
            clearText={() => setSearch('')}
            onChangeText={(text) => setSearch(text)}
            value={search}
          />
        )}

        <FlatList
          data={listSelection.data}
          keyExtractor={(el, index) => index.toString()}
          ListEmptyComponent={() => {
            const { data, error } = listSelection;
            if (data?.length === 0 || error) {
              return (
                <SnbText.B3 color={color.red70}>Tidak Ada Data</SnbText.B3>
              );
            }
            return (
              <View style={{ marginVertical: 48 }}>
                <SnbProgress />
                <View style={{ marginVertical: 8 }} />
                <SnbText.B3 align="center">Memuat Data...</SnbText.B3>
              </View>
            );
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
