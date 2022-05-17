import React, { FC } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { spacingV2 as layout } from '@sinbad/react-native-sinbad-ui';

interface BannerCardProps {
  imageUrl: string;
  onPress: () => void;
  height?: number;
}

export const BannerCard: FC<BannerCardProps> = ({
  imageUrl,
  onPress,
  height = 85,
}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: layout.spacing.lg,
        marginBottom: layout.spacing.xl,
      }}
      onPress={onPress}>
      <Image
        source={{ uri: imageUrl }}
        style={{ height, width: '100%', resizeMode: 'cover' }}
      />
    </TouchableOpacity>
  );
};
