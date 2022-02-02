import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

const QuestStyles = StyleSheet.create({
  shadowForBox: {
    borderWidth: 0,
    backgroundColor: color.white,
    shadowColor: color.black100,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  boxMainContent: {
    marginBottom: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 7 / 2,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardMainContent: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 16,
    backgroundColor: color.white,
  },
  boxFlatlist: {
    paddingBottom: 30,
    paddingTop: 16,
  },
  floatingDateContainer: {
    position: 'absolute',
    zIndex: 2,
    right: 10,
    top: -15,
  },
  floatingDate: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.yellow50,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 100,
  },
  cardBottomContent: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  progressBarContainer: {
    flex: 1,
  },
  fullBar: {
    height: 8,
    flex: 1,
    backgroundColor: color.black10,
    borderRadius: 8,
  },
  progressBar: {
    position: 'absolute',
    height: '100%',
    left: 0,
    borderRadius: 8,
    backgroundColor: color.red50,
  },
  cardButton: {
    borderRadius: 4,
    backgroundColor: color.red50,
    padding: 6,
    width: 79,
    alignItems: 'center',
    marginLeft: 18,
  },
});

export default QuestStyles;
