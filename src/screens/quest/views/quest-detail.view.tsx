/** === IMPORT PACKAGE HERE === */
import React, { FC, useState } from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbTabs,
  color,
  SnbIconHint,
} from 'react-native-sinbad-ui';
import moment from 'moment';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import StepperStatusDetail from '../components/StepperStatusDetail';
import { goBack, MoneyFormatSpace } from '../function';
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

const mockData = {
  id: 749,
  title: 'store verif',
  rewardDescription: 'iosdfji iejfies',
  rewardType: 'voucher',
  rewardValue: 50000,
  startDate: '2021-11-30',
  endDate: '2021-12-02',
  detailQuest:
    '<p>ifjiowjefiowe iwejfiowejfio wefioewjfw</p><p>wefjoiwejf wefwejej</p>',
  termsAndCondition:
    '<p>ifjiowjefiowe iwejfiowejfio wefioewjfw</p><p>wefjoiwejf wefwejej</p>',
  imageUrl:
    'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/staging/quest-images/image_1638262982539.png',
  currentTask: 'Store Name Verification',
  currentTaskId: 2093,
  task: [
    {
      id: 2092,
      taskId: 2092,
      isHaveScreen: true,
      screenName: 'PhoneNumberVerification',
      sequence: 1,
      title: 'Phone Number Verification',
      description: 'Lengkapi nomor handphone Anda untuk diverifikasi',
      status: null,
    },
    {
      id: 2093,
      taskId: 2093,
      isHaveScreen: true,
      screenName: 'StoreNameVerification',
      sequence: 2,
      title: 'Store Name Verification',
      description: 'Isi nama Anda untuk melengkapi data Anda',
      status: null,
    },
  ],
};

/** === CONSTANTS AND DUMMIES === */
const questTabs = ['Semua', 'Berjalan', 'Selesai'];

/** === COMPONENT === */
const QuestDetailView: FC = () => {
  /** === HOOK === */
  const [activeTab, setActiveTab] = useState(0);
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
          // defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
          source={{
            uri: mockData.imageUrl,
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
    const { detailQuest } = mockData;
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
            <SnbText.H4>{mockData.title}</SnbText.H4>
          </View>
          <View style={QuestDetailStyles.boxInfoSeparator} />
          {renderReward()}
          <View style={QuestDetailStyles.boxInfoSeparator} />
          <View
            style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <SnbText.B3>Berlaku Sampai</SnbText.B3>
            <SnbText.B4>
              {moment(mockData.endDate).format('DD MMMM YYYY')}
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
    const { task } = mockData;
    const isInitial = task[0].status === null;
    const isOnProgressExist =
      task.filter((item) => item.status === 'on_progress').length > 0;

    if (isOnProgressExist) {
      activeIndex = task.filter((item) => item.status === 'on_progress')[0]
        .sequence;
      completeIndex = activeIndex - 1;
    } else if (!isOnProgressExist && !isInitial) {
      const doneTasks = task.filter((item) => item.status === 'done');
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
    const { task, rewardValue } = mockData;
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

    const data = addTask.map((t, idx) => {
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
  /** => Content */
  const renderContent = () => (
    <>
      <View>
        <ScrollView>
          {renderInfo()}
          {renderStepper()}
        </ScrollView>
      </View>
    </>
  );
  /** => Main */
  return (
    <SnbContainer color="white">
      {renderHeader()}
      {renderContent()}
    </SnbContainer>
  );
};

export default QuestDetailView;
