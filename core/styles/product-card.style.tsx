import { StyleSheet } from 'react-native';
import { styles, color } from 'react-native-sinbad-ui';

const Type1 = StyleSheet.create({
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
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 5,
  },
  image: {
    marginRight: 8,
    width: 60,
    height: 60,
  },
  qtyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export const ProductCardStyle = {
  Type1,
};
