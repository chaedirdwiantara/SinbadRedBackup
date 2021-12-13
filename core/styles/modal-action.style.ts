import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const ModalActionStyle = StyleSheet.create({
  lines: {
    borderTopWidth: 1,
    borderColor: color.black10,
  },
  mainContainer: {
    backgroundColor: color.white,
  },
  boxContentItemSortType1: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxContentItemFilterType1: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  boxIconRight: {
    position: 'absolute',
    right: 20,
  },
  boxInput: {
    borderWidth: 1,
    paddingHorizontal: 8,
    height: 37,
    paddingBottom: 8,
    width: '100%',
  },
  text: {
    fontSize: 12,
    lineHeight: 15,
    color: color.black100,
  },
  shadowForBox: {
    borderWidth: 0,
    backgroundColor: color.white,
    shadowColor: color.black100,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.22,
    elevation: 1,
  },
});
