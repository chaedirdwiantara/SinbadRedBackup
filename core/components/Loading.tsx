import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
const loadMoreGif = require('@image/loading/load_more.gif');
const loadTriangleGif = require('@image/loading/load_triagle.gif');
const loadHorizontalGif = require('@image/loading/load-horizontal.gif');

export const LoadingLoadMore = () => {
  return (
    <View style={styles.loadMoreContainer}>
      <Image source={loadMoreGif} style={{ height: 50, width: 50 }} />
    </View>
  );
};

export const LoadingPage = () => {
  return (
    <View style={styles.loadingPage}>
      <Image source={loadTriangleGif} style={{ height: 80, width: 80 }} />
    </View>
  );
};

export const LoadingHorizontal = () => {
  return (
    <View style={styles.loadingPage}>
      <Image source={loadHorizontalGif} style={{ height: 5 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadMoreContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  loadingPage: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: Maulana Ghozi
 * createdDate: 8122021
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */
