/** === IMPORT PACKAGE HERE ===  */
import React, { memo, useEffect, useMemo } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import {
  SnbContainer,
  SnbTopNav2,
  SnbProductListSkeleton,
} from '@sinbad/react-native-sinbad-ui';
import { NotificationCard, NotificationEmpty } from '../components';
// function
import { goBack, timeFromNow, useNotificationAction } from '../functions';
import { LoadingLoadMore } from '@core/components/Loading';

// constant
const testID = 'notification-list';

function NotificationView() {
  const {
    onFetch,
    onLoadMore,
    onRefresh,
    onMarkRead,
    stateNotification: {
      list: { data, loading, refresh, loadMore },
    },
  } = useNotificationAction();

  useEffect(() => {
    onFetch();
  }, []);

  const render = useMemo(() => {
    // loading
    if (loading) return <SnbProductListSkeleton />;
    // data empty
    if (!loading && data.length === 0) return <NotificationEmpty />;
    // have data
    if (!loading && data.length)
      return (
        <FlatList
          data={data}
          refreshing={refresh}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <NotificationCard
              testID={`${testID}-${item.id}`}
              typeName={item.typeName ?? ''}
              iconName={item.data?.iconName ?? ''}
              iconColor={item.data?.iconColor ?? ''}
              product={{
                name: item.data?.productName ?? '',
                url: item.data?.productImage ?? '',
              }}
              title={item?.title ?? ''}
              date={timeFromNow(new Date(item.createdAt).getTime())}
              content={item?.body ?? ''}
              read={item.isRead}
              onPress={() => onMarkRead(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 60 }}
          onEndReachedThreshold={0.1}
          onEndReached={onLoadMore}
        />
      );

    return <></>;
  }, [loading, data, refresh, onRefresh, onLoadMore]);
  // render ui
  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        testID={testID}
        color="white"
        backAction={goBack}
        title="Notifikasi"
      />
      {render}
      {loadMore && <LoadingLoadMore />}
    </SnbContainer>
  );
}

export default memo(NotificationView);
