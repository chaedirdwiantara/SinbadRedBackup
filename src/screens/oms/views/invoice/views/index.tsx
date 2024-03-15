import {
  RefreshControl,
  ScrollView,
  PermissionsAndroid,
  Platform,
  View,
} from 'react-native';
import React, { useEffect, useState, FC } from 'react';
import {
  SnbContainer,
  SnbPdf,
  SnbToast,
  SnbTopNav2,
} from '@sinbad/react-native-sinbad-ui';
import { NavigationAction } from '@core/functions/navigation';
import { useInvoice } from '../functions';
import { useInvoiceContext } from 'src/data/contexts/oms/invoice/useInvoiceContext';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { WebView } from 'react-native-webview';
import LoadingPage from '@core/components/LoadingPage';
import { useCustomBackHardware } from '@core/functions/navigation/navigation-hook.function';
import RNFetchBlob from 'rn-fetch-blob';

type Props = {};

const InvoiceView: FC<Props> = (props: any) => {
  const type = props?.route.params.type;

  const { get, clear } = useInvoice(type);

  const {
    stateInvoice: {
      invoice: { loading, data },
    },
  } = useInvoiceContext();

  // get detail data history
  useEffect(() => {
    get();

    return () => {
      clear();
    };
  }, []);

  // create html to pdf
  const [filePath, setFilePath] = useState<string | any>('');
  const [loadingDownload, setLoadingDownload] = useState(false);
  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        SnbToast.show('Write permission err', 3000, { positionValue: 50 });
        return false;
      }
    } else {
      return true;
    }
  };

  const createPDF = async () => {
    // const android = RNFetchBlob.android;
    if (await isPermitted()) {
      setLoadingDownload(true);
      let options = {
        //Content to print
        html: `${
          data
            ? data.htmlContent
            : '<h2 style="text-align: center">Data Invoice Not Found</h2>'
        }`,
        //File Name
        fileName: `Invoice_${
          data && type == 'thankyoupage-Invoice'
            ? `${data.orderId}`
            : data && type == 'orderhistory-Invoice'
            ? `${data.orderId}_${data.orderSellerId}`
            : ''
        }`,
        //File directory
        directory: 'docs',
        base64: true,
      };
      let file = await RNHTMLtoPDF.convert(options);
      // setFilePath(file.filePath);
      let filePath2 =
        RNFetchBlob.fs.dirs.DownloadDir +
        `/Invoice_${
          data && type == 'thankyoupage-Invoice'
            ? `${data.orderId}`
            : data && type == 'orderhistory-Invoice'
            ? `${data.orderId}_${data.orderSellerId}`
            : ''
        }.pdf`;

      RNFetchBlob.fs
        .writeFile(filePath2, file.base64, 'base64')
        .then((response) => {
          setLoadingDownload(false);
          SnbToast.show('Pdf Downloaded', 3000, { positionValue: 50 });
          setFilePath(file.filePath);
        })
        .catch((errors) => {
          setLoadingDownload(false);
          SnbToast.show('Terjadi Kesalahan', 3000, { positionValue: 50 });
        });
    }
  };

  filePath !== ''
    ? RNFetchBlob.fs
        .unlink(filePath)
        .then(() => {
          // console.log('FILE CACHE DELETED');
        })
        .catch((err) => {
          // console.log('FAILED DELETE FILE');
        })
    : null;

  /** => back handler */
  useCustomBackHardware(() => NavigationAction.back());

  if (loading || loadingDownload) {
    return <LoadingPage />;
  }

  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type4
        title="Invoice"
        iconName="download"
        color="white"
        maxLengthTitle={20}
        backAction={NavigationAction.back}
        iconAction={createPDF}
        testID={`topNav.${
          type === 'thankyoupage-Invoice'
            ? '1.3'
            : type === 'orderhistory-Invoice'
            ? '2.3'
            : ''
        }`}
      />
      <ScrollView
        // refreshControl={<RefreshControl refreshing={loading} onRefresh={get} />}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ height: '100%', width: '100%' }}>
          <WebView
            originWhitelist={['*']}
            source={{
              html: `${
                data
                  ? data.htmlContent
                  : '<h2 style="text-align: center">Data Invoice Not Found</h2>'
              }`,
            }}
          />
        </View>
      </ScrollView>
    </SnbContainer>
  );
};

export default InvoiceView;
