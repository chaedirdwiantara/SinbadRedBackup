/** === IMPORT PACKAGE HERE === */
import React, { FC, useState, useEffect } from 'react';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbTabs,
  color,
  SnbIconHint,
  SnbEmptyData,
} from 'react-native-sinbad-ui';
import moment from 'moment';
import LoadingPage from '@core/components/LoadingPage';
import { EmptyState } from '@core/components/EmptyState';
/** === IMPORT FUNCTIONS === */
import { goBack, useQuestListAction } from '../function';
import { useQuestContext } from 'src/data/contexts/quest/useQuestContext';
import { useDataAuth } from '@core/redux/Data';
/** === IMPORT STYLES === */
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

const mockData = {
  data: [
    {
      id: 11,
      title: 'ini quest consent letter + konfirmasi toko',
      image:
        'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/staging/quest-images/image_1638262982539.png',
      endDate: '2022-08-31',
      currentTask: 3,
      totalTask: 4,
      status: 'on_progress',
    },
    {
      id: 12,
      title: 'ini quest consent letter + konfirmasi toko',
      image:
        'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/staging/quest-images/image_1638262982539.png',
      endDate: '2022-08-31',
      currentTask: 2,
      totalTask: 4,
      status: 'on_progress',
    },
    {
      id: 13,
      title: 'ini quest consent letter + konfirmasi toko',
      image:
        'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/staging/quest-images/image_1638262982539.png',
      endDate: '2022-08-31',
      currentTask: 4,
      totalTask: 4,
      status: 'on_progress',
    },
    {
      id: 14,
      title: 'ini quest consent letter + konfirmasi toko',
      image:
        'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/staging/quest-images/image_1638262982539.png',
      endDate: '2022-08-31',
      currentTask: 1,
      totalTask: 4,
      status: 'on_progress',
    },
  ],
  meta: {
    limit: 1,
    skip: 0,
    total: 1,
  },
};

/** === CONSTANTS AND DUMMIES === */
const questTabs = ['Semua', 'Berjalan', 'Selesai'];

/** === COMPONENT === */
const QuestListView: FC = () => {
  /** === HOOK === */
  const [activeTab, setActiveTab] = useState(0);
  const [status, setStatus] = useState('all');
  const [buyerId, setBuyerId] = useState(0);

  const { me } = useDataAuth();
  const { stateQuest: { list: questListState }, dispatchQuest } = useQuestContext();
  const { fetch, loadMore, refresh } = useQuestListAction();
  console.log(me, 'meeeee');
  
  React.useEffect(() => {
    console.log(me.data?.user.id, 'buyerId');
    if (me.data !== null) {
      setBuyerId(me.data.user.id);
      console.log(status, 'status1');
      fetch(dispatchQuest, { status, buyerId: me.data.user.id});
    }
  }, [me.data, activeTab]);

  console.log(questListState, 'questListState');
  /** === VIEW === */
  /** => Header */
  const renderHeader = () => {
    return <SnbTopNav.Type3 type="red" title="Quest" backAction={goBack} />;
  };
  /** => Tabs */
  const renderTabs = () => (
    <SnbTabs.Fixed
      tabs={questTabs}
      activeTabs={activeTab}
      onChangeActiveTabs={(tabIndex: number) => {
        setActiveTab(tabIndex)
        if (tabIndex === 0) {
          setStatus('all');
        } else if (tabIndex === 1) {
          setStatus('on_progress');
        } else {
          setStatus('done');
        }
      }}
    />
  );
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
        <View style={{ marginLeft: 8 }}>
          <SnbText.C2>{moment(date).format('DD MMMM YYYY')}</SnbText.C2>
        </View>
      </View>
    );
  };
  /** => render progress bar */
  const renderProgressBar = (currentTask: number, totalTask: number) => {
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
  const renderButton = (currentTask: number, totalTask: number) => {
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
          <SnbText.B4 color={color.white}>{buttonText}</SnbText.B4>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={QuestListStyles.cardButton}
          onPress={() => null}>
          <SnbText.B4 color={color.white}>{buttonText}</SnbText.B4>
        </TouchableOpacity>
      );
    }
  };
  /** => render item */
  const renderItem = ({ item }: { item: QuestCardProps }) => {
    return (
      <TouchableOpacity
        onPress={() => NavigationAction.navigate('QuestDetailView')}
        style={[QuestListStyles.shadowForBox, QuestListStyles.boxMainContent]}>
        <Image source={{ uri: item.image }} style={QuestListStyles.cardImage} />
        <View style={[QuestListStyles.cardMainContent]}>
          <View style={QuestListStyles.floatingDateContainer}>
            {renderFloatingDate(item.endDate)}
          </View>
          <SnbText.H4>{item.title}</SnbText.H4>
          <View style={QuestListStyles.cardBottomContent}>
            <View style={QuestListStyles.progressBarContainer}>
              {renderProgressBar(item.currentTask, item.totalTask)}
            </View>
            {renderButton(item.currentTask, item.totalTask)}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /** => Quest List */
  const renderQuestList = () => {
    return (
      <View style={{ paddingVertical: 8}}>
        <FlatList
          contentContainerStyle={QuestListStyles.boxFlatlist}
          data={questListState.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.1}
          onEndReached={() => loadMore(dispatchQuest, questListState, { status, buyerId})}
          refreshing={questListState.refresh}
          onRefresh={() => refresh(dispatchQuest, { status, buyerId})}
          showsVerticalScrollIndicator
        />
      </View>
    );
  };
  //** => render empty */
  const renderEmpty = () => {
    let title;
    let description;

    if (status === 'all') {
      title = 'Tunggu Quest Selanjutnya';
      description = 'Anda bisa melihat quest yang tersedia di sini'
    } else if (status === 'on_progress') {
      title = 'Belum Ada Quest Berjalan';
      description = 'Belum ada quest yang sedang berjalan. Yuk segera ikutan quest, biar dapat hadiahnya!';
    } else {
      title = 'Belum Ada Quest Selesai';
      description = 'Belum ada quest yang diselesaikan. Yuk segera ikutan quest, biar dapat hadiahnya!';
    }
    return (
      <EmptyState
        title={title} description={description}
      />
    );
  };
  /** => Content */
  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        {!questListState.loading &&
        questListState.data.length > 0 ? (
          <View>{renderQuestList()}</View>
        ) : (
          renderEmpty()
        )}
      </View>
    );
  };
  /** => Main */
  return (
    <SnbContainer color="white">
      {renderHeader()}
      {renderTabs()}
      {questListState.loading ? (
        <LoadingPage />
      ) : (
        renderContent()
      )}
    </SnbContainer>
  );
};

export default QuestListView;
