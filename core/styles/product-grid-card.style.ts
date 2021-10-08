import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const ProductGridCardStyle = StyleSheet.create({
  innnerContainer: {
    flex: 1,
    paddingHorizontal: 2,
    paddingBottom: 10,
    paddingTop: 1,
  },
  promoTagContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '50%',
    zIndex: 1,
  },
  promoTagContent: {
    justifyContent: 'center',
    height: 26,
    paddingRight: 8,
    borderTopRightRadius: 4,
    backgroundColor: color.green50,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    aspectRatio: 1,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  exclusiveTagContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 50,
    backgroundColor: color.yellow10,
  },
  orderButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 4,
    paddingBottom: 6,
    borderRadius: 15,
    backgroundColor: color.red50,
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
