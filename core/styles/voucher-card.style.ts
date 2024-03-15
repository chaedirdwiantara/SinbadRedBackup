import { styles } from '@sinbad/react-native-sinbad-ui';
import { StyleSheet } from 'react-native';

export const VoucherCardStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 1,
    ...styles.shadowForBox5,
  },
  leftContentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    position: 'relative',
  },
  rightContentContainer: {
    flexDirection: 'column',
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  rightTopContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
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
    paddingHorizontal: 26,
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight: 1,
    marginTop: 1,
    ...styles.shadowForBox5,
  },
  helperText: {
    marginLeft: 10,
    justifyContent: 'center',
  },
});
