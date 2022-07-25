import { styles } from '@sinbad/react-native-sinbad-ui';
import { StyleSheet } from 'react-native';

export const VoucherCardStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    ...styles.shadowForBox5,
  },
  leftContentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
  },
  icon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    position: 'relative',
    paddingRight: 5,
  },
  rightContentContainer: {
    flexDirection: 'column',
    paddingVertical: 8,
  },
  rightTopContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    flexDirection: 'column',
    width: '50%',
  },
  radio: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
  },
  rightBottomContent: {
    paddingHorizontal: 16,
    maxWidth: '80%',
  },
  viewDetail: {
    alignSelf: 'flex-end',
  },
  helperContainer: {
    height: 36,
    paddingHorizontal: 26,
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    ...styles.shadowForBox5,
  },
  helperText: {
    marginLeft: 10,
    justifyContent: 'center',
  },
});
