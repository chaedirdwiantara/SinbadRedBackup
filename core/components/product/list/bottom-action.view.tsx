/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { SnbBottomActions } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
/** === COMPONENT === */
const BottomActionView: React.FC = () => {
  /** === HOOK === */
  //   const [selected, setSelected] = useState(0);
  //   const changeTab = (item: number) => {
  //     setSelected(item);
  //   };
  const goTo = (item: number) => {
    console.log(item);
  };
  /** === VIEW === */
  /** => main */
  return (
    <SnbBottomActions
      item={[
        { iconName: 'sort', title: 'Urutkan', dotShow: true },
        { iconName: 'filter_list', title: 'Filter' },
        { iconName: 'view_list', title: 'List' },
        { iconName: 'category', title: 'Kategory' },
      ]}
      onPress={goTo}
    />
  );
};

export default BottomActionView;
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
