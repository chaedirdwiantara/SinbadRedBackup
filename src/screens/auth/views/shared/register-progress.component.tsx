import React from 'react';
import { View } from 'react-native';
import { color, SnbText } from 'react-native-sinbad-ui';

const ALL_STEP = [1, 2, 3, 4, 5, 6, 7];

interface Props {
  title: string;
  step: number;
}

const RegisterProgress: React.FC<Props> = (props: Props) => {
  const { step, title } = props;
  return (
    <View style={{ margin: 16 }}>
      <SnbText.B4>{`${step}/${ALL_STEP.length} ${title}`}</SnbText.B4>
      <View style={{ marginVertical: 4 }} />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: color.black10,
          borderRadius: 8,
          overflow: 'hidden',
        }}>
        {ALL_STEP.map((index) => {
          if (step >= index) {
            return (
              <View
                key={index}
                style={{
                  height: 8,
                  flex: 1,
                  backgroundColor: color.red60,
                  borderTopRightRadius: step === index ? 8 : 0,
                  borderBottomRightRadius: step === index ? 8 : 0,
                }}
              />
            );
          }
          return <View key={index} style={{ flex: 1 }} />;
        })}
      </View>
    </View>
  );
};

export default RegisterProgress;
