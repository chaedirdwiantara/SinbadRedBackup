/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import {
  goBack,
  goToExampleDetail,
  useExampleListAction,
  useExampleDetailAction,
} from '../functions';
import { useUserData } from '@screen/user/functions';
import { State } from 'react-native-gesture-handler';
/** === COMPONENT === */
const ExampleListView: React.FC = () => {
  /** === HOOK === */
  const exampleListAction = useExampleListAction();
  const exampleDetailAction = useExampleDetailAction();
  const { stateExample, dispatchExample } = React.useContext(
    contexts.ExampleContext,
  );
  const exampleState = stateExample.list;
  /** => effect */
  React.useEffect(() => {
    exampleListAction.list(dispatchExample);
    return () => {
      exampleListAction.reset(dispatchExample);
    };
  }, []);
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Example List'}
        backAction={() => goBack()}
      />
    );
  };
  /** => loading */
  const loading = () => {
    return exampleState.loading ? 'loading' : 'not loading';
  };
  /** => loading load more */
  const loadMore = () => {
    return exampleState.loadMore ? 'loading' : 'not loading';
  };
  /** => content */
  const content = () => {
    return (
      <>
        {exampleState.data.map((d, i) => {
          return (
            <View key={i}>
              <SnbText.B1>{d.name}</SnbText.B1>
            </View>
          );
        })}
      </>
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      <TouchableOpacity
        onPress={() => {
          exampleDetailAction.detail(dispatchExample, '1');
          goToExampleDetail();
        }}>
        <SnbText.B1>Go to Example Detail Page</SnbText.B1>
      </TouchableOpacity>
      <SnbText.B1>||</SnbText.B1>
      <SnbText.B1>||</SnbText.B1>
      {content()}
      <SnbText.B1>||</SnbText.B1>
      <SnbText.B1>||</SnbText.B1>
      <TouchableOpacity onPress={() => exampleListAction.list(dispatchExample)}>
        <SnbText.B1>Example List {loading()}</SnbText.B1>
      </TouchableOpacity>
      <SnbText.B1>||</SnbText.B1>
      <SnbText.B1>||</SnbText.B1>
      <TouchableOpacity
        onPress={() => exampleListAction.refresh(dispatchExample)}>
        <SnbText.B1>Refresh List</SnbText.B1>
      </TouchableOpacity>
      <SnbText.B1>||</SnbText.B1>
      <SnbText.B1>||</SnbText.B1>
      <TouchableOpacity
        onPress={() =>
          exampleListAction.loadMore(dispatchExample, exampleState)
        }>
        <SnbText.B1>LoadMore Example List {loadMore()}</SnbText.B1>
      </TouchableOpacity>
    </SnbContainer>
  );
};

export default ExampleListView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
