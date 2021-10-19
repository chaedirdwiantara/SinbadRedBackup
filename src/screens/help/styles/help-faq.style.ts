import { StyleSheet } from 'react-native';

const HelpFaqStyles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: 217,
    position: 'absolute',
    resizeMode: 'cover',
    top: 0,
    zIndex: 0,
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
    paddingRight: '60%',
  },
});

export default HelpFaqStyles;
