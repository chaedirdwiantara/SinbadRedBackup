/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
import { goBack, goToBannerDetail } from '../functions';
/** === COMPONENT === */
const BannerView: React.FC = () => {
  /** === HOOK === */
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Brand List'}
        backAction={() => goBack()}
      />
    );
  };
  /** => content */
  const content = () => {
    return <SnbText.B1>This page for list of brand</SnbText.B1>;
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {content()}
      <TouchableOpacity onPress={() => goToBannerDetail()}>
        <SnbText.B1>Go To Banner Detail</SnbText.B1>
      </TouchableOpacity>
    </SnbContainer>
  );
};

export default BannerView;
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
