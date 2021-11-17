import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const SupplierStyle = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    marginRight: 8,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: color.black5,
  },
  brandListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  brandCard: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 55,
    height: 55,
  },
  brandCardImage: {
    resizeMode: 'contain',
    aspectRatio: 1,
    width: '100%',
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 8,
  },
  sectionSeparator: {
    marginLeft: 16,
    marginBottom: 8,
    borderTopWidth: 1,
    borderColor: color.black10,
  },
  verificationTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
});
