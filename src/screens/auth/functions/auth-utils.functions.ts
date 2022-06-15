import { IToastShowOptions } from '@sinbad/react-native-sinbad-ui/lib/typescript/components/v2/Toast/types';
import { StatusBar } from 'react-native';

//** RENDER IF */
export const renderIF = (
  params: boolean,
  showComponent: React.ReactNode,
  hiddenComponent?: React.ReactNode | undefined,
) => (params ? showComponent : hiddenComponent);

//** FORMATTER TEXTINPUT */
export const formatter = (string = '', gaps: number[], spacer: string) => {
  if (!string) {
    return '';
  }
  const offsets = [0].concat(gaps).concat([string.length]);
  const temp = offsets
    .map((end, index) => {
      if (index === 0) {
        return '';
      }
      const start = offsets[index - 1];
      return string.substr(start, end - start);
    })
    .filter((part) => part !== '');

  return temp.join(spacer);
};

export const maskPhone = (phoneNo: string | undefined) => {
  if (!phoneNo) {
    return '';
  }
  let temp = [];
  for (let i = 0; i < phoneNo.length; i += 4) {
    temp.push(phoneNo.substr(i, 4));
  }
  const result = temp
    .reverse()
    .map((el, index) => {
      if (index !== 0) {
        return el.replace(/[0-9]/g, '*');
      }
      return el;
    })
    .reverse()
    .join('-');

  return result;
};

export const extractAddress = (data: any) => {
  const dataAddress = {
    province: '',
    city: '',
    district: '',
    urban: '',
  };

  data.map((item: any) => {
    if (item.types.indexOf('administrative_area_level_4') > -1) {
      dataAddress.urban = item.long_name;
    }
    if (item.types.indexOf('administrative_area_level_3') > -1) {
      dataAddress.district = item.long_name;
    }
    if (item.types.indexOf('administrative_area_level_2') > -1) {
      dataAddress.city = item.long_name;
    }
    if (item.types.indexOf('administrative_area_level_1') > -1) {
      dataAddress.province = item.long_name;
    }
  });
  return dataAddress;
};

export const DEFAULT_LATITUDE = -6.2;
export const DEFAULT_LONGITUDE = 106.816666;
export const REGION_OPTIONS = {
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

export function getStreetName(data: any) {
  let streetName = 'Jalan tidak diketahui';
  data?.map((item: any) => {
    if (item.types.indexOf('route') > -1) {
      streetName = item.long_name;
    }
  });
  return streetName;
}

export const setErrorMessage = (code: number, message?: string) => {
  switch (code) {
    case 40010000002: {
      return 'Email yang Anda masukkan telah terdaftar';
    }
    case 40010000003: {
      return 'Format email yang Anda masukkan salah';
    }
    case 40010000004: {
      return 'No. HP harus berupa angka';
    }
    case 40010000005: {
      return 'No. Hp yang Anda masukkan sudah terdaftar';
    }
    case 40010000006: {
      return 'No. Hp tidak boleh kosong';
    }
    case 40010000007: {
      return 'Nomor belum terdaftar';
    }
    case 40010000008: {
      return 'Kode OTP salah/kadaluarsa';
    }
    case 40010600009: {
      return 'Data user tidak valid';
    }
    case 40010000010: {
      return 'ID Toko/Password yang Anda masukkan salah';
    }
    case 40010000049: {
      return 'Toko tidak ditemukan';
    }
    default: {
      return message || 'Terjadi kesalahan';
    }
  }
};

export const toastOptions: IToastShowOptions = {
  position: 'top',
  positionValue: (StatusBar.currentHeight || 0) + 56,
};
