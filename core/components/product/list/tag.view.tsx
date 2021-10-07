/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbBottomActions,
  SnbTabs,
  SnbChipsSlider,
} from 'react-native-sinbad-ui';
// import { goBack, useTag } from '../functions';
/** === IMPORT EXTERNAL COMPONENT HERE === */
/** === COMPONENT === */
const TagView: React.FC = () => {
  /** === HOOK === */
  //   const { tags, selectTab } = useTag();
  /** === VIEW === */
  /** => tag slider */
  const tagSlider = () => {
    return (
      <View style={{ flex: 1 }}>
        <SnbChipsSlider
          chipsList={[
            'test',
            'test2',
            'test3',
            'test',
            'test2',
            'test3',
            'test',
            'test2',
            'test3',
          ]}
          parentFunction={(item) => console.log(item)}
        />
      </View>
    );
  };
  /** => total product */
  const totalProduct = () => {
    return (
      <View style={{ justifyContent: 'center', paddingHorizontal: 16 }}>
        <SnbText.B1>1200 Produk</SnbText.B1>
      </View>
    );
  };
  /** => main */
  return (
    <View style={{ paddingVertical: 8, flexDirection: 'row' }}>
      {totalProduct()}
      {tagSlider()}
    </View>
  );
};

export default TagView;
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
