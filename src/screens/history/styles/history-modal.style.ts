import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const HistoryModalStyle = StyleSheet.create({
  datePickerContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: color.black10,
  },
  dateInputContainer: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: color.black60,
  },
  filterModalContentContainer: {
    padding: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.black10,
  },
  resetButton: {
    alignSelf: 'flex-end',
    marginBottom: 8,
    borderColor: color.black10,
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 2,
    paddingBottom: 4,
    paddingHorizontal: 8,
  },
});
