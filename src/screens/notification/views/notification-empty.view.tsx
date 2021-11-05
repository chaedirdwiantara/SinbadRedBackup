/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { SnbContainer, SnbText } from 'react-native-sinbad-ui';
/** === STYLE === */
import NotificationEmptyStyle from '../styles/notification-empty.style';
/** === INTERFACE === */
interface NotificationEmptyProps {
  title: string;
  description: string;
}
/** === COMPONENT === */
const NotificationEmptyView: FC<NotificationEmptyProps> = (props) => {
  /** === VIEW === */
  const renderEmptyState = () => {
    return (
      <View style={NotificationEmptyStyle.boxEmpty}>
        <Image
          source={require('../../../assets/images/sinbad_image/empty_sinbad.png')}
          style={NotificationEmptyStyle.fullImage}
        />
        <View style={NotificationEmptyStyle.boxTitle}>
          <SnbText.H4 align="center">
            {props.title ? props.title : ''}
          </SnbText.H4>
        </View>
        <View style={NotificationEmptyStyle.boxDescription}>
          <SnbText.B3 align="center">
            {props.description ? props.description : ''}
          </SnbText.B3>
        </View>
      </View>
    );
  };
  /** => main */
  return <SnbContainer color="white">{renderEmptyState()}</SnbContainer>;
};

export default NotificationEmptyView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: bagaspp (team)
 * createDate: 22102021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
