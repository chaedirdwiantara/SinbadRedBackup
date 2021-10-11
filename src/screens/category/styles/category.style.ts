import { StyleSheet } from 'react-native';
import { styles } from 'react-native-sinbad-ui';

const CategoryStyles = StyleSheet.create({
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
});

export default CategoryStyles;
