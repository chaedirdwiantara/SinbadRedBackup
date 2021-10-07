/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
import { goBack } from '../functions';
/** === COMPONENT === */
const BannerDetailView: React.FC = () => {
  /** === HOOK === */
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Banner Detail'}
        backAction={() => goBack()}
      />
    );
  };
  /** => content */
  const content = () => {
    return <SnbText.B1>This page for Detail Banner</SnbText.B1>;
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {content()}
    </SnbContainer>
  );
};

export default BannerDetailView;
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
