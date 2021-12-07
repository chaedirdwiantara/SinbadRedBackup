import { StyleSheet } from 'react-native';

const CategoryHomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    height: 54,
    width: 54,
    marginHorizontal: 14,
    borderRadius: 16,
  },
  itemName: {
    justifyContent: 'center',
    marginTop: 8,
    paddingHorizontal: 10,
  },
  itemNameSkeletonContainer: {
    justifyContent: 'center',
    width: '75%',
    height: 36,
  },
  itemNameSkeleton: {
    width: '100%',
    height: 16,
    borderRadius: 16,
  },
});

export default CategoryHomeStyle;
