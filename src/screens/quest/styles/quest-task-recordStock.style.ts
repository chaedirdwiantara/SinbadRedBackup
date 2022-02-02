import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

const QuestStyles = StyleSheet.create({
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
  boxDisclaimer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  boxContentDisclaimer: {
    flexDirection: 'column',
    borderRadius: 4,
    borderWidth: 0,
    backgroundColor: color.yellow10,
  },
  boxtextDisclaimer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  boxContentList: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 50,
  },
  boxContentImage: {
    marginLeft: 8,
    marginTop: 28,
    justifyContent: 'center',
    height: 74,
    width: 74,
    alignItems: 'center',
  },
  boxContentListItem: {
    paddingRight: 8,
    borderRadius: 4,
  },
  fullWidthRatioContainRadius5Image: {
    resizeMode: 'contain',
    height: undefined,
    width: '100%',
    aspectRatio: 1 / 1,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
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
    paddingTop: 23,
    paddingRight: 51,
    flex: 1,
    alignItems: 'flex-start',
  },
  boxInput: {
    paddingTop: 22,
    paddingHorizontal: 16,
  },
  boxCalculation: {
    paddingTop: 25,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  separator: {
    borderColor: color.black10,
    borderWidth: 1,
    borderRadius: 1,
    borderStyle: 'solid',
    marginVertical: 9,
  },
  textCalculation: {
    paddingBottom: 9,
    marginLeft: 17,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default QuestStyles;
