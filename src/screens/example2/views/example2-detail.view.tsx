/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { CoreContext } from '@context';
import { goBack, useExample2DetailAction } from '../functions';
/** === COMPONENT === */
const Example2DetailView: React.FC = () => {
  /** === HOOK === */
  const { stateExample2, dispatchExample2 } = React.useContext(CoreContext);
  const exampleDetailAction = useExample2DetailAction();
  const exampleState = stateExample2.detail;
  /** => effect */
  React.useEffect(() => {
    return () => {
      exampleDetailAction.reset(dispatchExample2);
    };
  }, []);
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Example 2 Detail'}
        backAction={() => goBack()}
      />
    );
  };
  /** => content */
  const content = () => {
    return exampleState.loading ? (
      <SnbText.B1>detail loading</SnbText.B1>
    ) : (
      <SnbText.B1>{exampleState.data?.name}</SnbText.B1>
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {content()}
    </SnbContainer>
  );
};

export default Example2DetailView;
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
