/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbBottomActions,
  SnbTabs,
} from 'react-native-sinbad-ui';
import { goBack, useTabCategory } from '../functions';
/** === IMPORT EXTERNAL COMPONENT HERE === */
/** === COMPONENT === */
const ProductTabView: React.FC = () => {
  /** === HOOK === */
  const { categories, activeTabs, changeTab } = useTabCategory();
  /** === VIEW === */
  /** => main */
  return (
    <View>
      <SnbTabs.Scrollable
        tabs={categories}
        activeTabs={activeTabs}
        onChangeActiveTabs={(index) => changeTab(index)}
      />
    </View>
  );
};

export default ProductTabView;
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
