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
    resizeMode: 'contain',
    borderColor: color.black5
  },
  paymentDetail: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  defaultContentPadding : {
    paddingTop: 16
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24
  },
  footerCancelOrder: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  footerCancelOrderButton: {
    height: 70
  },
  cardTimeBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 18,
    height: 18,
    backgroundColor: color.red50,
    borderRadius: 2,
  },
})

