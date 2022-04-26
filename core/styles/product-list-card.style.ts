import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const ProductListCardStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 2,
    paddingBottom: 10,
    paddingTop: 1,
  },
  clickableContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    borderRadius: 6,
  },
  promoTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
  },
  promoTagContent: {
    justifyContent: 'center',
    height: 26,
    paddingLeft: 8,
    borderTopLeftRadius: 4,
    backgroundColor: color.green50,
  },
  image: {
    resizeMode: 'contain',
    height: 80,
    aspectRatio: 1,
    borderRadius: 6,
    marginRight: 16,
  },
  orderButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: color.red50,
    width: 80,
    paddingVertical: 6,
  },
  shadowForBox5: {
    borderWidth: 0,
    backgroundColor: color.white,
    shadowColor: color.black100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
