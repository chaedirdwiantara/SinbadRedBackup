import { StyleSheet } from 'react-native';

export const ProductSkeletonStyle = StyleSheet.create({
  gridCardContainer: {
    width: '100%',
    paddingBottom: 14,
    paddingHorizontal: 6,
  },
  listCardContainer: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 4,
  },
  listCardImage: {
    height: 64,
    width: 64,
    marginRight: 16,
    borderRadius: 10,
  },
  listCardButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
