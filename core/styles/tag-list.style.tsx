import { StyleSheet } from 'react-native';
import { color, styles } from 'react-native-sinbad-ui';

export const TagListStyle = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 8,
  },
  boxChip1: {
    marginVertical: 4,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: color.black60,
    ...styles.shadowForBox10,
  },
  boxChip2: {
    marginVertical: 4,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: color.white,
    borderColor: color.black60,
    borderWidth: 1,
  },
});
