import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const ThankYouPageStyle = StyleSheet.create({
  headerExtension: {
    backgroundColor: color.red50,
    width: '100%',
    height: 50,
    position: 'absolute',
    zIndex: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  mediumIcon: {
    width: 100,
    height: 50,
    marginRight: 16,
    borderColor: color.black5
  },
  paymentDetail: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingHorizontal: 25
  },
  defaultContentPadding : {
    paddingTop: 12
  },
  OrderDetailItem : {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginVertical: 6
  },
  expandableButton: {
    alignItems: 'center', 
    marginVertical: 6
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%',
  },
})

