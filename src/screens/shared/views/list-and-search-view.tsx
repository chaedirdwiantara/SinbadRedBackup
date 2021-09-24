import { useNavigation, useRoute } from '@react-navigation/native';
import { useTextFieldSelect } from '@screen/auth/functions';
import React from 'react';
import { FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import {
  SnbContainer,
  SnbText,
  SnbTopNav,
  color,
} from 'react-native-sinbad-ui';

const ListAndSearchView = () => {
  const { goBack } = useNavigation();
  const { params }: any = useRoute();
  const { getSelection, listSelection, selectedItem, onSelectedItem } =
    useTextFieldSelect();

  React.useEffect(() => {
    getSelection(params?.type);
  }, []);

  React.useEffect(() => {
    if (selectedItem !== null) {
      goBack();
    }
  }, [selectedItem]);

  return (
    <SnbContainer color="white">
      <SafeAreaView style={{ flex: 1 }}>
        <SnbTopNav.Type7
          type="red"
          placeholder="Pilih jumlah karyawan"
          enter={() => {}}
          backAction={goBack}
          clearText={() => {}}
          onChangeText={() => {}}
        />
        <FlatList
          data={listSelection.data}
          keyExtractor={(el, index) => index.toString()}
          renderItem={({ item, index }) => {
            const backgroundColor =
              index % 2 === 0 ? color.black5 : color.white;
            return (
              <TouchableOpacity
                style={{ padding: 16, backgroundColor }}
                onPress={() => onSelectedItem({ item, type: params?.type })}>
                <SnbText.B3>{item?.amount || item?.name}</SnbText.B3>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </SnbContainer>
  );
};

export default ListAndSearchView;
