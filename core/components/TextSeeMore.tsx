/** === IMPORT LIB HERE === */
import React, { FC } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === INTERFACE === */
interface Props {
  testID?: string;
  content: React.ReactNode;
  maxLine: number;
  toggleShowLess?: string;
  toggleShowMore?: string;
  toggleColor?: string;
  containerStyle?: {} | [];
}
/** === COMPONENT === */
const SnbTextSeeMore: FC<Props> = (props) => {
  const [isShowAll, setShowAll] = React.useState(false);
  const [isShowToggle, setShowToggle] = React.useState(false);

  const handleToggleShow = () => {
    setShowAll(!isShowAll);
  };

  return (
    <View testID={props.testID} style={props.containerStyle}>
      <Text
        numberOfLines={isShowAll ? undefined : props.maxLine}
        ellipsizeMode={'tail'}
        onTextLayout={({ nativeEvent: { lines } }) => {
          if (lines.length > props.maxLine) {
            setShowToggle(true);
          }
        }}>
        {props.content}
      </Text>
      {isShowToggle ? (
        <TouchableOpacity
          onPress={() => handleToggleShow()}
          style={{ marginTop: 8 }}>
          <SnbText.B1 color={props.toggleColor}>
            {isShowAll ? props.toggleShowLess : props.toggleShowMore}
          </SnbText.B1>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};
/** === DEFAULT PROPS === */
SnbTextSeeMore.defaultProps = {
  testID: '',
};
/** === EXPORT COMPONENT === */
export default SnbTextSeeMore;
