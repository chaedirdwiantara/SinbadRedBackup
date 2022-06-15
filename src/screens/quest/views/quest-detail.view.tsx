/** === IMPORT PACKAGE HERE === */
import React, { FC, useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  color,
  SnbIconHint,
  SnbButton,
  SnbImageCompressor,
  SnbBottomSheet,
} from 'react-native-sinbad-ui';
import moment from 'moment';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import StepperStatusDetail from '../components/StepperStatusDetail';
import LoadingPage from '@core/components/LoadingPage';
import BottomSheetError from '@core/components/BottomSheetError';
import { NavigationAction } from '@navigation';
import {
  goBack,
  MoneyFormatSpace,
  useErrorModalState,
  useQuestDetailAction,
  useQuestTaskAction,
  useQuestVoucherAction,
} from '../function';
import { toCurrency } from '@core/functions/global/currency-format';
import { useQuestContext } from 'src/data/contexts/quest/useQuestContext';
import { QuestDetailStyles } from '../styles';
import { contexts } from '@contexts';

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
  const [modalCompleted, setModalCompleted] = useState(false);
  const questDetailErrorModal = useErrorModalState();
  const { stateUser } = React.useContext(contexts.UserContext);
  const ownerDataInfo = stateUser.detail.data?.ownerData.info;
  const ownerMobilePhone = stateUser.detail.data?.ownerData.profile.mobilePhone;
  const [showModalPhoneVerification, setShowModalPhoneVerification] =
    useState(false);

  const { stateQuest, dispatchQuest } = useQuestContext();
  const questDetailState = stateQuest.questGeneral.detail;
  const questSubmitVoucherState = stateQuest.questVoucher.submit;
  const { detail } = useQuestDetailAction();
  const { update } = useQuestTaskAction();
  const { resetSubmitVoucher } = useQuestVoucherAction();

  useFocusEffect(
    React.useCallback(() => {
      detail(dispatchQuest, {
        id: route.params.questId,
      });
    }, []),
  );

  useEffect(() => {
    if (questDetailState && questDetailState.error !== null) {
      questDetailErrorModal.setOpen(true);
    }
  }, [questDetailState]);

  useEffect(() => {
    if (questSubmitVoucherState && questSubmitVoucherState.data !== null) {
      setModalCompleted(true);
    }
  }, [questSubmitVoucherState]);

  const handleModalClosed = () => {
    setModalCompleted(false);
    resetSubmitVoucher(dispatchQuest);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (
        questDetailState.error !== null ||
        stateQuest.questTask.update.error !== null
      ) {
        questDetailErrorModal.setOpen(true);
      }
    }, [questDetailState, stateQuest.questTask.update.error]),
  );

  const retryGetQuestDetail = () => {
    questDetailErrorModal.setOpen(false);
    setShowModalPhoneVerification(false);

    detail(dispatchQuest, {
      id: route.params.questId,
    });
  };

  const stepToPhoneNumberVerification = (data: any) => {
    if (ownerDataInfo && ownerDataInfo.isMobilePhoneVerified) {
      data.status = 'done';
      update(dispatchQuest, { data });

      setShowModalPhoneVerification(true);
    } else {
      NavigationAction.navigate('MerchantEditView', {
        title: 'Verifikasi Toko',
        type: 'merchantOwnerPhoneNo',
        source: 'Quest',
        sourceData: data,
      });
    }
  };

  const stepToStoreNameVerification = (data: any) => {
    NavigationAction.navigate('MerchantEditView', {
      title: 'Verifikasi Toko',
      type: 'merchantOwnerName',
      source: 'Quest',
      sourceData: data,
    });
  };

  const stepToTaskPage = (screenName: string) => {
    const id = questDetailState.data?.id;
    const currentTaskId = questDetailState.data?.currentTaskId;
    const currentTask = questDetailState.data?.currentTask;

    const data = {
      questId: id,
      taskId: currentTaskId,
      status: 'on_progress',
    };
    update(dispatchQuest, { data });

    switch (screenName) {
      case 'ConsentLetter':
        NavigationAction.navigate('QuestTaskConsentLetterView', {
          title: currentTask,
          questId: id,
          taskId: currentTaskId,
        });
        break;
      case 'CompleteStore':
        NavigationAction.navigate('QuestTaskCompleteStoreView', {
          title: currentTask,
          questId: id,
          taskId: currentTaskId,
        });
        break;
      case 'RecordStock':
        NavigationAction.navigate('QuestTaskRecordStockView', {
          title: currentTask,
          questId: id,
          taskId: currentTaskId,
        });
        break;
      case 'EndCustomerPromotion':
        NavigationAction.navigate('QuestTaskEndCustomerPromoView', {
          title: currentTask,
          questId: id,
          taskId: currentTaskId,
        });
        break;
      default: {
        break;
      }
    }
  };

  const stepAction = async () => {
    const { id, currentTaskId, currentTask } = questDetailState.data;
    // prepare update quest task API => from null to on_progress
    const data = {
      questId: id,
      taskId: currentTaskId,
      status: 'on_progress',
    };

    if (buttonStatus().current.screenName === 'PhoneNumberVerification') {
      stepToPhoneNumberVerification(data);
    } else if (buttonStatus().current.screenName === 'StoreNameVerification') {
      stepToStoreNameVerification(data);
    } else {
      stepToTaskPage(buttonStatus().current.screenName);
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
        <SnbImageCompressor
          defaultSource={require('../../../assets/images/banner/sinbad-default-banner.png')}
          uri={questDetailState.data?.imageUrl}
          style={{ aspectRatio: 5 / 2 }}
          res={500}
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
  /** => Render Achievement */
  const renderAchievement = () => {
    const { achievement, task } = questDetailState.data;

    if (
      task &&
      task.find(
        (item: any) =>
          item.screenName === 'RecordStock' && item.status === 'done',
      )
    ) {
      return (
        <View style={QuestDetailStyles.achievementContainer}>
          <View style={{ paddingHorizontal: 16 }}>
            <SnbText.H4>Pencapaian Anda</SnbText.H4>
          </View>
          <View
            style={[
              QuestDetailStyles.shadowForBox5,
              QuestDetailStyles.boxAchievement,
            ]}>
            <View style={QuestDetailStyles.achievementInfo}>
              <View style={{ flexDirection: 'column' }}>
                <SnbText.B4>Total Pelanggan:</SnbText.B4>
                <View style={{ flexDirection: 'row' }}>
                  <View style={QuestDetailStyles.achievementImageBox}>
                    <Image
                      source={require('../../../assets/icons/quest/achievement_user.png')}
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: 8,
                      marginTop: 16,
                    }}>
                    <SnbText.H2>
                      {achievement ? achievement.totalCustomer : '-'}
                    </SnbText.H2>
                  </View>
                </View>
              </View>
              <View style={QuestDetailStyles.boxAchievementSeparator} />
              <View style={{ flexDirection: 'column' }}>
                <SnbText.B4>Voucher Cashback:</SnbText.B4>
                <View style={{ flexDirection: 'row' }}>
                  <View style={QuestDetailStyles.achievementImageBox}>
                    <Image
                      source={require('../../../assets/icons/quest/achievement_money.png')}
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: 8,
                      marginTop: 16,
                    }}>
                    <SnbText.H2>
                      {achievement
                        ? toCurrency(achievement.totalVoucher, {
                            withFraction: false,
                          })
                        : 'Rp -'}
                    </SnbText.H2>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      <View />;
    }
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

  /** => render modal for quest phone number verification */
  const renderQuestPhoneNumberVerifiedModal = () => {
    return (
      <SnbBottomSheet
        open={showModalPhoneVerification}
        content={renderQuestPhoneNumberVerificationModalContent()}
        title={'Informasi'}
      />
    );
  };

  /** => render modal for quest phone number verification content */
  const renderQuestPhoneNumberVerificationModalContent = () => {
    let image = require('src/assets/images/sinbad_image/smile_sinbad.png');
    let title = 'Verifikasi Nomor Handphone';

    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={image}
            style={{ width: 240, height: 160 }}
            resizeMode="contain"
          />
          <SnbText.H4>{title}</SnbText.H4>
          <View style={{ paddingHorizontal: 16 }}>
            <SnbText.B3 align="center">
              {`Nomor Handphone ${ownerMobilePhone} sudah terverifikasi`}
            </SnbText.B3>
          </View>
        </View>
        <View style={{ marginVertical: 16 }} />
        <View style={{ height: 75 }}>
          <SnbButton.Single
            title="Lanjutkan"
            type="primary"
            disabled={false}
            onPress={() => {
              retryGetQuestDetail();
            }}
          />
        </View>
      </View>
    );
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

  const renderErrorModal = () => {
    return (
      <BottomSheetError
        open={questDetailErrorModal.isOpen}
        error={
          questDetailState.error
            ? questDetailState.error
            : stateQuest.questTask.update.error
        }
        retryAction={() => {
          if (questDetailState.error !== null) {
            stateQuest.questTask.update.error = null;
            retryGetQuestDetail();
          } else {
            questDetailErrorModal.setOpen(false);
            stepAction();
          }
        }}
        closeAction={() => {
          questDetailErrorModal.setOpen(false);
        }}
      />
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
                ? 75
                : 75,
            },
          ]}>
          <ScrollView>
            {renderInfo()}
            {renderAchievement()}
            {renderStepper()}
            {renderAdditionalInfo('detail')}
            {renderAdditionalInfo('tnc')}
          </ScrollView>
        </View>
        {renderFooter()}
      </>
    );
  };
  /** => Render Modal Completed */
  const renderModalCompleted = () => {
    return (
      <SnbBottomSheet
        open={modalCompleted}
        closeAction={() => setModalCompleted(false)}
        content={
          <>
            <View style={QuestDetailStyles.confirm}>
              <SnbText.H1>Selamat!</SnbText.H1>
              <Image
                style={QuestDetailStyles.imageConfirm}
                source={require('../../../assets/images/promo_completed.png')}
              />
              <View style={{ marginTop: 16 }}>
                <SnbText.B2>Anda sudah memasukkan 1 Pelanggan</SnbText.B2>
              </View>
              <View style={{ marginTop: 16 }}>
                <SnbText.B1 align={'center'} color={color.black80}>
                  {`Tambah pelanggan lagi dengan tekan tombol lanjut. Program akan berakhir secara otomatis pada ${moment(
                    questDetailState.data?.endDate,
                  ).format('DD MMMM YYYY')}.`}
                </SnbText.B1>
              </View>
            </View>
            <View style={{ height: 75 }}>
              <SnbButton.Single
                type="primary"
                title="OK"
                onPress={() => handleModalClosed()}
              />
            </View>
          </>
        }
      />
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
      {/* modal */}
      {renderModalCompleted()}
      {renderErrorModal()}
      {renderQuestPhoneNumberVerifiedModal()}
    </SnbContainer>
  );
};

export default QuestDetailView;
