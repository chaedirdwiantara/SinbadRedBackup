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

export const setErrorMessage = (code: number, message?: string) => {
  switch (code) {
    case 10002: {
      return 'Email yang Anda masukkan telah terdaftar';
    }
    case 10003: {
      return 'Format email yang Anda masukkan salah';
    }
    case 10004: {
      return 'No. HP harus berupa angka';
    }
    case 10005: {
      return 'No. Hp yang Anda masukkan sudah terdaftar';
    }
    case 10006: {
      return 'No. Hp tidak boleh kosong';
    }
    case 10007: {
      return 'No. Hp yang Anda masukkan tidak terdaftar';
    }
    case 10008: {
      return 'Kode OTP salah/kadaluarsa';
    }
    case 10009: {
      return 'Data user tidak valid';
    }
    case 10010: {
      return 'ID Toko/Password yang Anda masukkan salah';
    }
    case 12049: {
      return 'Toko tidak ditemukan';
    }
    default: {
      return message || 'Terjadi kesalahan';
    }
  }
};
