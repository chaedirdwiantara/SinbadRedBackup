/** === IMPORT PACKAGE HERE === */
import React, { FC, useState } from 'react';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbTabs,
  color,
  SnbIconHint,
} from 'react-native-sinbad-ui';
import moment from 'moment';
import LoadingPage from '@core/components/LoadingPage';
import { EmptyState } from '@core/components/EmptyState';
/** === IMPORT FUNCTIONS === */
import {
  goBack,
  goToQuestDetail,
  useErrorModalState,
  useQuestListAction,
} from '../function';
import { useQuestContext } from 'src/data/contexts/quest/useQuestContext';
/** === IMPORT STYLES === */
import { QuestListStyles } from '../styles';
import BottomSheetError from '@core/components/BottomSheetError';

interface QuestCardProps {
  id: number;
  title: string;
  image: string;
  endDate: string;
  currentTaskId: number;
  doneTask: number;
  totalTask: number;
  status: string;
  onCardPress?: () => void;
}

/** === CONSTANTS AND DUMMIES === */
const questTabs = ['Semua', 'Berjalan', 'Selesai'];

/** === COMPONENT === */
const QuestListView: FC = () => {
  /** === HOOK === */
  const questListErrorModal = useErrorModalState();
  const [activeTab, setActiveTab] = useState(0);
  const [status, setStatus] = useState('all');

  const { stateQuest, dispatchQuest } = useQuestContext();
  const questListState = stateQuest.questGeneral.list;
  const { fetch, loadMore, refresh } = useQuestListAction();

  useFocusEffect(
    React.useCallback(() => {
      fetch(dispatchQuest, { status });
    }, [activeTab]),
  );
  React.useEffect(() => {
    if (questListState.error !== null) {
      questListErrorModal.setOpen(true);
    }
  }, [questListState]);

  const retryGetQuestList = () => {
    fetch(dispatchQuest, { status });
    questListErrorModal.setOpen(false);
  };

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
        setActiveTab(tabIndex);
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
  const renderProgressBar = (doneTask: number, totalTask: number) => {
    const progress = doneTask === 0 ? 10 : (doneTask / totalTask) * 100;
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
          {doneTask === totalTask ? (
            <SnbText.B3>Silakan klaim voucher Anda</SnbText.B3>
          ) : (
            <SnbText.B3>{`${doneTask} dari ${totalTask} tahap selesai`}</SnbText.B3>
          )}
        </View>
      </View>
    );
  };

  /** => render button */
  const renderButton = (id: number, doneTask: number, totalTask: number) => {
    let buttonText;

    if (doneTask === 0) {
      buttonText = 'Mulai';
    } else if (doneTask < totalTask) {
      buttonText = 'Lanjut';
    } else if (doneTask === totalTask) {
      buttonText = 'Klaim';
    }

    if (doneTask === totalTask) {
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
          onPress={() => goToQuestDetail({ questId: id })}>
          <SnbText.B4 color={color.white}>{buttonText}</SnbText.B4>
        </TouchableOpacity>
      );
    }
  };
  /** => render item */
  const renderItem = ({ item }: { item: QuestCardProps }) => {
    return (
      <TouchableOpacity
        onPress={() => goToQuestDetail({ questId: item.id })}
        style={[QuestListStyles.shadowForBox, QuestListStyles.boxMainContent]}>
        <Image source={{ uri: item.image }} style={QuestListStyles.cardImage} />
        <View style={[QuestListStyles.cardMainContent]}>
          <View style={QuestListStyles.floatingDateContainer}>
            {renderFloatingDate(item.endDate)}
          </View>
          <SnbText.H4>{item.title}</SnbText.H4>
          <View style={QuestListStyles.cardBottomContent}>
            <View style={QuestListStyles.progressBarContainer}>
              {renderProgressBar(item.doneTask, item.totalTask)}
            </View>
            {renderButton(item.id, item.doneTask, item.totalTask)}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /** => Quest List */
  const renderQuestList = () => {
    return (
      <View style={{ paddingVertical: 8 }}>
        <FlatList
          contentContainerStyle={QuestListStyles.boxFlatlist}
          data={questListState.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.1}
          onEndReached={() =>
            loadMore(dispatchQuest, questListState, { status })
          }
          refreshing={questListState.refresh}
          onRefresh={() => refresh(dispatchQuest, { status })}
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
      description = 'Anda bisa melihat quest yang tersedia di sini';
    } else if (status === 'on_progress') {
      title = 'Belum Ada Quest Berjalan';
      description =
        'Belum ada quest yang sedang berjalan. Yuk segera ikutan quest, biar dapat hadiahnya!';
    } else {
      title = 'Belum Ada Quest Selesai';
      description =
        'Belum ada quest yang diselesaikan. Yuk segera ikutan quest, biar dapat hadiahnya!';
    }
    return <EmptyState title={title} description={description} />;
  };

  const renderErrorModal = () => {
    return (
      <BottomSheetError
        open={questListErrorModal.isOpen}
        error={questListState.error}
        retryAction={retryGetQuestList}
      />
    );
  };
  /** => Content */
  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        {!questListState.loading && questListState.data.length > 0 ? (
          <View>{renderQuestList()}</View>
        ) : (
          <View style={{ flex: 1, margin: 15 }}>{renderEmpty()}</View>
        )}
      </View>
    );
  };
  /** => Main */
  return (
    <SnbContainer color="white">
      {renderHeader()}
      {renderTabs()}
      {questListState.loading ? <LoadingPage /> : renderContent()}
      {renderErrorModal()}
    </SnbContainer>
  );
};

export default QuestListView;
