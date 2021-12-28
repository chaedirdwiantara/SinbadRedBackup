/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  color,
  SnbIconHint,
  SnbButton,
} from 'react-native-sinbad-ui';
import moment from 'moment';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import StepperStatusDetail from '../components/StepperStatusDetail';
import LoadingPage from '@core/components/LoadingPage';
import { NavigationAction } from '@navigation';
import {
  goBack,
  MoneyFormatSpace,
  useQuestDetailAction,
  useQuestTaskAction,
} from '../function';
import { useQuestContext } from 'src/data/contexts/quest/useQuestContext';
import { QuestDetailStyles } from '../styles';

interface StepperDataProps {
  id: number;
  taskId: number;
  isHaveScreen: boolean;
  screenName: string;
  sequence: number;
  title: string;
  description: string;
  status: string;
  subTitle: string;
  iconName: string;
  iconType: string;
}

/** === CONSTANTS AND DUMMIES === */

/** === COMPONENT === */
const QuestDetailView: FC = ({ route }: any) => {
  /** === HOOK === */
  const { stateQuest, dispatchQuest } = useQuestContext();
  const questDetailState = stateQuest.questGeneral.detail;
  const { detail } = useQuestDetailAction();
  const { update } = useQuestTaskAction();

  useFocusEffect(
    React.useCallback(() => {
      detail(dispatchQuest, {
        id: route.params.questId,
        buyerId: route.params.buyerId,
      });
    }, []),
  );

  const stepAction = async () => {
    const { id, currentTaskId } = questDetailState.data;
    // Hit update quest API => from null to on_progress
    const data = {
      buyerId: route.params.buyerId,
      questId: id,
      taskId: currentTaskId,
      status: 'on_progress',
    };
    await update(dispatchQuest, { data });
    // Navigate to specific task's page
    checkNavigationScreen(buttonStatus().current.screenName, data);
  };

  /** => check navigation screen */
  const checkNavigationScreen = (screenName: string, data: any) => {
    const { id, currentTaskId, currentTask } = questDetailState.data;
    switch (screenName) {
      case 'PhoneNumberVerification':
        NavigationAction.navigate('MerchantEditView', {
          title: 'Verifikasi Toko',
          type: 'merchantOwnerPhoneNo',
          source: 'Quest',
          sourceData: data,
        });
        break;
      case 'StoreNameVerification':
        NavigationAction.navigate('MerchantEditView', {
          title: 'Verifikasi Toko',
          type: 'merchantOwnerName',
          source: 'Quest',
          sourceData: data,
        });
        break;
      case 'ConsentLetter':
        NavigationAction.navigate('QuestTaskConsentLetterView', {
          title: currentTask,
          questId: id,
          taskId: currentTaskId,
          buyerId: data.buyerId,
        });
        break;
      case 'CompleteStore':
        NavigationAction.navigate('QuestTaskCompleteStoreView', {
          title: currentTask,
          questId: id,
          taskId: currentTaskId,
          buyerId: data.buyerId,
        });
        break;
      default: {
        break;
      }
    }
  };

  /** === VIEW === */
  /** => Render Header */
  const renderHeader = () => {
    return (
      <View
        style={{ width: '100%', position: 'absolute', zIndex: 1000, top: 0 }}>
        <SnbTopNav.Type3
          type={'transparent1'}
          backAction={() => goBack()}
          title={''}
        />
      </View>
    );
  };
  /** => Render Image */
  const renderImage = () => {
    return (
      <View>
        <Image
          defaultSource={require('../../../assets/images/banner/sinbad-loading-image-banner.png')}
          source={{
            uri: questDetailState.data?.imageUrl,
          }}
          style={{
            aspectRatio: 5 / 2,
          }}
        />
      </View>
    );
  };
  /** => render Reward */
  const renderReward = () => {
    const { detailQuest } = questDetailState.data;
    const cleanText = detailQuest.replace(/<\/?[^>]+(>|$)/g, '');
    const limitChar = cleanText.substring(0, 160);

    return (
      <View style={QuestDetailStyles.rewardContainer}>
        <View>
          <SnbText.B3>{limitChar}</SnbText.B3>
        </View>
      </View>
    );
  };
  /** => Render Info */
  const renderInfo = () => {
    return (
      <View>
        <View style={QuestDetailStyles.boxInfo}>
          {renderImage()}
          <View style={{ flex: 1 }} />
        </View>
        <View
          style={[QuestDetailStyles.shadowForBox5, QuestDetailStyles.mainInfo]}>
          <View style={{ marginBottom: 8 }}>
            <SnbText.H4>{questDetailState.data.title}</SnbText.H4>
          </View>
          <View style={QuestDetailStyles.boxInfoSeparator} />
          {renderReward()}
          <View style={QuestDetailStyles.boxInfoSeparator} />
          <View
            style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <SnbText.B3>Berlaku Sampai</SnbText.B3>
            <SnbText.B4>
              {moment(questDetailState.data.endDate).format('DD MMMM YYYY')}
            </SnbText.B4>
          </View>
        </View>
      </View>
    );
  };
  /** => Steper Status */
  const stepperStatus = () => {
    let activeIndex = 0;
    let completeIndex = 0;
    const { task } = questDetailState.data;
    const isInitial = task[0].status === null;
    const isOnProgressExist =
      task.filter((item: any) => item.status === 'on_progress').length > 0;

    if (isOnProgressExist) {
      activeIndex = task.filter((item: any) => item.status === 'on_progress')[0]
        .sequence;
      completeIndex = activeIndex - 1;
    } else if (!isOnProgressExist && !isInitial) {
      const doneTasks = task.filter((item: any) => item.status === 'done');
      activeIndex = doneTasks[doneTasks.length - 1].sequence;
      completeIndex = activeIndex;
    }

    return {
      activeIndex,
      completeIndex,
    };
  };
  /** => Stepper Data */
  const stepperData = () => {
    const { task, rewardValue } = questDetailState.data;
    let addTask;
    // add voucher stepper
    if (rewardValue) {
      addTask = [
        ...task,
        {
          title: `+1 Voucher belanja hingga ${MoneyFormatSpace(rewardValue)}!`,
        },
      ];
    } else {
      addTask = task;
    }

    const data = addTask.map((t: any, idx: any) => {
      let newTask = {
        iconName: 'assignment_complete',
        // iconType: 'MaterialIcon',
        title: t.title,
        subTitle: t.description,
        status: t.status,
      };
      if (idx === addTask.length - 1) {
        return {
          ...newTask,
          ...{
            iconName: 'local-activity',
            // iconType: 'MaterialIcon',
          },
        };
      }
      return {
        ...newTask,
        ...{
          iconName: 'assignment_complete',
          // iconType: 'MaterialIcon',
        },
      };
    });

    return data;
  };
  /** => Render Stepper */
  const renderStepper = () => {
    return (
      <View style={QuestDetailStyles.stepperContainer}>
        <>
          <View style={{ paddingHorizontal: 16 }}>
            <SnbText.H4>Selesaikan Quest!</SnbText.H4>
          </View>
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <StepperStatusDetail
              activeIndex={stepperStatus().activeIndex}
              completeIndex={stepperStatus().completeIndex}
              data={stepperData()}
            />
          </View>
        </>
      </View>
    );
  };
  /** => Render Additional Info */
  const renderAdditionalInfo = (type: string) => {
    const { detailQuest, termsAndCondition } = questDetailState.data;
    return (
      <TouchableOpacity
        style={QuestDetailStyles.containerAddInfo}
        onPress={() =>
          NavigationAction.navigate('QuestAdditionalInfoView', {
            type,
            data: type === 'detail' ? detailQuest : termsAndCondition,
          })
        }>
        <View style={QuestDetailStyles.containerAddTitle}>
          {type === 'detail' ? (
            <SnbText.H4>Deskripsi Quest</SnbText.H4>
          ) : (
            <SnbText.H4>Syarat dan Ketentuan</SnbText.H4>
          )}
        </View>
        <View style={QuestDetailStyles.containerAddIcon}>
          <SnbIconHint
            iconName={'chevron_right'}
            size={24}
            iconColor={color.black100}
            badgeColor={'red'}
          />
        </View>
      </TouchableOpacity>
    );
  };
  /** => Render Button Status */
  const buttonStatus = () => {
    let title = 'Lanjut';
    const { currentTask, task } = questDetailState.data;
    let isFirst = false;
    let isLast = false;
    let isDone = false;
    const firstTitle = task[0].title;
    const lastTitle = task[task.length - 1].title;
    const current = task.filter((t: any) => t.title === currentTask)[0] || null;
    if (currentTask === firstTitle || stepperStatus().activeIndex === 0) {
      title = 'Mulai';
      isFirst = true;
    } else if (
      (currentTask === lastTitle || currentTask === null) &&
      stepperStatus().completeIndex === task.length - 1
    ) {
      title = 'Lanjut';
      isLast = true;
    } else if (
      currentTask === null &&
      task[task.length - 1].status === 'done'
    ) {
      isDone = true;
    }

    return { title, isFirst, isLast, isDone, current };
  };
  /** => Render Footer */
  const renderFooter = () => {
    const { currentTask, endDate } = questDetailState.data;
    return (
      <>
        {!buttonStatus().isDone && moment(endDate) > moment() ? (
          <View
            style={[
              QuestDetailStyles.footerContent,
              QuestDetailStyles.shadowForBox10,
            ]}>
            <View style={QuestDetailStyles.footerLeft}>
              <View>
                <SnbText.B1>Quest saat ini</SnbText.B1>
              </View>
              <View>
                <SnbText.H4>{currentTask}</SnbText.H4>
              </View>
            </View>
            <View style={QuestDetailStyles.footerRight}>
              <SnbButton.Dynamic
                size="medium"
                type="primary"
                title={buttonStatus().title}
                onPress={() => stepAction()}
                disabled={false}
              />
            </View>
          </View>
        ) : buttonStatus().isLast && !buttonStatus().isDone ? (
          <SnbButton.Dynamic
            size="medium"
            type="primary"
            title={buttonStatus().title}
            onPress={() => stepAction()}
            disabled={false}
          />
        ) : null}
      </>
    );
  };
  /** => Content */
  const renderContent = () => {
    return (
      <>
        <View
          style={[
            { flex: 1 },
            {
              marginBottom: buttonStatus().isDone
                ? 0
                : buttonStatus().isLast
                ? 0
                : 75,
            },
          ]}>
          <ScrollView>
            {renderInfo()}
            {renderStepper()}
            {renderAdditionalInfo('detail')}
            {renderAdditionalInfo('tnc')}
          </ScrollView>
        </View>
        {renderFooter()}
      </>
    );
  };
  /** => Main */
  return (
    <SnbContainer color="white">
      {renderHeader()}
      {!questDetailState.loading && questDetailState.data !== null ? (
        renderContent()
      ) : (
        <LoadingPage />
      )}
    </SnbContainer>
  );
};

export default QuestDetailView;
