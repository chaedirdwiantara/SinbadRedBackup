import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-sinbad-ui';
const { width } = Dimensions.get('window');

const QuestStyles = StyleSheet.create({
  box: {
    backgroundColor: color.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  boxPadding: {
    paddingHorizontal: 16,
  },
  button: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    padding: 10,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginVertical: 5,
    borderRadius: 10,
  },
  buttonIcon: {
    flex: 0.4,
    alignItems: 'center',
    alignSelf: 'center',
  },
  chevron: {
    alignItems: 'flex-end',
    flex: 0.25,
  },
  imageConfirm: {
    width: 226,
    height: 153,
    resizeMode: 'cover',
  },
  confirm: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  container: {
    backgroundColor: color.black100,
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: color.white,
    borderRadius: 20,
    width: 0.62 * width,
  },
  boxCard: {
    paddingBottom: 30,
    paddingTop: 20,
    paddingHorizontal: '5%',
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
});

export default QuestStyles;
