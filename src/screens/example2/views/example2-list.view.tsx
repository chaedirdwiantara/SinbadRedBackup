/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import {
  goBack,
  goToExample2Detail,
  useExample2ListAction,
  useExample2DetailAction,
} from '../functions';
/** === COMPONENT === */
const ExampleListView: React.FC = () => {
  /** === HOOK === */
  const exampleListAction = useExample2ListAction();
  const exampleDetailAction = useExample2DetailAction();
  const { stateExample2, dispatchExample2 } = React.useContext(
    contexts.Example2Context,
  );
  const exampleState = stateExample2.list;
  /** => effect */
  React.useEffect(() => {
    exampleListAction.list(dispatchExample2);
    return () => {
      exampleListAction.reset(dispatchExample2);
    };
  }, []);
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Example 2 List'}
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
          exampleDetailAction.detail(dispatchExample2, '1');
          goToExample2Detail();
        }}>
        <SnbText.B1>Go to Example 2 Detail Page</SnbText.B1>
      </TouchableOpacity>
      <SnbText.B1>||</SnbText.B1>
      <SnbText.B1>||</SnbText.B1>
      {content()}
      <SnbText.B1>||</SnbText.B1>
      <SnbText.B1>||</SnbText.B1>
      <TouchableOpacity
        onPress={() => exampleListAction.list(dispatchExample2)}>
        <SnbText.B1>Example 2 List {loading()}</SnbText.B1>
      </TouchableOpacity>
      <SnbText.B1>||</SnbText.B1>
      <SnbText.B1>||</SnbText.B1>
      <TouchableOpacity
        onPress={() => exampleListAction.refresh(dispatchExample2)}>
        <SnbText.B1>Refresh List</SnbText.B1>
      </TouchableOpacity>
      <SnbText.B1>||</SnbText.B1>
      <SnbText.B1>||</SnbText.B1>
      <TouchableOpacity
        onPress={() =>
          exampleListAction.loadMore(dispatchExample2, exampleState)
        }>
        <SnbText.B1>LoadMore Example 2 List {loadMore()}</SnbText.B1>
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
