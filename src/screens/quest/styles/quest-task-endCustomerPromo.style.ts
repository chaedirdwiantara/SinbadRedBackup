import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

const QuestStyles = StyleSheet.create({
  box: {
    backgroundColor: color.white,
    marginTop: 0,
    paddingHorizontal: 20,
    paddingVertical: 13,
    marginVertical: 5,
    shadowColor: '#000',
    elevation: 2,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
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
  fullWidthRatioContainRadius5Image: {
    resizeMode: 'contain',
    height: undefined,
    width: '100%',
    aspectRatio: 1 / 1,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  titleWrapper: {
    marginTop: 24,
    marginHorizontal: 24,
    alignItems: 'center',
  },
  imageWrapper: {
    marginTop: 60,
    marginHorizontal: 42,
    alignItems: 'center',
  },
  image: {
    width: 272,
    height: 257,
  },
  boxContentList: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  boxContentListItem: {
    flexDirection: 'row',
    paddingRight: 8,
    borderRadius: 4,
  },
  boxContentImage: {
    marginLeft: 8,
    marginTop: 13,
    justifyContent: 'center',
    height: 74,
    alignItems: 'center',
    width: 74,
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
  boxContentDesc: {
    paddingLeft: 16,
    flex: 1,
  },
  boxTitleAndSku: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxName: {
    paddingTop: 8,
    flex: 1,
    alignItems: 'flex-start',
  },
  boxPrice: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  boxOrderedAndButton: {
    paddingTop: 5,
    flexDirection: 'row',
  },
  checkboxContainer: {
    marginVertical: 40,
    marginLeft: 16,
  },
});

export default QuestStyles;
