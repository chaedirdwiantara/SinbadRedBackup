import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const AccordionStyle = StyleSheet.create({
  panel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: color.black10,
    borderBottomWidth: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  skeleton: {
    height: 24,
    width: '100%',
    borderRadius: 6,
  },
});
