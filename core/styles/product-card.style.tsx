import { StyleSheet } from 'react-native';
import { styles, color } from 'react-native-sinbad-ui';

export const ProductCardStyle = StyleSheet.create({
  container: {
    borderRadius: 6,
    marginBottom: 8,
    ...styles.shadowForBox10,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  divider: {
    borderTopWidth: 1,
    borderColor: color.black10,
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
