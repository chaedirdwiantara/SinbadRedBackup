/** === IMPORT PACKAGES ===  */
import React from 'react';
import { View } from 'react-native';
import { SnbText, SnbChipsSlider } from 'react-native-sinbad-ui';
/** === TYPE === */
interface TagListProps {
  tags: Array<string>;
  onTagPress: (keywords: Array<string>) => void;
}
/** === COMPONENT === */
const TagView: React.FC<TagListProps> = ({ tags, onTagPress }) => {
  /** === VIEW === */
  /** => Tag Slider */
  const renderTagSlider = () => (
    <View style={{ flex: 1, paddingLeft: 8 }}>
      <SnbChipsSlider chipsList={tags} parentFunction={onTagPress} />
    </View>
  );
  /** => Total Product */
  const renderTotalProduct = () => (
    <View style={{ justifyContent: 'center', marginRight: 8 }}>
      <SnbText.B4>1200 Produk</SnbText.B4>
    </View>
  );
  /** => Main */
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: 16,
      }}>
      {renderTotalProduct()}
      {renderTagSlider()}
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
 * updatedBy: aliisetia
 * updatedDate: 14-10-21
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
