/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import {
  Image,
  View,
  StyleProp,
  ViewStyle,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {
  color,
  SnbButton,
  SnbIcon,
  SnbSKUList,
  SnbText,
  styles,
  SnbIconHint,
} from 'react-native-sinbad-ui';
import moment from 'moment';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { QuestListStyles } from '../styles';

interface QuestCardProps {
  id: number;
  title: string;
  image: string;
  endDate: string;
  currentTask: number;
  totalTask: number;
  status: string;
  onCardPress?: () => void;
}

/** === COMPONENT === */
export const QuestCard: FC<QuestCardProps> = ({
  id,
  title,
  image,
  endDate,
  currentTask,
  totalTask,
  status,
  onCardPress,
}) => {
  /** => render floating date */
  const renderFloatingDate = (date: string) => {
    return (
      <View style={QuestListStyles.floatingDate}>
        <SnbIconHint
          iconName={'schedule'}
          size={16}
          iconColor={color.black100}
          badgeColor={'yellow'}
        />
        <SnbText.C2>{moment(date).format('DD MMMM YYYY')}</SnbText.C2>
      </View>
    );
  };
  /** => render progress bar */
  const renderProgressBar = () => {
    const progress = currentTask === 0 ? 10 : (currentTask / totalTask) * 100;
    return (
      <View>
        <View style={QuestListStyles.fullBar}>
          <View
            style={[
              QuestListStyles.progressBar,
              {
                width: `${progress}%`,
              },
            ]}
          />
        </View>
        <View style={{ marginTop: 4 }}>
          {currentTask === totalTask ? (
            <SnbText.B3>Silakan klaim voucher Anda</SnbText.B3>
          ) : (
            <SnbText.B3>{`${currentTask} dari ${totalTask} tahap selesai`}</SnbText.B3>
          )}
        </View>
      </View>
    );
  };

  /** => render button */
  const renderButton = () => {
    let buttonText;

    if (currentTask === 0) {
      buttonText = 'Mulai';
    } else if (currentTask < totalTask) {
      buttonText = 'Lanjut';
    } else if (currentTask === totalTask) {
      buttonText = 'Klaim';
    }

    if (currentTask === totalTask) {
      return (
        <TouchableOpacity
          style={QuestListStyles.cardButton}
          onPress={() => null}>
          <SnbText.B4>{buttonText}</SnbText.B4>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={QuestListStyles.cardButton}
          onPress={() => onCardPress}>
          <SnbText.B4>{buttonText}</SnbText.B4>
        </TouchableOpacity>
      );
    }
  };

  return (
    <Pressable onPress={onCardPress}>
      <Image source={{ uri: image }} style={QuestListStyles.cardImage} />
      <View style={[QuestListStyles.cardMainContent]}>
        <View style={QuestListStyles.floatingDateContainer}>
          {renderFloatingDate(endDate)}
        </View>
        <SnbText.H4>{title}</SnbText.H4>
        <View style={QuestListStyles.cardBottomContent}>
          <View style={QuestListStyles.progressBarContainer}>
            {renderProgressBar()}
          </View>
          {renderButton()}
        </View>
      </View>
    </Pressable>
  );
};
