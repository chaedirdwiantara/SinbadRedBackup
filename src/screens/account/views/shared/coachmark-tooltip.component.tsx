import React from 'react';
import { Dimensions, View } from 'react-native';
import { SnbText2, SnbButton2, color } from 'react-native-sinbad-ui';
import { CopilotTooltipProps } from 'react-native-copilot';
import { useCoachmark } from '@screen/account/functions';
import * as models from '@models';
import { useDataAuth } from '@core/redux/Data';

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
    const { meV2 } = useDataAuth();
    const {
      updateCoachmarkState,
      updateCoachmark,
      resetCoachmark,
      getCoachmark,
    } = useCoachmark();

    React.useEffect(() => {
      if (updateCoachmarkState?.data) {
        getCoachmark();
        resetCoachmark();
        handleStop();
      }
    }, [updateCoachmarkState]);

    React.useEffect(() => {
      if (
        typeof meV2.data?.data?.isDataCompleted === 'boolean' &&
        meV2.data?.data?.isDataCompleted === true &&
        action === 'homeCoachmark'
      ) {
        totalCoachMark = 3;
      }
    }, [meV2]);
    return (
      <View style={{ flex: 1, borderRadius: 16, paddingBottom: 16 }}>
        <SnbText2.Body.Large>{currentStep.name}</SnbText2.Body.Large>
        <View style={{ marginVertical: 4 }} />
        <SnbText2.Paragraph.Default>{currentStep.text}</SnbText2.Paragraph.Default>
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
                <SnbButton2.Link
                  size="small"
                  title="Kembali"
                  onPress={handlePrev}
                />
                <View style={{ marginHorizontal: 2 }} />
              </>
            )}
            <SnbButton2.Primary
              size="small"
              loading={updateCoachmarkState.loading}
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
