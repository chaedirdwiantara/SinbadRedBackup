import React from 'react';
import { SnbContainer, SnbText } from '@sinbad/react-native-sinbad-ui';
import { View } from 'react-native';

const BuyerCategoryView: React.FC = () => {
  return (
    <SnbContainer color="white">
      <View>
        <SnbText.H1>Buyer Category</SnbText.H1>
      </View>
    </SnbContainer>
  );
};

export default BuyerCategoryView;
