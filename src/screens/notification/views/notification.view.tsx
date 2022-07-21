/** === IMPORT PACKAGE HERE ===  */
import React, { memo } from 'react';
import { FlatList } from 'react-native';
import { SnbContainer, SnbTopNav2 } from '@sinbad/react-native-sinbad-ui';
import { goBack, timeFromNow } from '../functions';
import { NotificationCard, NotificationEmpty } from '../components';

const mockData = [
  {
    id: '1',
    typeName: 'Info Produk',
    iconName: 'sinbad_point',
    iconColor: 'red',
    product: {
      url: 'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/prod/shared/123892-0bd6_20220628132024.png',
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore',
    },
    title: 'Lorem Ipsum',
    date: Date.now(),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isRead: false,
  },
  {
    id: '2',
    typeName: 'Info Produk',
    iconName: 'sinbad_point',
    iconColor: 'red',
    title: 'Lorem Ipsum',
    date: Date.now() - 1000 * 60 * 1200,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .',
    isRead: true,
  },
  {
    id: '3',
    typeName: 'Info Produk',
    iconName: 'sinbad_point',
    iconColor: 'red',
    title: 'Lorem Ipsum',
    date: Date.now() - 1000 * 60 * 1500,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .',
    isRead: false,
  },
];

function NotificationView() {
  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3 color="white" backAction={goBack} title="Notifikasi" />
      <FlatList
        data={[]}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <NotificationCard
            testID={`notif-list-${item.id}`}
            typeName={item.typeName}
            iconName={item.iconName}
            iconColor={item.iconColor}
            product={item.product}
            title={item.title}
            date={timeFromNow(item.date)}
            content={item.content}
            read={!item.isRead}
            onPress={() => {}}
          />
        )}
        contentContainerStyle={{ flex: 1 }}
        ListEmptyComponent={() => <NotificationEmpty />}
      />
    </SnbContainer>
  );
}

export default memo(NotificationView);
