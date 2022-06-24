import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

const HelpFaqStyles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: 224,
    position: 'absolute',
    resizeMode: 'cover',
    top: 0,
    zIndex: 0,
  },
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
  boxContentItem: {
    borderWidth: 1,
    borderRadius: 15,
    width: '100%',
    height: '100%',
  },
  headerContent: {
    height: 62,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  tag: {
    paddingHorizontal: 12,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 40,
    paddingVertical: 11,
    backgroundColor: color.black10,
  },
});

export default HelpFaqStyles;
