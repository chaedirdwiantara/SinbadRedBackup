/** === IMPORT LIB HERE === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbProgress } from 'react-native-sinbad-ui';
/** === INTERFACE === */
interface Props {
  testID?: string;
}
/** === COMPONENT === */
const LoadingPage: FC<Props> = (props) => {
  return (
    <View
      testID={props.testID}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SnbProgress size={40} />
    </View>
  );
};
/** === DEFAULT PROPS === */
LoadingPage.defaultProps = {
  testID: '',
};
/** === EXPORT COMPONENT === */
export default LoadingPage;
