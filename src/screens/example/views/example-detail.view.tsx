/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { CoreContext } from '@context';
import { goBack, useExampleDetailAction } from '../functions';
/** === COMPONENT === */
const ExampleDetailView: React.FC = () => {
  /** === HOOK === */
  const { stateExample, dispatchExample } = React.useContext(CoreContext);
  const exampleDetailAction = useExampleDetailAction();
  const exampleState = stateExample.detail;
  /** => effect */
  React.useEffect(() => {
    return () => {
      exampleDetailAction.reset(dispatchExample);
    };
  }, []);
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Example Detail'}
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

export default ExampleDetailView;
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
