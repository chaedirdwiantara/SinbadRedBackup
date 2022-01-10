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
});

export default QuestStyles;
