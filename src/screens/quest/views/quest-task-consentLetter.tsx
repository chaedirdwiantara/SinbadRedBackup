/** === IMPORT PACKAGE HERE === */
import React, { FC, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  SnbContainer,
  SnbTopNav,
  SnbButton,
  SnbHtml,
  SnbCheckbox,
  SnbText,
} from 'react-native-sinbad-ui';
import LoadingPage from '@core/components/LoadingPage';
/** === IMPORT FUNCTIONS === */
import { goBack, useErrorModalState, useQuestTaskAction } from '../function';
import { useQuestContext } from 'src/data/contexts/quest/useQuestContext';
import { QuestDetailStyles } from '../styles';
import BottomSheetError from '@core/components/BottomSheetError';

/** === COMPONENT === */
const QuestTaskConsentLetterView: FC = ({ route }: any) => {
  /** === HOOK === */
  const questTaskErrorModal = useErrorModalState();
  const [checked, setChecked] = useState<'unselect' | 'selected'>('unselect');
  const { stateQuest, dispatchQuest } = useQuestContext();
  const questTaskDetailState = stateQuest.questTask.detail;
  const { update, detailTask } = useQuestTaskAction();
  useFocusEffect(
    React.useCallback(() => {
      detailTask(dispatchQuest, {
        id: route.params.taskId,
      });
    }, []),
  );

  useEffect(() => {
    if (stateQuest.questTask.detail.error !== null) {
      questTaskErrorModal.setOpen(true);
    }
  }, [questTaskErrorModal]);

  /** FUNCTION */

  const retryGetQuestTask = () => {
    questTaskErrorModal.setOpen(false);

    detailTask(dispatchQuest, {
      id: route.params.taskId,
    });
  };

  const confirm = () => {
    const data = {
      questId: route.params.questId,
      taskId: route.params.taskId,
      status: 'done',
    };
    update(dispatchQuest, { data });
    setTimeout(() => {
      goBack();
    }, 500);
  };
  /** === VIEW === */
  /** => Header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={route.params.title}
        backAction={goBack}
      />
    );
  };
  /** => Render HTML */
  const renderDescriptionHtml = () => {
    console.log(questTaskDetailState.data, 'ini apa');

    const title = questTaskDetailState.data?.title;
    const description = questTaskDetailState.data?.description;

    return (
      <View style={QuestDetailStyles.sectionContainer}>
        <View style={QuestDetailStyles.titleWrapper}>
          <SnbText.H3 align={'center'}>{title}</SnbText.H3>
        </View>

        <SnbHtml value={description} fontSize={16} />
      </View>
    );
  };
  /** => Render checkbox */
  const renderConsentLetterCheckBox = () => {
    return (
      <View style={QuestDetailStyles.checkboxContainer}>
        <SnbCheckbox
          status={checked}
          onPress={() =>
            setChecked(checked === 'selected' ? 'unselect' : 'selected')
          }
        />
        <View style={QuestDetailStyles.checkboxLabel}>
          <SnbText.B4>Saya Menyetujui Surat Persetujuan Diatas</SnbText.B4>
        </View>
      </View>
    );
  };
  /** => Render Button */
  const renderButton = () => {
    return (
      <View style={{ height: 75 }}>
        <SnbButton.Single
          type="primary"
          title={'Selanjutnya'}
          onPress={() => confirm()}
          disabled={checked === 'unselect'}
        />
      </View>
    );
  };
  const renderErrorModal = () => {
    return (
      <BottomSheetError
        open={questTaskErrorModal.isOpen}
        error={stateQuest.questTask.detail.error}
        retryAction={() => {
          retryGetQuestTask();
        }}
        backAction={() => {
          goBack();
        }}
      />
    );
  };

  return (
    <SnbContainer color="white">
      {renderHeader()}
      {!questTaskDetailState.loading && questTaskDetailState.data !== null ? (
        <>
          <View style={{ flex: 1 }}>
            <ScrollView>{renderDescriptionHtml()}</ScrollView>
          </View>
          {renderConsentLetterCheckBox()}
          {renderButton()}
        </>
      ) : (
        <LoadingPage />
      )}
      {renderErrorModal()}
    </SnbContainer>
  );
};

export default QuestTaskConsentLetterView;
