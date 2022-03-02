import React from 'react';
import { Dimensions, View } from 'react-native';
import { SnbText, SnbButton, color } from 'react-native-sinbad-ui';
import { CopilotTooltipProps } from 'react-native-copilot';
import { useCoachmark } from '@screen/account/functions';
import * as models from '@models';

const { width } = Dimensions.get('screen');

export const copilotOptions: any = (
  totalCoachMark: number,
  action: models.ICoachmarkAction,
) => {
  const Tooltip: React.FC<CopilotTooltipProps> = ({
    handleNext,
    currentStep,
    isLastStep,
    handleStop,
    handlePrev,
    isFirstStep,
  }) => {
    const { updateCoachmarkState, updateCoachmark, resetCoachmark } =
      useCoachmark();
    React.useEffect(() => {
      if (updateCoachmarkState?.data) {
        resetCoachmark();
        handleStop();
      }
    }, [updateCoachmarkState]);
    return (
      <View style={{ flex: 1, borderRadius: 16, paddingBottom: 16 }}>
        <SnbText.H4>{currentStep.name}</SnbText.H4>
        <View style={{ marginVertical: 4 }} />
        <SnbText.B1>{currentStep.text}</SnbText.B1>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {Array.from(Array(totalCoachMark).keys()).map((_, idx) => {
              return (
                <View
                  key={idx}
                  style={{
                    height: 8,
                    width: 8,
                    backgroundColor:
                      currentStep?.order - 1 === idx
                        ? color.red70
                        : color.black40,
                    marginRight: 4,
                    borderRadius: 8,
                  }}
                />
              );
            })}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {!isFirstStep && !isLastStep && (
              <>
                <SnbButton.Dynamic
                  size="small"
                  buttonColor={color.blue60}
                  type="tertiary"
                  title="Kembali"
                  onPress={handlePrev}
                />
                <View style={{ marginHorizontal: 2 }} />
              </>
            )}
            <SnbButton.Dynamic
              size="small"
              loading={updateCoachmarkState.loading}
              type="primary"
              title={isLastStep ? 'Selesai' : 'Lanjut'}
              onPress={() => {
                if (isLastStep) {
                  updateCoachmark(action);
                } else {
                  handleNext();
                }
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return {
    animated: true,
    overlay: 'view',
    tooltipComponent: Tooltip,
    tooltipStyle: {
      borderRadius: 12,
      width: width - 16,
    },
    stepNumberComponent: () => <View />,
  };
};
