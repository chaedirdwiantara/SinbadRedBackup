import { StyleSheet } from 'react-native';
import { styles, color } from 'react-native-sinbad-ui';

const CategoryStyle = StyleSheet.create({
  categoryHomeContainer: {
    flex: 1,
    padding: 16,
  },
  level2LayoutActive: {
    ...styles.shadowForBox10,
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 16,
    flexDirection: 'row',
  },
  level2LayoutInactive: {
    ...styles.shadowForBox10,
    alignItems: 'center',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
  },
  level3layout: {
    ...styles.shadowForBox10,
    paddingTop: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  level3layoutItem: {
    alignItems: 'center',
    marginBottom: 16,
  },
  level1SkeletonContainer: {
    width: 96,
    padding: 12,
    backgroundColor: color.black60,
  },
  level1Skeleton: {
    width: '100%',
    height: 64,
    marginBottom: 10,
    borderRadius: 16,
  },
  level2Skeleton: {
    width: '100%',
    height: 56,
    marginBottom: 10,
    borderRadius: 16,
  },
});

export default CategoryStyle;
