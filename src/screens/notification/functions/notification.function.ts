/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
import moment from 'moment';

// moment.updateLocale('id', {
//   relativeTime: {
//     // past: 'Sekarang',
//     ss: '%d seconds',
//     mm: '%d Menit Lalu',
//     hh: '%d Jam Lalu',
//     dd: '%d Hari Lalu',
//     ww: '%d Minggu Lalu',
//     MM: '%d Bulan Lalu',
//     yy: '%d Tahun Lalu',
//   },
// });

moment.updateLocale('id', {
  relativeTime: {
    future: '%s',
    past: '%s',
    s: 'Sekarang',
    ss: 'Sekarang',
    m: 'Sekarang',
    mm: '%d Menit Lalu',
    h: '%d Jam Lalu',
    hh: '%d Jam Lalu',
    d: '%d Hari Lalu',
    dd: '%d Hari Lalu',
    w: '%d Minggu Lalu',
    ww: '%d Minggu Lalu',
    M: '%d Bulan Lalu',
    MM: '%d Bulan Lalu',
    y: '%d Tahun Lalu',
    yy: '%d Tahun Lalu',
  },
});

moment.locale('id');

/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};
/**
 * format time to :
 * 2 Menit Lalu, 2 Jam Lalu, 24/04/2022
 *
 */
const timeFromNow = (timeBe: number) => {
  const ms = Date.now() - timeBe;
  const hours = ms / (1000 * 60 * 60);

  if (hours > 24) return moment(timeBe).format('DD/MM/YYYY');
  return moment(moment(timeBe)).fromNow();
};

export { goBack, timeFromNow };
