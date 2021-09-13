import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';

const ListAndSearchView = () => {
  const { goBack } = useNavigation();
  const { params }: any = useRoute();
  const [search, setSearch] = React.useState('');

  console.log(search);

  React.useEffect(() => {
    setTimeout(() => {
      params?.setValue('This is from list and search');
      goBack();
    }, 2000);
  }, []);

  const handleOnChangeTextSearch = (text: string) => setSearch(text);
  const clearSearch = () => setSearch('');
  const handleOnEnter = () => {};

  return (
    <SnbContainer color="white">
      <SafeAreaView style={{ flex: 1 }}>
        <SnbTopNav.Type7
          type="red"
          placeholder="Pilih jumlah karyawan"
          enter={handleOnEnter}
          backAction={goBack}
          clearText={clearSearch}
          onChangeText={handleOnChangeTextSearch}
        />
      </SafeAreaView>
    </SnbContainer>
  );
};

export default ListAndSearchView;
