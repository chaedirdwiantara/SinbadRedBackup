/** === IMPORT PACKAGE HERE === */
import React, { FC, useEffect } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  SnbContainer,
  SnbTopNav,
  SnbPdf,
  SnbToast,
  SnbIcon,
  color,
} from '@sinbad/react-native-sinbad-ui';
import {
  usePaymentInvoice,
  useModalToast,
  useDownloadProgress,
} from '../../functions';
import { contexts } from '@contexts';
import { PermissionsAndroid, BackHandler } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { goBack } from '../../functions';
type HistoryInvoiceParam = {
  Invoice: { fileName: string; id: number; url: string };
};

type HistoryInvoiceRouteProp = RouteProp<HistoryInvoiceParam, 'Invoice'>;
/** === COMPONENT === */
const HistoryInvoiceView: FC = () => {
  const { params } = useRoute<HistoryInvoiceRouteProp>();
  const { reset } = usePaymentInvoice();
  const { dispatchHistory } = React.useContext(contexts.HistoryContext);
  const goBackFunction = () => {
    goBack();
    reset(dispatchHistory);
  };
  //hardware back handler
  useEffect(() => {
    const backAction = () => {
      goBackFunction();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  const modalToast = useModalToast();
  const dowloadProgress = useDownloadProgress();
  /** => function on click button download */
  const onClickButtonDownload = () => {
    requestWritePermission();
  };
  /** => function to request permission */
  const requestWritePermission = async () => {
    dowloadProgress.setProgress(true);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Sinbad App Permission',
          message:
            'Sinbad App needs access to your file ' +
            'so you can download the invoice file.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        donwloadPdf();
      } else {
        dowloadProgress.setProgress(false);
      }
    } catch (err) {
      dowloadProgress.setProgress(false);
    }
  };
  const extention = (filename: string) => {
    return /[.]/.exec(filename)
      ? /[^.]+$/.exec(filename)
      : (undefined as unknown as string);
  };
  /** => function to download pdf */
  const donwloadPdf = async () => {
    let url = params.url;
    let ext = extention(url)!;
    let filename = params.fileName.split('.')[0];
    ext = '.' + ext[0];
    const { fs, android } = ReactNativeBlobUtil;
    let downloadDir = fs.dirs.DownloadDir;
    let completeFileName = downloadDir + '/' + filename + ext;
    let counter = 1;
    let exist = await ReactNativeBlobUtil.fs.exists(completeFileName);

    while (exist) {
      completeFileName =
        downloadDir + '/' + filename + '(' + counter + ')' + ext;
      exist = await ReactNativeBlobUtil.fs.exists(completeFileName);
      counter++;
    }
    let options = {
      fileCache: false,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mime: 'application/pdf',
        path: completeFileName,
        description: 'Sinbad',
      },
    };
    ReactNativeBlobUtil.config(options)
      .fetch('GET', params.url)
      .then((res) => {
        android.actionViewIntent(res.path(), 'application/pdf');
        dowloadProgress.setProgress(false);
      })
      .catch((err) => {
        console.log(err, 'error');
        dowloadProgress.setProgress(false);
        modalToast.setToastText('Invoice gagal didownload');
        modalToast.setOpen(true);
        setTimeout(() => {
          modalToast.setOpen(false);
        }, 2000);
      });
  };
  /** === VIEW === */
  /** => Header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type5
        type="red"
        title="Detail Faktur"
        backAction={() => goBackFunction()}
        iconName="download"
        iconAction={() => onClickButtonDownload()}
      />
    );
  };
  /** render Toast */
  const renderToast = () => {
    return (
      <SnbToast
        open={modalToast.isOpen}
        message={modalToast.toastText}
        close={() => modalToast.setOpen(false)}
        position={'bottom'}
        leftItem={<SnbIcon name={'x_circle'} color={color.red50} size={20} />}
      />
    );
  };
  return (
    <SnbContainer color="white">
      {renderHeader()}
      <SnbPdf uri={params.url} cache={true} />
      {renderToast()}
    </SnbContainer>
  );
};

export default HistoryInvoiceView;
