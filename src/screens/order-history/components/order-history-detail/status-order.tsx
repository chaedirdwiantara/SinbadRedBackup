import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SnbText, SnbBadge, color } from '@sinbad/react-native-sinbad-ui';
import { Divider, mockData } from './information';
import { labelStatus } from '../../types';
import { NavigationAction } from '@core/functions/navigation';

const StatusOrder = () => {
  return (
    <>
      <View style={styles.main}>
        <View>
          <SnbText.B2>Status Pesanan:</SnbText.B2>
          <View style={{ marginTop: 4 }}>
            <SnbBadge.Label
              type={labelStatus[mockData.statusValue] || 'error'}
              value={mockData.statusLabel}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              NavigationAction.navigate('HistoryTrackingView', {
                id: 'some_id_tracking',
              })
            }>
            <SnbText.B2 color={color.red70}>Lacak</SnbText.B2>
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  main: { margin: 16, flexDirection: 'row', justifyContent: 'space-between' },
  button: {
    borderColor: color.red70,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 7.5,
  },
});

export default StatusOrder;
